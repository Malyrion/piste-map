"use client";
import { Tldraw, getSnapshot, loadSnapshot } from 'tldraw';
import { useSyncDemo } from '@tldraw/sync';
import { useOthers } from "@liveblocks/react/suspense";
import React, { useRef, useState } from 'react';
import 'tldraw/tldraw.css';
import './CollaborativeApp.css';

// Custom imports
import { ToiletsTool, FoodTool } from './custom-tools';
import { uiOverrides } from './ui-overrides';
import { components } from './components';
import { customAssetUrls } from './asset-urls';

const customTools = [ToiletsTool, FoodTool];

export function CollaborativeApp() {
  // References and state
  const editorRef = useRef<any>(null);
  const store = useSyncDemo({ roomId: 'myapp-abc1256' });
  const others = useOthers();
  const userCount = others.length;
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  // Utility function to display popup notifications
  const showPopup = (message: string) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 3000); // Hide after 3 seconds
  };

  // Save board state to database
  const saveSnapshot = async () => {
    if (!editorRef.current) return;
    const snapshot = getSnapshot(editorRef.current.store);
    const serializedData = JSON.stringify(snapshot);
    
    try {
      const response = await fetch('/api/saveBoard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ boardData: serializedData }),
      });
      if (!response.ok) throw new Error('Failed to save the board data');
      showPopup('Board data saved successfully!');
    } catch (error) {
      showPopup('Error saving board data. Please try again.');
      console.error('Error saving board data:', error);
    }
  };

  // Load board state from database
  const loadSnapshotFromStorage = async () => {
    if (!editorRef.current) return;
    
    try {
      const response = await fetch('/api/loadBoard', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to load the board data');

      const { boardData }: { boardData: string } = await response.json();
      loadSnapshot(editorRef.current.store, JSON.parse(boardData));
      showPopup('Board data loaded successfully!');
    } catch (error) {
      showPopup('Error loading board data. Please try again.');
      console.error('Error loading board data:', error);
    }
  };

  // Handle editor mount
  const handleMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div className="collaborative-app">
      {/* Online users count */}
      <div>There are {userCount} other user(s) online</div>

      {/* Editor container with custom tools and settings */}
      <div className="tldraw-container" style={{ position: 'fixed', inset: 0 }}>
        <div className="button-container">
          <button className="save-button" onClick={saveSnapshot}>Save Board</button>
          <button className="load-button" onClick={loadSnapshotFromStorage}>Load Board</button>
        </div>
        
        <Tldraw
          onMount={handleMount}
          store={store}
          tools={customTools}          // Pass custom tools
          overrides={uiOverrides}       // Pass UI overrides
          components={components}       // Pass custom components
          assetUrls={customAssetUrls}   // Pass custom asset URLs
        />
      </div>

      {/* Popup notification */}
      {popupMessage && <Popup message={popupMessage} />}
    </div>
  );
}

// Popup component for displaying messages
const Popup: React.FC<{ message: string }> = ({ message }) => (
  <div className="popup">
    {message}
    <style jsx>{`
      .popup {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: fade-in-out 3s;
      }
      @keyframes fade-in-out {
        0%, 100% { opacity: 0; }
        10%, 90% { opacity: 1; }
      }
    `}</style>
  </div>
);
