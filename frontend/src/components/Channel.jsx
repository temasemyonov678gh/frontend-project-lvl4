import { Dropdown, ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

function Channel({
  channel,
  currentChannel,
  onChangeChannel,
  showRenameModal,
  showRemoveModal,
}) {
  const { t } = useTranslation();

  const isCurrent = channel.id === currentChannel.id;

  const channelClasses = cn('channel', {
    'btn-grey': isCurrent,
    'channel-removable': channel.removable,
  });

  const dropdownClasses = cn({ 'dropdown-grey': isCurrent });

  if (!channel.removable) {
    return (
      <button type="button" onClick={onChangeChannel(channel.id)} className={channelClasses}>
        <span className="me-1">#</span>
        {channel.name}
      </button>
    );
  }
  return (
    <Dropdown className={dropdownClasses} as={ButtonGroup}>
      <button type="button" onClick={onChangeChannel(channel.id)} className={channelClasses}>
        <span className="me-1">#</span>
        {channel.name}
      </button>
      <Dropdown.Toggle split variant="none" id="dropdown-split-basic">
        <span className="visually-hidden">{t('chatPage.dropdown.hidden')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={showRenameModal(channel)}>
          {t('chatPage.dropdown.rename')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={showRemoveModal(channel.id)}
          className="text-danger"
        >
          {t('chatPage.dropdown.remove')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Channel;
