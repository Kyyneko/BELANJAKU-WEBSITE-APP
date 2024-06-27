import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';

const StockBarang = () => {
  const navigate = useNavigate();
  const [produk, setProduk] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name_product: '',
    description_product: '',
    cost: 0,
    stock: 0,
    id_category: '',
  });

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProduk(response.data);
      } catch (error) {
        console.error('Error fetching produk:', error);
      }
    };

    fetchProduk();
  }, []);

  const handleAddButtonClick = () => {
    setFormData({
      name_product: '',
      description_product: '',
      cost: 0,
      stock: 0,
      id_category: '',
    });
    setShowModal(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name_product: product.name_product,
      description_product: product.description_product,
      cost: product.cost,
      stock: product.stock,
      id_category: product.id_category,
    });
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const result = await Swal.fire({
        title: 'Apakah Anda yakin ingin menghapus produk ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProduk(produk.filter((item) => item.id_product !== id));
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Menghapus',
          text: 'Produk berhasil dihapus.',
        });
      }
    } catch (error) {
      console.error('Error deleting produk:', error);
      if (error.response && error.response.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Menghapus',
          text: 'Produk Ada Pada Pesanan Pelanggan',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Menghapus',
          text: 'Terjadi kesalahan saat menghapus produk.',
        });
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setFormData({
      name_product: '',
      description_product: '',
      cost: 0,
      stock: 0,
      id_category: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleModalEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiEndpoint = selectedProduct
        ? `http://localhost:5000/api/products/${selectedProduct.id_product}`
        : 'http://localhost:5000/api/products';

      const method = selectedProduct ? 'put' : 'post';

      const productData = {
        name_product: formData.name_product,
        description_product: formData.description_product,
        cost: formData.cost,
        stock: formData.stock,
        id_category: formData.id_category,
      };

      const response = await axios[method](apiEndpoint, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (selectedProduct) {
        const updatedProdukList = produk.map(item =>
          item.id_product === selectedProduct.id_product ? response.data : item
        );
        setProduk(updatedProdukList);
      } else {
        setProduk([...produk, response.data]);
      }

      handleCloseModal();
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: selectedProduct ? 'Produk berhasil diperbarui.' : 'Produk berhasil ditambahkan.',
      });
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: selectedProduct ? 'Gagal memperbarui produk.' : 'Gagal menambahkan produk.',
      });
    }
  };

  return (
    <section className="stock-barang container mt-5">
      <h2 className="mb-4">STOCK BARANG</h2>
      <Button className="mb-4" onClick={handleAddButtonClick}>Tambah Barang</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id_product</th>
            <th>name_product</th>
            <th>description_product</th>
            <th>cost</th>
            <th>stock</th>
            <th>id_category</th>
            <th>aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.map((item) => (
            <tr key={item.id_product}>
              <td>{item.id_product}</td>
              <td>{item.name_product}</td>
              <td>{item.description_product}</td>
              <td>{item.cost}</td>
              <td>{item.stock}</td>
              <td>{item.id_category}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEditClick(item)}>✏</Button>
                <Button variant="danger" onClick={() => handleDeleteClick(item.id_product)}>❌</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? 'Edit Produk' : 'Tambah Produk'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nama Produk</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama produk"
                name="name_product"
                value={formData.name_product}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Deskripsi Produk</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Masukkan deskripsi produk"
                name="description_product"
                value={formData.description_product}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCost">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="number"
                placeholder="Masukkan harga"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStock">
              <Form.Label>Stok</Form.Label>
              <Form.Control
                type="number"
                placeholder="Masukkan stok"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>ID Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan ID kategori"
                name="id_category"
                value={formData.id_category}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleModalEdit}>
            {selectedProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default StockBarang;
