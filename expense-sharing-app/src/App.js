import React, { useState, useEffect } from 'react';
import User from './components/User';
import ExpenseForm from './components/ExpenseForm';
import Balance from './components/Balance';

const App = () => {
  const [users, setUsers] = useState([
    { userId: 'u1', name: 'User1', email: 'user1@example.com', mobile: '1234567890' },
    { userId: 'u2', name: 'User2', email: 'user2@example.com', mobile: '1234567891' },
    { userId: 'u3', name: 'User3', email: 'user3@example.com', mobile: '1234567892' },
    { userId: 'u4', name: 'User4', email: 'user4@example.com', mobile: '1234567893' },
  ]);

  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    updateBalances();
  }, [expenses]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const updateBalances = () => {
    const newBalances = [];

    users.forEach((user) => {
      const userExpenses = expenses.filter((expense) => expense.payer === user.userId);

      const userBalance = userExpenses.reduce((total, expense) => {
        const shareAmount = calculateShareAmount(expense);

        if (expense.splitType === 'EQUAL') {
          return total + shareAmount * (users.length - 1);
        } else {
          const shareTargets = Object.keys(expense.shares);
          return (
            total +
            shareTargets.reduce(
              (shareTotal, target) => shareTotal + (user.userId === target ? 0 : expense.shares[target]),
              0
            )
          );
        }
      }, 0);

      newBalances.push({
        userId: user.userId,
        targetUser: userBalance > 0 ? 'you' : users.find((u) => u.userId !== user.userId).name,
        amount: Math.abs(userBalance),
      });
    });

    setBalances(newBalances);
  };

  const calculateShareAmount = (expense) => {
    return expense.amount / (Object.keys(expense.shares).length || users.length);
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        backgroundColor: '#f0f0f0',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#333' }}>Expense Sharing App</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {users.map((user) => (
          <User key={user.userId} user={user} />
        ))}
      </div>
      <ExpenseForm users={users} addExpense={addExpense} />
      <Balance balances={balances} />
    </div>
  );
};

export default App;
