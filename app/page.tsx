// app/page.tsx
'use client';

import React from 'react';
import LiveblocksProviderWrapper from './components/LiveblocksProviderWrapper';
import Room from './components/Room';
import CollaborativeApp from './components/CollaborativeApp';

const Page: React.FC = () => {
  return (
    <LiveblocksProviderWrapper>
      <Room roomId="collaborative-room">
        <CollaborativeApp />
      </Room>
    </LiveblocksProviderWrapper>
  );
};

export default Page;
