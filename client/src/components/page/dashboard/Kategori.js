import React from 'react';
// import './pesanan.css';
import './Kategori.css'

const Pesanan = () => {
  return (
    <section className="kategori">
      <h2>KELOLA KATEGORI</h2>
      <table>
        <thead>
          <tr>
            <th>id_kategori</th>
            <th>nama_kategori</th>
            <th>deskripsi</th>
            <th>aksi</th>
            <th>nomor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {/* Repeat the above <tr> for each item in your stock */}
        </tbody>
      </table>
    </section>
  );
}

export default Pesanan;
