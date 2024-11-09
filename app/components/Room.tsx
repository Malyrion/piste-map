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
  }

export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider publicApiKey={'pk_dev_8u1X1Fqx0K_XGVn7ncaIFIawWOvMram4caYDlF2SLL-pBB7GE7NwGozM68THSTNW'}>
      <RoomProvider id="my-room" 
              initialPresence={{ cursor: { x: 0, y: 0 } }} // Set initial cursor position here
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}