import { Dropdown, ButtonGroup } from "react-bootstrap";
import cn from "classnames";

const Channel = ({ channel, currentChannel, onChangeChannel, showRenameModal, showRemoveModal }) => {
  const isCurrent = channel.id === currentChannel.id;

  const channelClasses = cn("channel", {
    "btn-grey": isCurrent,
    "channel-removable": channel.removable,
  });

  const dropdownClasses = cn({ "dropdown-grey": isCurrent });

  if (!channel.removable) {
    return (
      <button onClick={onChangeChannel(channel.id)} className={channelClasses}>
        <span className="me-1">#</span>
        {channel.name}
      </button>
    );
  }
  return (
    <Dropdown className={dropdownClasses} as={ButtonGroup}>
      <button onClick={onChangeChannel(channel.id)} className={channelClasses}>
        <span className="me-1">#</span>
        {channel.name}
      </button>
      <Dropdown.Toggle split variant="none" id="dropdown-split-basic" />

      <Dropdown.Menu drop="up">
        <Dropdown.Item onClick={showRenameModal(channel)}>Переименовать</Dropdown.Item>
        <Dropdown.Item onClick={showRemoveModal(channel.id)} className="text-danger">Удалить</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Channel;
