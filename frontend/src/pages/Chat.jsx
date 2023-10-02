import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header.jsx";
import { selectors as messagesSelectors } from "../slices/messagesSlice.js";
import {
  selectors as channelsSelectors,
  actions as channelsActions,
} from "../slices/channelsSlice.js";
import { fetchData } from "../slices/dataSlice.js";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import ChannelsNav from "../components/ChannelsNav.jsx";
import { useSocket } from "../hooks/index.js";
import Message from "../components/Message.jsx";
import getModal from '../components/modals/index.js';

function Chat() {
  const socket = useSocket();
  const userName = JSON.parse(localStorage.getItem("userName"));
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const channelId = useSelector((state) => state.channels.currentChannel);
  const currentChannel = channels.find(({ id }) => channelId === id);
  const filteredMessages= messages.filter((message) => message.channelId === channelId);
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const dispatch = useDispatch();

  const inputEl = useRef();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannel]);
  
  const renderModal = ({ modalInfo, hideModal, channels }) => {
    if (!modalInfo.type) {
      return null;
    }
  
    const Component = getModal(modalInfo.type);
    return <Component channels={channels} modalInfo={modalInfo} onHide={hideModal} />;
  };

  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  const getFormattedMessageCount = () => {
    const count = filteredMessages.length;
    // Определяем остаток от деления количества сообщений на 10
    const remainder = count % 10;

    // Определяем остаток от деления количества сообщений на 100
    const remainder100 = count % 100;

    // Проверяем условия для разных окончаний
    if (remainder100 >= 11 && remainder100 <= 19) {
      return `${count} сообщений`;
    } else if (remainder === 1) {
      return `${count} сообщение`;
    } else if (remainder >= 2 && remainder <= 4) {
      return `${count} сообщения`;
    } else {
      return `${count} сообщений`;
    }
  };

  const handleFormSubmit = (
    { message },
    { setSubmitting, resetForm }
  ) => {
    const newMessage = {
      text: message,
      author: userName.username,
      channelId,
    };
    socket.emit("newMessage", newMessage, ({ status }) => {
      if (status !== "ok") {
        alert("Network Error");
      }
    });
    setSubmitting(true);
    resetForm();
  };

  const showRenameModal = (item) => () => showModal('renaming', item);
  const showRemoveModal = (id) => () => showModal('removing', id);

  const onChangeChannel = (id) => () => {
    dispatch(channelsActions.setCurrentChannel(id));
  };

  const renderMessages = () =>
  filteredMessages.map((message, index) => <Message key={index} message={message} />);

  return (
    <section className="chat-section">
      <Header />
      <div className="container">
        <div className="chat-window">
          <div className="left-section">
            <div className="header">
              <h5>Каналы</h5>
              <Button onClick={() => showModal('adding')} variant="outline-dark">+</Button>
            </div>
            <ChannelsNav
              channels={channels}
              currentChannel={currentChannel}
              onChangeChannel={onChangeChannel}
              showRenameModal={showRenameModal}
              showRemoveModal={showRemoveModal}
            ></ChannelsNav>
          </div>
          <div className="right-section">
            <div className="header mb-4">
              <h5 className="channel-name">
                # {currentChannel && currentChannel.name}
              </h5>
              <p className="counter-of-messages">
                {getFormattedMessageCount()}
              </p>
            </div>
            <div className="chat-messages overflow-auto px-5 ">
              {renderMessages()}
            </div>
            <div className="chat-messages-footer mt-auto">
              <Formik
                initialValues={{ message: "" }}
                onSubmit={handleFormSubmit}
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
                  isSubmitting,
                  touched,
                }) => {
                  const isSubmitDisabled =
                    isSubmitting || values.message === "";

                  return (
                    <Form noValidate onSubmit={handleSubmit} autoComplete="off">
                      <Form.Group className="input-group">
                        <Form.Label
                          htmlFor="message"
                          className="visually-hidden"
                        >
                          Введите сообщение
                        </Form.Label>
                        <Form.Control
                          className="imput-new-message"
                          id="message"
                          name="message"
                          type="text"
                          placeholder="Введите сообщение..."
                          ref={inputEl}
                          onChange={handleChange}
                          value={values.message}
                        />
                        <button type="submit" disabled={isSubmitDisabled}>
                          <img
                            className="img-send"
                            src={require("../assets/send.png")}
                            alt="image-boy"
                          />
                        </button>
                      </Form.Group>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      {renderModal({ modalInfo, hideModal, channels })}
    </section>
  );
}

export default Chat;
