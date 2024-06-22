// StockBarang.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StockBarang.css';

const StockBarang = () => {
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate('/tambah-barang');
  };

  return (
    <section className="stock-barang">
      <h2>STOCK BARANG</h2>
      <button className="add-button" onClick={handleAddButtonClick}>Tambah Barang</button>
      <table>
        <thead>
          <tr>
            <th>id_produk</th>
            <th>nama_produk</th>
            <th>deskripsi</th>
            <th>harga</th>
            <th>stok</th>
            <th>id_kategori</th>
            <th>aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td className="actions">
              <span className="edit">✔</span>
              <span className="delete">❌</span>
            </td>
          </tr>
          {/* Repeat the above <tr> for each item in your stock */}
        </tbody>
      </table>
    </section>
  );
};

export default StockBarang;
