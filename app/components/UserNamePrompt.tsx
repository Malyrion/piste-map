// app/components/UserNamePrompt.tsx
'use client';

import React, { useState } from 'react';

interface UserNamePromptProps {
  onSubmit: (name: string) => void;
}

const UserNamePrompt: React.FC<UserNamePromptProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginLeft: '10px' }}
          />
        </label>
        <button type="submit" style={{ marginLeft: '10px' }}>Join</button>
      </form>
    </div>
  );
};

export default UserNamePrompt;
