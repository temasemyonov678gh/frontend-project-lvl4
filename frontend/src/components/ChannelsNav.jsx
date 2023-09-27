import { Nav, Navbar } from "react-bootstrap";
import Channel from "./Channel";

const ChannelsNav = ({ channels, currentChannel, onChangeChannel }) => {
  console.log(channels)
  return (
    <Navbar>
      <Nav>
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            currentChannel={currentChannel}
            onChangeChannel={onChangeChannel}
          ></Channel>
        ))}
      </Nav>
    </Navbar>
  )
}

export default ChannelsNav;
