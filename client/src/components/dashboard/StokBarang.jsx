import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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

  useEffect(() => {
    fetchProduk();
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
    } catch (error) {
      console.error("Error fetching produk:", error);
    }
  };

  const handleAddButtonClick = () => {
    setFormData({
      name_product: "",
      description_product: "",
      cost: 0,
      stock: 0,
      id_category: "",
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

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">STOCK BARANG</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleAddButtonClick}
      >
        Tambah Barang
      </button>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Produk
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Produk
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deskripsi Produk
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harga
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stok
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {produk.map((product) => (
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
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {selectedProduct ? "Edit Produk" : "Tambah Produk"}
                    </h3>
                    <div className="mt-2">
                      <div className="mb-4">
                        <label
                          htmlFor="name_product"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nama Produk
                        </label>
                        <input
                          type="text"
                          name="name_product"
                          id="name_product"
                          value={formData.name_product}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="description_product"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Deskripsi Produk
                        </label>
                        <textarea
                          name="description_product"
                          id="description_product"
                          value={formData.description_product}
                          onChange={handleInputChange}
                          rows="3"
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="cost"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Harga
                        </label>
                        <input
                          type="number"
                          name="cost"
                          id="cost"
                          value={formData.cost}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="stock"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Stok
                        </label>
                        <input
                          type="number"
                          name="stock"
                          id="stock"
                          value={formData.stock}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="id_category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Kategori
                        </label>
                        <input
                          type="text"
                          name="id_category"
                          id="id_category"
                          value={formData.id_category}
                          onChange={handleInputChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleModalEdit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockBarang;
