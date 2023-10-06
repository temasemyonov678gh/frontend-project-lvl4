import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSocket } from '../../hooks/index.js';

const Remove = (props) => {
  const { t } = useTranslation();

  const {
    onHide,
    modalInfo: { item },
  } = props;
  const socket = useSocket();

  const handleFormSubmit = () => {
    socket.emit('removeChannel', { id: item });
    toast.success(t('success.remove'));
    onHide();
  };

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{ channelId: item.id }}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <p className="text-confirm">{t('formsElements.confirm')}</p>
              <Button
                className="btn-remove-channel"
                variant="danger"
                type="submit"
              >
                {t('formsElements.buttons.remove')}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
