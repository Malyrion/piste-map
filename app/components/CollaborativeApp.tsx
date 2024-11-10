"use client";
import { Tldraw, getSnapshot, loadSnapshot } from 'tldraw';
import { useSyncDemo } from '@tldraw/sync';
import { useRef } from 'react';
import 'tldraw/tldraw.css';
import './CollaborativeApp.css';
import { useOthers } from "@liveblocks/react/suspense";

export function CollaborativeApp() {
  // Use any as a fallback type since Tldraw does not expose an instance type
  const editorRef = useRef<any>(null);
  const store = useSyncDemo({ roomId: 'myapp-abc125' });
  const others = useOthers();
  const userCount = others.length;

  // Function to save board state to the database
  const saveSnapshot = async () => {
    if (!editorRef.current) return;
    const snapshot = getSnapshot(editorRef.current.store);
    const serializedData = JSON.stringify(snapshot);
    
    try {
      const response = await fetch('/api/saveBoard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boardData: serializedData }),
      });
  
      if (!response.ok) throw new Error('Failed to save the board data');
      console.log('Board data saved successfully.');
    } catch (error) {
      console.error('Error saving board data:', error);
    }
  };
  
  // Function to load board state from the database
  const loadSnapshotFromStorage = async () => {
    if (!editorRef.current) return;
    
    try {
      const response = await fetch('/api/loadBoard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) throw new Error('Failed to load the board data');
  
      const { boardData }: { boardData: string } = await response.json();
      const parsedData = JSON.parse(boardData);
      loadSnapshot(editorRef.current.store, parsedData);
      console.log('Board data loaded successfully.');
    } catch (error) {
      console.error('Error loading board data:', error);
    }
  };

  // Handle editor mount
  const handleMount = (editor: any) => {
    editorRef.current = editor;
    // Optionally, load snapshot when editor mounts
    // loadSnapshotFromStorage();
  };

  return (
    <>
      <div>There are {userCount} other user(s) online</div>
      <div className="tldraw-container" style={{ position: 'fixed', inset: 0 }}>
        <div className="button-container">
          <button className="save-button" onClick={saveSnapshot}>Save Board</button>
          <button className="load-button" onClick={loadSnapshotFromStorage}>Load Board</button>
        </div>
        <Tldraw onMount={handleMount} store={store} />
      </div>
    </>
  );
}
