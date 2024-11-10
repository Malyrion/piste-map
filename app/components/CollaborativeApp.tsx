"use client";
import { Tldraw, getSnapshot, loadSnapshot } from 'tldraw';
import { useSyncDemo } from '@tldraw/sync';
import { useRef } from 'react';
import 'tldraw/tldraw.css';
import './CollaborativeApp.css';
import { useOthers } from "@liveblocks/react/suspense";

export function CollaborativeApp() {
  const editorRef = useRef(null);
  const store = useSyncDemo({ roomId: 'myapp-abc125' });
  const others = useOthers();
  const userCount = others.length;

  // Function to save board state to local storage
  const saveSnapshot = () => {
    if (!editorRef.current) return;
    const snapshot = getSnapshot(editorRef.current.store);
    localStorage.setItem('tldraw_snapshot', JSON.stringify(snapshot));
    console.log('Snapshot saved to local storage.');
  };

  // Function to load board state from local storage
  const loadSnapshotFromStorage = () => {
    if (!editorRef.current) return;
    const snapshot = localStorage.getItem('tldraw_snapshot');
    if (snapshot) {
      loadSnapshot(editorRef.current.store, JSON.parse(snapshot));
      console.log('Snapshot loaded from local storage.');
    } else {
      console.log('No snapshot found in local storage.');
    }
  };

  // Handle editor mount
  const handleMount = (editor) => {
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
