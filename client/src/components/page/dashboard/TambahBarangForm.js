import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TambahBarangForm.css'; 

const TambahBarangForm = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/stock-barang'); 
  };

  return (
    <section className="tambah-barang-form">
      <h2>TAMBAH BARANG</h2>
      <form>
        <div>
          <label>Nama Produk</label>
          <input type="text" name="nama_produk" />
        </div>
        <div>
          <label>Deskripsi</label>
          <input type="text" name="deskripsi" />
        </div>
        <div>
          <label>Harga</label>
          <input type="text" name="harga" />
        </div>
        <div>
          <label>Stock</label>
          <input type="text" name="stock" />
        </div>
        <div className="buttons">
          <button type="submit">SUBMIT</button>
          <button type="button" onClick={handleCancel}>CANCEL</button>
        </div>
      </form>
    </section>
  );
}

export default TambahBarangForm;
