function Message({ message }) {
  return (
    <div className="mb-3">
      <b>
        {message.author}
        :
      </b>
      {' '}
      {message.text}
    </div>
  );
}

export default Message;
