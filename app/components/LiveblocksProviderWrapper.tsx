// app/components/LiveblocksProviderWrapper.tsx
'use client';

import React from 'react';
import { LiveblocksProvider } from '@liveblocks/react';

interface LiveblocksProviderWrapperProps {
  children: React.ReactNode;
}

const LiveblocksProviderWrapper: React.FC<LiveblocksProviderWrapperProps> = ({ children }) => {
  console.log('Rendering LiveblocksProviderWrapper');
  return (
    <LiveblocksProvider publicApiKey="pk_dev_8u1X1Fqx0K_XGVn7ncaIFIawWOvMram4caYDlF2SLL-pBB7GE7NwGozM68THSTNW">
   {children}
    </LiveblocksProvider>
  );
};

export default LiveblocksProviderWrapper;