import { useState, useEffect } from 'react';

export default function Items() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Active');
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/items')
      .then(res => res.json())
      .then(setItems);
  }, []);

  const createItem = (event) => {
    event.preventDefault();
    const newItem = { id: Date.now(), name, price: parseFloat(price), status };

    fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    }).then(() => {
      setItems([...items, newItem]);
      setName('');
      setPrice('');
      setStatus('Active');
      setOpenForm(false);
    });
  };

  return (
    <div className="page-block">
      <div className="page-head">
        <h1>ITEMS</h1>
        <button className="btn btn-add" onClick={() => setOpenForm(prev => !prev)}>
          + ADD
        </button>
      </div>

      {openForm && (
        <div className="form-card">
          <form className="form-grid" onSubmit={createItem}>
            <label>
              <span>Item Name</span>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter item" />
            </label>
            <label>
              <span>Item Price</span>
              <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter price" type="number" />
            </label>
            <label className="full-width">
              <span>Item Status</span>
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option>Active</option>
                <option>In-Active</option>
              </select>
            </label>
            <div className="form-actions full-width">
              <button type="button" className="btn btn-secondary" onClick={() => setOpenForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      )}

      <div className="item-grid">
        {items.map(item => (
          <div className="data-card" key={item.id}>
            <strong>{item.name}</strong>
            <span className={`badge ${item.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}