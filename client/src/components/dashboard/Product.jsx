import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";

const StockBarang = () => {
  const [produk, setProduk] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name_product: "",
    description_product: "",
    cost: 0,
    stock: 0,
    id_category: "",
  });
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProduk();
    fetchCategories();
  }, []);

  const fetchProduk = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduk(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching produk:", error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddButtonClick = () => {
    setShowModal(true);
    setSelectedProduct(null);
    setFormData({
      name_product: "",
      description_product: "",
      cost: 0,
      stock: 0,
      id_category: "",
    });
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    setFormData({
      name_product: product.name_product,
      description_product: product.description_product,
      cost: product.cost,
      stock: product.stock,
      id_category: product.id_category,
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const result = await Swal.fire({
        title: "Apakah Anda yakin ingin menghapus produk ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduk(produk.filter((item) => item.id_product !== id));
        Swal.fire({
          icon: "success",
          title: "Berhasil Menghapus",
          text: "Produk berhasil dihapus.",
        });
      }
    } catch (error) {
      console.error("Error deleting produk:", error);
      if (error.response && error.response.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Gagal Menghapus",
          text: "Produk Ada Pada Pesanan Pelanggan",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Menghapus",
          text: "Terjadi kesalahan saat menghapus produk.",
        });
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setFormData({
      name_product: "",
      description_product: "",
      cost: 0,
      stock: 0,
      id_category: "",
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
    if (
      !formData.name_product ||
      !formData.description_product ||
      formData.cost <= 0 ||
      formData.stock < 0 ||
      !formData.id_category
    ) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Pastikan semua field terisi dengan benar.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const apiEndpoint = selectedProduct
        ? `http://localhost:5000/api/products/${selectedProduct.id_product}`
        : "http://localhost:5000/api/products";

      const method = selectedProduct ? "put" : "post";

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
        const updatedProdukList = produk.map((item) =>
          item.id_product === selectedProduct.id_product ? response.data : item
        );
        setProduk(updatedProdukList);
      } else {
        setProduk([...produk, response.data]);
      }

      handleCloseModal();
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: selectedProduct
          ? "Produk berhasil diperbarui."
          : "Produk berhasil ditambahkan.",
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: selectedProduct
          ? "Gagal memperbarui produk."
          : "Gagal menambahkan produk.",
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProduk = produk.filter((product) =>
    product.name_product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Product</h2>
      <div className="flex mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          onClick={handleAddButtonClick}
        >
          Add Product
        </button>
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0120.708 7.5H16m-5.373 14.373A8.001 8.001 0 014.5 11V6.292"
              ></path>
            </svg>
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Desc Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProduk.map((product) => (
                <tr key={product.id_product}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.id_product}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name_product}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.description_product}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.cost}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.id_category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDeleteClick(product.id_product)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? "Edit Produk" : "Tambah Produk"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              placeholder="Masukkan harga produk"
              name="cost"
              value={formData.cost}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formStock">
            <Form.Label>Stok</Form.Label>
            <Form.Control
              type="number"
              placeholder="Masukkan stok produk"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Kategori</Form.Label>
            <Form.Control
              as="select"
              name="id_category"
              value={formData.id_category}
              onChange={handleInputChange}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category.id_category} value={category.id_category}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleModalEdit}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StockBarang;
