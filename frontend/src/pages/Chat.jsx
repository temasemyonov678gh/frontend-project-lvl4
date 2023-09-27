import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header.jsx';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { selectors as channelsSelectors, actions as channelsActions } from '../slices/channelsSlice.js';
import { fetchData } from '../slices/dataSlice.js';
import { Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import ChannelsNav from '../components/ChannelsNav.jsx';

function Chat() {
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const channelId = useSelector((state) => state.channels.currentChannel);
  const currentChannel = channels.find(({ id }) => channelId === id);
  const dispatch = useDispatch();

  const handleFormSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    console.log(values)
    setSubmitting(true);
    resetForm();
  };

  const inputEl = useRef();

  useEffect(() => {
    dispatch(fetchData());
    console.log(messages, 'messages');
  }, [dispatch]);

  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannel]);

  const onChangeChannel = (id) => () => {
    dispatch(channelsActions.setCurrentChannel(id));
  };

  return (
    <section className='chat-section'>
      <Header />
      <div className="container">
        <div className="chat-window">
          <div className="left-section">
            <div className="header">
              <h5>Каналы</h5>
              <Button variant='outline-dark'>+</Button>
            </div>
            <ChannelsNav
              channels={channels}
              currentChannel={currentChannel}
              onChangeChannel={onChangeChannel}
            ></ChannelsNav>
          </div>
          <div className="right-section">
            <div className="header mb-4">
              <h5 className='channel-name'>{"# general"}</h5>
              <p className='counter-of-messages'>{"0 сообщений"}</p>
            </div>
            <div className="chat-messages overflow-auto px-5 ">

            </div>
            <div className="chat-messages-footer mt-auto">
              <Formik
                initialValues={{ message: '' }}
                onSubmit={handleFormSubmit}
              >
                {({
                  handleSubmit, handleChange, values, errors, isSubmitting, touched,
                }) => {
                  const isSubmitDisabled = isSubmitting || values.message === '';

                  return (
                    <Form noValidate onSubmit={handleSubmit} autoComplete="off">
                      <Form.Group className='input-group'>
                        <Form.Label htmlFor="message" className='visually-hidden'>Введите сообщение</Form.Label>
                        <Form.Control
                          className='imput-new-message'
                          id="message"
                          name="message"
                          type="text"
                          placeholder="Введите сообщение..."
                          ref={inputEl}
                          onChange={handleChange}
                          value={values.message}
                        />
                        <button
                          type="submit"
                          disabled={isSubmitDisabled}
                        >
                          <img className='img-send' src={require('../assets/send.png')} alt="image-boy" />
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
    </section>
  );
};

export default Chat;
