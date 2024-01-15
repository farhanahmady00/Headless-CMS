'use client'
import { useState, useEffect } from "react";
import axios from 'axios';
import router, { useRouter } from 'next/router';
import Modal from "react-modal";

interface Barang {
  id: number;
  attributes: {
    NamaBarang: string;
    JenisBarang: string;
    StokBarang: number;
    HargaBarang: number;
    Supplyer:string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

async function getData(): Promise<Barang[]> {
  try {
    const response = await axios.get('http://localhost:1337/api/barangs');
    return response.data.data as Barang[];
  } catch (error) {
    throw new Error("Gagal Mendapat Data");
  }
}

export default function Home() {
  const [data, setData] = useState<Barang[]>([]);
  const [selectedBarang, setSelectedBarang] = useState<Barang | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [newBarang, setNewBarang] = useState({
    NamaBarang: "",
    JenisBarang: "",
    StokBarang: 0,
    HargaBarang: 0,
    Supplyer:""
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getData();
        setData(fetchedData || []);
        console.log(data)
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, []);

  const handleShow = (barang: Barang) => {
    setSelectedBarang(barang);
    setModalIsOpen(true);
  };
  const handleCreate = () => {
    setAddModalIsOpen(true)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBarang((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:1337/api/barangs', {
        data: newBarang
      });
      window.location.reload();
    } catch (error) {
      console.error('Error adding barang:', error);
    }
  };

  const handleEdit = (barang: Barang) => {
    setSelectedBarang(barang);
    router.push(`/editBarang/${barang.id}`);
  };

  const handleDelete = async (barang: Barang) => {
    const userConfirmed = window.confirm(`Deleting Barang: ${barang.attributes.NamaBarang} - ${barang.attributes.JenisBarang}`);
    if (userConfirmed) {
    try {
      // Implement your delete logic here
      await axios.delete(`http://localhost:1337/api/barangs/${barang.id}`);
      // Fetch updated data after deletion
      const updatedData = await getData();
      setData(updatedData || []);
    } catch (error) {
      console.error('Error deleting Mahasiswa:', error);
    }
  } else{
    window.location.reload();
  }
};

  const closeModal = () => {
    setSelectedBarang(null);
    setModalIsOpen(false);
  };

  return (
    <>
        <h1>Tabel Data Barang</h1>
        <button className="btn btn-green" onClick={() => handleCreate()}>Tambah</button>
        <table className="table">
            <thead>
                <tr>
                    <th>NO</th>
                    <th>Nama Barang</th>
                    <th>Jenis Barang</th>
                    <th>Stok Barang</th>
                    <th>Harga Barang</th>
                    <th>Supllyer</th>
                </tr>
            </thead>
        
            <tbody>
                {data.map((barang) => (
                <tr key={barang.id}>
                <td>{barang.id}</td>
                <td>{barang.attributes.NamaBarang}</td>
                <td>{barang.attributes.JenisBarang}</td>
                <td>{barang.attributes.StokBarang}</td>
                <td>{barang.attributes.HargaBarang}</td>
                <td>{barang.attributes.Supplyer}</td>
                <td>
                    <button className="btn btn-blue" onClick={() => handleShow(barang)}>Detail</button>
                    <button className="btn btn-yellow" onClick={() => router.push(`/edit/${barang.id}`)}>Edit</button>
                    <button className="btn btn-red" onClick={() => handleDelete(barang)}>Hapus</button>
                    </td>
                </tr>
                    ))}
            </tbody>
        </table>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Detail barang"
            >
                {selectedBarang && (
                <div>
                    <h2>Barang Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Nama Barang</th>
                                <th>Jenis</th>
                                <th>Stok</th>
                                <th>Harga</th>
                                <th>Supplyer</th>
                                <th>Tanggal</th>
                                <th>Update</th>
                                <th>Publish</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedBarang.attributes.NamaBarang}</td>
                                <td>{selectedBarang.attributes.JenisBarang}</td>
                                <td>{selectedBarang.attributes.StokBarang}</td>
                                <td>{selectedBarang.attributes.HargaBarang}</td>
                                <td>{selectedBarang.attributes.Supplyer}</td>
                                <td>{selectedBarang.attributes.createdAt}</td>
                                <td>{selectedBarang.attributes.updatedAt}</td>
                                <td>{selectedBarang.attributes.publishedAt}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-red" onClick={closeModal}>Tutup</button>
                </div>
                )}
        </Modal>

      <Modal
        isOpen={addModalIsOpen}
        onRequestClose={() => setAddModalIsOpen(false)}
        contentLabel="Form Tambah Barang">
        <div>
            <h2>Tambah Barang</h2>
            <form>
              <label>
                Nama Barang:
                <input style={{backgroundColor:"#787878"}} type="text" name="NamaBarang" onChange={handleInputChange} />
              </label>
              <br />
              <label>
                Jenis Barang:
                <input style={{backgroundColor:"#787878"}} type="text" name="JenisBarang" onChange={handleInputChange} />
              </label>
              <br />
              <label>
                Stok Barang:
                <input style={{backgroundColor:"#787878"}} type="text" name="StokBarang" onChange={handleInputChange} />
              </label>
              <br />
              <label>
                Harga Barang:
                <input style={{backgroundColor:"#787878"}} type="text" name="HargaBarang" onChange={handleInputChange} />
              </label>
              <br />
              <label>
                Supplyer:
                <input style={{backgroundColor:"#787878"}} type="text" name="Supplyer" onChange={handleInputChange} />
              </label>
              <br />
              <button type="button" className="btn btn-green" onClick={handleAddSubmit}>Simpan</button>
            </form>
          </div>
      </Modal>

    </>
  );
}