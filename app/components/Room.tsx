"use client";
import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface LiveblocksProvider{
    publicApiKey:string
}

interface RoomProps {
    children: ReactNode;
    userId: string // Pass user ID as a prop
    roomId: string // Pass room ID as a prop
  }

export function Room({ children, userId, roomId }: RoomProps) {
  return (
    <LiveblocksProvider publicApiKey={'pk_dev_8u1X1Fqx0K_XGVn7ncaIFIawWOvMram4caYDlF2SLL-pBB7GE7NwGozM68THSTNW'}>
      <RoomProvider id={roomId} 
              initialPresence={{ cursor: { x: 0, y: 0 } }}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {()=>children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}