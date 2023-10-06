import { socketContext } from '../contexts';

const SocketPovider = ({ socket, children }) => {
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
}

export default SocketPovider;
