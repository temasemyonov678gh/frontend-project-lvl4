import { Nav, Navbar } from 'react-bootstrap';
import Channel from './Channel';

const ChannelsNav = ({
  channels, currentChannel, onChangeChannel, showRenameModal, showRemoveModal,
}) => (
  <Navbar>
    <Nav>
      {channels.map((channel) => (
        <Channel
          key={channel.id}
          channel={channel}
          currentChannel={currentChannel}
          onChangeChannel={onChangeChannel}
          showRenameModal={showRenameModal}
          showRemoveModal={showRemoveModal}
        />
      ))}
    </Nav>
  </Navbar>
);

export default ChannelsNav;
