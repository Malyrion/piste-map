// app/page.tsx
'use client';

import React, { useState } from 'react';
import { LiveblocksProvider, RoomProvider } from '@liveblocks/react';
import { createClient } from '@liveblocks/client';
import UserNamePrompt from './components/UserNamePrompt';
import CollaborativeApp from './components/CollaborativeApp';

const Page: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
  };

  if (!userName) {
    return <UserNamePrompt onSubmit={handleNameSubmit} />;
  }

  const client = createClient({
    publicApiKey: 'your-public-api-key',
    user: {
      id: userName, // Using the user's name as their ID
      info: { name: userName },
    },
  });

  return (
    <LiveblocksProvider client={client}>
      <RoomProvider id="collaborative-room" initialPresence={{ cursor: { x: 0, y: 0 } }}>
        <CollaborativeApp />
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Page;
