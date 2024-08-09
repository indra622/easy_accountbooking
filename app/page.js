import { useState, useEffect } from 'react';

export default function Home() {
  const [category, setCategory] = useState('');
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // 카테고리 데이터를 가져오는 함수
    const fetchCategories = async () => {
      const res = await fetch('/api/getCategories');
      const data = await res.json();
      setCategories(data.categories);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, item, amount }),
    });

    if (res.ok) {
      alert('Data added successfully');
    } else {
      alert('Failed to add data');
    }
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Item:</label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}
