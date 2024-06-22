import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './Dashboard.css'; 
import market from './images/farmer-market.png';
import user from './images/customers.jpg';
import stockIcon from './images/blockchain.png';
import orderIcon from './images/shopping-cart.png';
import transactionIcon from './images/wallet-2.png';
import customerIcon from './images/users.png';
import categoryIcon from './images/shopping-label.png';
import StockBarang from './Stockbarang';
import Pesanan from './Pesanan';
import Transaksi from './Transaksi';
import Pelanggan from './Pelanggan';
import Kategori from './Kategori';
import TambahBarangForm from './TambahBarangForm';

const Dashboard = () => {
  return (
    <Router>
      <div className="dashboard">
        <aside className="sidebar">
          <div className="logo">
            <img src={market} alt="Logo" />
          </div>
          <nav>
            <ul>
              <li><Link to="/stock-barang"><img src={stockIcon} alt="Stock" className="icon"/> Stock Barang</Link></li>
              <li><Link to="/pesanan"><img src={orderIcon} alt="Order" className="icon"/> Pesanan</Link></li>
              <li><Link to="/transaksi"><img src={transactionIcon} alt="Transaction" className="icon"/> Transaksi</Link></li>
              <li><Link to="/pelanggan"><img src={customerIcon} alt="Customer" className="icon"/> Pelanggan</Link></li>
              <li><Link to="/kategori"><img src={categoryIcon} alt="Category" className="icon"/> Kategori</Link></li>
            </ul>
          </nav>
        </aside>
        <div className="main-container">
          <header className="header">
            <h1>BELANJAKUU</h1>
            <div className="user-profile">
              <img src={user} alt="User" />
            </div>
          </header>
          <main className="main-content">
            <Routes>
              <Route path="/stock-barang" element={<StockBarang />} />
              <Route path="/pesanan" element={<Pesanan />} />
              <Route path="/transaksi" element={<Transaksi />} />
              <Route path="/pelanggan" element={<Pelanggan />} />
              <Route path="/kategori" element={<Kategori />} />
              <Route path="/tambah-barang" element={<TambahBarangForm />} />
              {/* Add more routes here as needed */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default Dashboard;
