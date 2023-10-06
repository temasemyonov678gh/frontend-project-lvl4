import { useContext } from 'react';

import { authContext, socketContext } from '../contexts/index';

export const useAuth = () => useContext(authContext);
export const useSocket = () => useContext(socketContext);
