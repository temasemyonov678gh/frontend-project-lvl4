import { socketContext } from '../contexts';

function SocketPovider({ socket, children }) {
  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
}

export default SocketPovider;
