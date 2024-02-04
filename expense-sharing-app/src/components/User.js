import React from 'react';

const User = ({ user }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', border: '1px solid #ccc', padding: '10px', borderRadius: '8px', margin: '10px 0' }}>
      <h3 style={{ color: '#333' }}>{user.name}</h3>
      <p style={{ marginBottom: '5px' }}>Email: {user.email}</p>
      <p style={{ marginBottom: '5px' }}>Mobile: {user.mobile}</p>
    </div>
  );
};

export default User;
