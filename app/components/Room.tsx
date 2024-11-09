// app/components/Room.tsx
'use client';

import React, { ReactNode } from 'react';
import { RoomProvider } from '@liveblocks/react';

interface Props {
  children: ReactNode;
  roomId: string;
}

const Room: React.FC<Props> = ({ children, roomId }) => {
  return (
    <RoomProvider id={roomId} initialPresence={{ cursor: { x: 0, y: 0 } }}>
      {children}
    </RoomProvider>
  );
};

export default Room;
