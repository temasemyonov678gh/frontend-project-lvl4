import cn from 'classnames';
const Channel = ({ channel, currentChannel, onChangeChannel }) => {
  const isCurrent = channel.id === currentChannel.id;

  const classes = cn("channel", {
    "btn-grey": isCurrent,
  });

  if (!channel.removable) {
    return (
      <button onClick={onChangeChannel(channel.id)} className={classes}>
        <span className="me-1">#</span>
        {channel.name}
      </button>
    );
  }
  return (
    <button onClick={onChangeChannel(channel.id)} className={classes}>
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );
}

export default Channel;
