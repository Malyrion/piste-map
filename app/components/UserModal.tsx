// components/UserModal.tsx
import React, { useState } from 'react';

interface UserModalProps {
  onSubmit: (name: string) => void;
}

const UserModal: React.FC<UserModalProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="modal">
      <h2>Enter Your Name</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UserModal;
