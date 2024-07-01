import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const Officer = () => {
  const [officers, setOfficers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    hp: "",
    position: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [selectedOfficerId, setSelectedOfficerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/officers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOfficers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching officers:", error);
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      address: "",
      email: "",
      hp: "",
      position: "",
      username: "",
      password: "",
    });
    setSelectedOfficerId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddOfficer = async () => {
    if (
      formData.name &&
      formData.address &&
      formData.email &&
      formData.hp &&
      formData.position &&
      formData.username &&
      formData.password
    ) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:5000/api/officers", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOfficers([...officers, response.data]);
        handleCloseModal();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Officer berhasil ditambahkan.",
        });
      } catch (error) {
        console.error("Error adding officer:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat menambahkan officer.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Pastikan semua field terisi sebelum menambahkan officer.",
      });
    }
  };
  
  const handleUpdateOfficer = async () => {
    if (
      formData.name &&
      formData.address &&
      formData.email &&
      formData.hp &&
      formData.position &&
      formData.username
    ) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`http://localhost:5000/api/officers/${selectedOfficerId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOfficers(officers.map((officer) => (officer.id_officer === selectedOfficerId ? response.data : officer)));
        handleCloseModal();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Officer berhasil diperbarui.",
        });
      } catch (error) {
        console.error("Error updating officer:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat memperbarui officer.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Pastikan semua field terisi sebelum memperbarui officer.",
      });
    }
  };

  const handleEditClick = (officer) => {
    setFormData({
      name: officer.name,
      address: officer.address,
      email: officer.email,
      hp: officer.hp,
      position: officer.position,
      username: officer.username,
      password: "",
    });
    setSelectedOfficerId(officer.id_officer);
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/officers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOfficers(officers.filter((officer) => officer.id_officer !== id));
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Officer berhasil dihapus.",
      });
    } catch (error) {
      console.error("Error deleting officer:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menghapus officer.",
      });
    }
  };

  // Filter officers based on search term
  const filteredOfficers = officers.filter((officer) =>
    officer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-5">
      <h2 className="text-2xl font-bold mb-4">Daftar Officer</h2>
      <div className="flex mb-3">
        <Button variant="primary" onClick={handleAddClick} className="mb-3">
          Tambah Officer
        </Button>
        <input
          type="text"
          placeholder="Cari berdasarkan nama..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-auto px-2 py-1 border border-gray-300 rounded-md"
        />
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. HP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posisi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-4">Loading...</td>
              </tr>
            ) : filteredOfficers.length ? (
              filteredOfficers.map((officer) => (
                <tr key={officer.id_officer}>
                  <td className="px-4 py-2 border-b">{officer.id_officer}</td>
                  <td className="px-4 py-2 border-b">{officer.name}</td>
                  <td className="px-4 py-2 border-b">{officer.address}</td>
                  <td className="px-4 py-2 border-b">{officer.email}</td>
                  <td className="px-4 py-2 border-b">{officer.hp}</td>
                  <td className="px-4 py-2 border-b">{officer.position}</td>
                  <td className="px-4 py-2 border-b">{officer.username}</td>
                  <td className="px-4 py-2 border-b">
                    <Button variant="info" onClick={() => handleEditClick(officer)} className="mr-2 mb-2">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteClick(officer.id_officer)} className="mb-2">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">Tidak ada data ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedOfficerId ? "Edit Officer" : "Tambah Officer"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Masukkan nama"
              required
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Alamat</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Masukkan alamat"
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Masukkan email"
              required
            />
          </Form.Group>
          <Form.Group controlId="hp">
            <Form.Label>No. HP</Form.Label>
            <Form.Control
              type="text"
              name="hp"
              value={formData.hp}
              onChange={handleInputChange}
              placeholder="Masukkan nomor HP"
              required
            />
          </Form.Group>
          <Form.Group controlId="position">
            <Form.Label>Posisi</Form.Label>
            <Form.Control
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Masukkan posisi"
              required
            />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Masukkan username"
              required
            />
          </Form.Group>
          {selectedOfficerId ? null : (
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Masukkan password"
                required
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Batal
          </Button>
          {selectedOfficerId ? (
            <Button variant="primary" onClick={handleUpdateOfficer}>
              Simpan Perubahan
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAddOfficer}>
              Tambah
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Officer;
