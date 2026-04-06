import { useState, useEffect } from 'react';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pan, setPan] = useState('');
  const [gst, setGst] = useState('');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    fetch('http://localhost:5000/customers')
      .then(res => res.json())
      .then(setCustomers);
  }, []);

  const resetForm = () => {
    setName('');
    setAddress('');
    setPan('');
    setGst('');
    setStatus('Active');
  };

  const createCustomer = (event) => {
    event.preventDefault();
    const newCustomer = {
      id: Date.now(),
      name,
      address,
      pan,
      gst,
      status,
    };

    fetch('http://localhost:5000/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCustomer),
    }).then(() => {
      setCustomers([...customers, newCustomer]);
      resetForm();
    });
  };

  return (
    <div className="page-block">
      <div className="page-head">
        <h1>Add New Customer</h1>
      </div>
      <form className="form-grid" onSubmit={createCustomer}>
        <label>
          <span>Customer Name</span>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" />
        </label>
        <label>
          <span>Customer Address</span>
          <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter address" />
        </label>
        <label>
          <span>Customer Pan Card Number</span>
          <input value={pan} onChange={e => setPan(e.target.value)} placeholder="Enter PAN" />
        </label>
        <label>
          <span>Customer GST Number</span>
          <input value={gst} onChange={e => setGst(e.target.value)} placeholder="Enter GST" />
        </label>
        <label className="full-width">
          <span>Customer Status</span>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option>Active</option>
            <option>In-Active</option>
          </select>
        </label>
        <div className="form-actions full-width">
          <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
          <button type="submit" className="btn btn-primary">Create</button>
        </div>
      </form>
      {customers.length > 0 && (
        <div className="list-section">
          <h2>Saved Customers</h2>
          <div className="item-grid">
            {customers.map(customer => (
              <div className="data-card" key={customer.id}>
                <strong>{customer.name}</strong>
                <p>{customer.address}</p>
                <span className={`badge ${customer.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                  {customer.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}