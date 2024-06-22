import React from 'react';
// import './pesanan.css';
import './Transaksi.css'

const Pesanan = () => {
  return (
    <section className="transaksi">
      <h2>KELOLA PEMBAYARAN</h2>
      <table>
        <thead>
          <tr>
            <th>id_pesanan</th>
            <th>metode pembayaran</th>
            <th>tanggal pembayaran</th>
            <th>jumlah</th>
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
