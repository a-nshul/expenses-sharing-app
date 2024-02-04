import React from 'react';

const Balance = ({ balances }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h2 style={{ color: '#333' }}>Balances</h2>
      {balances.map((balance) => (
        <div key={balance.userId} style={{ margin: '10px 0', padding: '5px', borderBottom: '1px solid #ddd' }}>
          <span style={{ fontWeight: 'bold' }}>{balance.userId}</span> owes <span style={{ fontWeight: 'bold' }}>{balance.targetUser}</span> ${balance.amount.toFixed(2)}
        </div>
      ))}
    </div>
  );
};

export default Balance;
