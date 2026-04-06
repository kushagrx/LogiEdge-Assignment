import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Customers from './components/Customers';
import Items from './components/Items';
import Billing from './components/Billing';
import './App.css';

function Master() {
  return (
    <div className="page-block">
      <div className="page-head">
        <h1>Master</h1>
      </div>
      <div className="card-grid">
        <NavLink className="card" to="/customers">
          <h3>Customer</h3>
          <p>Read or create customer data</p>
        </NavLink>
        <NavLink className="card" to="/items">
          <h3>Items</h3>
          <p>Read or create items data</p>
        </NavLink>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="sidebar-brand">Master Home</div>
          <nav className="sidebar-nav">
            <NavLink className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} to="/">Dashboard</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} to="/">Master</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} to="/billing">Billing</NavLink>
          </nav>
        </aside>

        <main className="page-area">
          <div className="topbar"></div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Master />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/items" element={<Items />} />
              <Route path="/billing" element={<Billing />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}