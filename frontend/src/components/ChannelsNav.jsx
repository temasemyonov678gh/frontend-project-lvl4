import { Nav, Navbar } from "react-bootstrap";
import Channel from "./Channel";

const ChannelsNav = ({ channels, currentChannel, onChangeChannel, showRenameModal, showRemoveModal }) => {
  return (
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
          ></Channel>
        ))}
      </Nav>
    </Navbar>
  )
}

export default ChannelsNav;
