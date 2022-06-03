import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch, batch } from 'react-redux';
import { useFormik } from 'formik';

import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import fetchData, { getCurrentChannelId } from '../utils/fetchData.js';
import { io } from 'socket.io-client';

const renderChannelList = (channels, currentChannel) => {
  const currentClasses = "w-100 rounded-0 text-start btn btn-secondary";
  const classes = "w-100 rounded-0 text-start btn";
  const list = channels.map(({ id, name, removable }) => (
    <li className="nav-item w-100" key={id}>
      <button className={ id === currentChannel ? currentClasses : classes }>
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  ));
  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {list}
    </ul>
  );
};

const renderMessages = (list) => list.map((msg) => (
  <div key={msg.id} className="text-break mb-2">
    <b>{msg.author}</b>: {msg.text}
  </div>
));

export default () => {
  const socket = io();
  const messageBoxRef = useRef(null);
  const userName = JSON.parse(localStorage.getItem('userName'));
  const [channelId, setChannelId] = useState(null);
  const dispatch = useDispatch();
  const messages = useSelector(messagesSelectors.selectAll);
  const filteredMessages = messages.filter((msg) => msg.channelId === channelId);
  const channels = useSelector(channelsSelectors.selectAll);
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      try {
        const newMessage = {
          text: values.body,
          author: userName.username,
          channelId,
        };
        socket.emit('newMessage', newMessage);
        formik.values.body = '';
      } catch (err) {
        console.log(err);
      }
    }
  });
  const currentChannel = channels.find(({ id }) => channelId === id);

  const scrollToBottom = () => {
    const scrollHeight = messageBoxRef.current.scrollHeight;
    const height = messageBoxRef.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    messageBoxRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  useEffect(async () => {
    batch(() => {
      dispatch(fetchData());
    });
    const defaultChannelId = await getCurrentChannelId();
    setChannelId(defaultChannelId);
    scrollToBottom();
  }, [messages]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button className="p-0 text-primary btn btn-group-vertical" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          {renderChannelList(channels, channelId)}
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0"><b># {currentChannel && currentChannel.name}</b></p>
              <span className="text-muted">{filteredMessages.length} сообщения</span>
            </div>
            <div id="messages-box" ref={messageBoxRef} className="chat-messages overflow-auto px-5 ">
              {renderMessages(filteredMessages)}
            </div>
            <div className="mt-auto px-5 py-3">
              <form className="py-1 border rounded-2" noValidate="" onSubmit={formik.handleSubmit}>
                <div className="input-group has-validation">
                  <input className="border-0 p-0 ps-2 form-control"
                    onChange={formik.handleChange}
                    value={formik.values.body}
                    name="body" aria-label="Новое сообщение"
                    placeholder="Введите сообщение..." />
                  <button className="btn btn-group-vertical" type="submit" disabled={formik.values.body === '' ? true : false}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path></svg>
                    <span className="visually-hidden">Отправить</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
