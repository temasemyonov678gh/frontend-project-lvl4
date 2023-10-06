import { socketContext } from '../contexts';

const SocketPovider = ({ socket, children }) => (
  <socketContext.Provider value={socket}>{children}</socketContext.Provider>
);

export default SocketPovider;
