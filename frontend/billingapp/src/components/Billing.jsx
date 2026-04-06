import { useState, useEffect } from 'react';

export default function Billing() {
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [bill, setBill] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/customers').then(res => res.json()).then(setCustomers);
    fetch('http://localhost:5000/items').then(res => res.json()).then(setItems);
  }, []);

  const toggleItem = (id) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const createBill = () => {
    if (!selectedCustomer || selectedItems.length === 0) return;
    fetch('http://localhost:5000/bills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId: selectedCustomer, itemIds: selectedItems }),
    }).then(res => res.json()).then(setBill);
  };

  return (
    <div className="page-block">
      <div className="page-head">
        <h1>Billing</h1>
      </div>

      <div className="form-grid billing-grid">
        <label>
          <span>Select Customer</span>
          <select value={selectedCustomer} onChange={e => setSelectedCustomer(e.target.value)}>
            <option value="">Pick customer</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>

        <div className="checkbox-grid">
          {items.map(item => (
            <label key={item.id} className="checkbox-card">
              <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => toggleItem(item.id)} />
              <span>{item.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="btn btn-primary" onClick={createBill}>Generate Bill</button>

      {bill && (
        <div className="bill-card">
          <h2>Bill Summary</h2>
          <p><strong>Customer:</strong> {bill.customer.name}</p>
          <div className="item-grid">
            {bill.items.map(item => (
              <div key={item.id} className="data-card">
                <strong>{item.name}</strong>
                <span>${item.price}</span>
              </div>
            ))}
          </div>
          <p className="bill-total">Total: ${bill.total}</p>
        </div>
      )}
    </div>
  );
}