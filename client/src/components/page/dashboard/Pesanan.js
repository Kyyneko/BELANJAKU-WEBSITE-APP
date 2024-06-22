import React from 'react';
// import './pesanan.css';
import './Pesanan.css'

const Pesanan = () => {
  return (
    <section className="pesanan">
      <h2>KELOLA ORDER</h2>
      <table>
        <thead>
          <tr>
            <th>id_pelanggan</th>
            <th>nama_produk</th>
            <th>jumlah</th>
            <th>tanggal pemesanan</th>
            <th>status</th>
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
