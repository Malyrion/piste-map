"use client";
import { Tldraw, getSnapshot, loadSnapshot } from 'tldraw';
import { useSyncDemo } from '@tldraw/sync';
import { useOthers } from "@liveblocks/react/suspense";
import React, { useRef, useState } from 'react';
import 'tldraw/tldraw.css';
import './CollaborativeApp.css';

// Custom imports for added tools, UI overrides, components, and asset URLs
import { ToiletsTool, FoodTool } from './custom-tools';
import { uiOverrides } from './ui-overrides';
import { components } from './components';
import { customAssetUrls } from './asset-urls';

const customTools = [ToiletsTool, FoodTool]; // Custom tools for additional functionality

// Main collaborative application component
export function CollaborativeApp() {
  // References and state
  const editorRef = useRef<any>(null); // Ref to access the editor instance
  const store = useSyncDemo({ roomId: 'myapp-abc1256' }); // Store for syncing board data
  const others = useOthers(); // Other online users
  const userCount = others.length; // Count of online users
  const [popupMessage, setPopupMessage] = useState<string | null>(null); // State to handle popup messages

  // Popup component for displaying short messages to the user
  const Popup: React.FC<{ message: string }> = ({ message }) => (
    <div className="popup">{message}</div>
  );

  // Utility function to display popup notifications for 3 seconds
  const showPopup = (message: string) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 3000); // Hide popup after 3 seconds
  };

  // Function to save the current board state to the database
  const saveSnapshot = async () => {
    if (!editorRef.current) return; // Exit if editor is not ready
    const snapshot = getSnapshot(editorRef.current.store); // Capture current editor state
    const serializedData = JSON.stringify(snapshot); // Serialize snapshot for storage

    try {
      // Send serialized data to the backend API
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

  // Function to load the saved board state from the database
  const loadSnapshotFromStorage = async () => {
    if (!editorRef.current) return; // Exit if editor is not ready

    try {
      // Request saved board data from the backend API
      const response = await fetch('/api/loadBoard', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to load the board data');

      const { boardData }: { boardData: string } = await response.json();
      loadSnapshot(editorRef.current.store, JSON.parse(boardData)); // Load snapshot into the editor
      showPopup('Board data loaded successfully!');
    } catch (error) {
      showPopup('Error loading board data. Please try again.');
      console.error('Error loading board data:', error);
    }
  };

  // Function called when the editor instance is mounted
  const handleMount = (editor: any) => {
    editorRef.current = editor; // Save editor instance reference
  };

  return (
    <div className="collaborative-app">
      {/* Display count of online users */}
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
          tools={customTools}          // Attach custom tools to the editor
          overrides={uiOverrides}       // Apply UI customizations
          components={components}       // Add custom components
          assetUrls={customAssetUrls}   // Load custom asset URLs
        />
      </div>

      {/* Display popup notification when a message is available */}
      {popupMessage && <Popup message={popupMessage} />}
    </div>
  );
}
