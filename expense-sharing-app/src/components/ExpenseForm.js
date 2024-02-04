import React, { useState } from 'react';
import { message } from 'antd';
const ExpenseForm = ({ users, addExpense }) => {
  const [formData, setFormData] = useState({
    payer: '',
    amount: 0,
    splitType: 'EQUAL',
    shares: {},
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if all required fields are filled out
    if (!formData.payer || !formData.amount || !formData.splitType) {
      message.error('Please fill out all required fields.');
      return;
    }

    try {
      addExpense(formData);
      message.success('Expense successfully added!');
      setFormData({
        payer: '',
        amount: 0,
        splitType: 'EQUAL',
        shares: {},
      });
    } catch (error) {
      message.error('Failed to add expense. Please try again.');
    }
  };
  return (
    <form
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
      onSubmit={handleSubmit}
    >
      <label style={{ marginBottom: '10px', display: 'block' }}>
        Payer:
        <select
          name="payer"
          value={formData.payer}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          required
        >
          {users.map((user) => (
            <option key={user.userId} value={user.userId}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label style={{ marginBottom: '10px', display: 'block' }}>
        Amount:
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          style={{ width: '96%', padding: '8px', marginTop: '4px' }}
          required
        />
      </label>
      <br />
      <label style={{ marginBottom: '10px', display: 'block' }}>
        Split Type:
        <select
          name="splitType"
          value={formData.splitType}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          required
        >
          <option value="EQUAL">Equal</option>
          <option value="EXACT">Exact</option>
          <option value="PERCENT">Percent</option>
        </select>
      </label>
      <br />
      {formData.splitType === 'PERCENT' && (
        <>
          <label style={{ marginBottom: '10px', display: 'block' }}>
            Percentages:
            {users.map((user) => (
              <div key={user.userId}>
                <input
                  type="number"
                  name={`percent-${user.userId}`}
                  value={formData.shares[user.userId] || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shares: {
                        ...formData.shares,
                        [user.userId]: parseFloat(e.target.value),
                      },
                    })
                  }
                  style={{ width: '50px', padding: '8px', marginTop: '4px' }}
                />
                %
              </div>
            ))}
          </label>
        </>
      )}
      {formData.splitType === 'EXACT' && (
        <>
          <label style={{ marginBottom: '10px', display: 'block' }}>
            Exact Amounts:
            {users.map((user) => (
              <div key={user.userId}>
                <input
                  type="number"
                  name={`exact-${user.userId}`}
                  value={formData.shares[user.userId] || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shares: {
                        ...formData.shares,
                        [user.userId]: parseFloat(e.target.value),
                      },
                    })
                  }
                  style={{ width: '50px', padding: '8px', marginTop: '4px' }}
                />
              </div>
            ))}
          </label>
        </>
      )}
      <br />
      <button
        type="submit"
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
