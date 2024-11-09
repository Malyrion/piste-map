"use client";
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_8u1X1Fqx0K_XGVn7ncaIFIawWOvMram4caYDlF2SLL-pBB7GE7NwGozM68THSTNW"}>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}