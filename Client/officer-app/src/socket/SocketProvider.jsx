import { rootApi } from 'lib/api';
import PropTypes from 'prop-types';
import { createContext } from 'react';
import { io } from 'socket.io-client';
import { GetUser } from 'store/auth/auth-config';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const user = GetUser();

  let assigned_areaid = user.assigned_areaid;
  let area;
  if (user.userRole === 'ward_officer') {
    area = 'ward';
  } else if (user.userRole === 'district_officer') {
    area = 'district';
  } else {
    area = 'province';
    assigned_areaid = user._id;
  }

  console.log(assigned_areaid);

  const socket = io(`${rootApi}`, {
    transports: ['websocket'],
    query: {
      [area]: assigned_areaid,
      user_id: user._id,
    },
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketProvider;
