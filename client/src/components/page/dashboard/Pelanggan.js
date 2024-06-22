import React from 'react';
// import './pesanan.css';
import './Pelanggan.css'

const Pesanan = () => {
  return (
    <section className="pelanggan">
      <h2>KELOLA PELANGGAN</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>nama</th>
            <th>alamat</th>
            <th>email</th>
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
