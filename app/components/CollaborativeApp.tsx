// app/components/CollaborativeApp.tsx
'use client';

import React from 'react';
import { Tldraw } from 'tldraw';
import { useSyncDemo } from '@tldraw/sync';
import 'tldraw/tldraw.css';
import { useSelf } from '@liveblocks/react';

const defaultUser = {
    presence: {
      cursor: { x: 0, y: 0 },
    },
    info: {
      name: 'Guest User',
    },
  };
  

  const CollaborativeApp: React.FC = () => {
    const store = useSyncDemo({ roomId: 'collaborative-room' });
    const user = useSelf() || defaultUser;
  
    const { presence, info } = user;
  
    return (
      <div style={{ position: 'fixed', inset: 0 }}>
        <Tldraw store={store} />
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <p>Welcome, {info.name}!</p>
          {presence.cursor && (
            <p>
              Your cursor is at ({presence.cursor.x}, {presence.cursor.y})
            </p>
          )}
        </div>
      </div>
    );
  };

export default CollaborativeApp;
