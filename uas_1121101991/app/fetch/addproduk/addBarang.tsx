import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddBarangPage = () => {
  const [formData, setFormData] = useState({
    NamaBarang: "",
    JenisBarang: "",
    StokBarang: 0,
    HargaBarang: 0,
    Supplyer: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:1337/api/barangs', {
        data: formData,
      });
      // Redirect to the Mahasiswa list page after successful submission
      router.push('/barang');
    } catch (error) {
      console.error('Error adding Barang:', error);
    }
  };

  return (
    <div>
      <h1>Add Barang</h1>
      <form onSubmit={handleSubmit}>
        <label>
          NamaBarang:
          <input type="text" name="NamaBarang" value={formData.NamaBarang} onChange={handleChange} />
        </label>
        <br />
        <label>
          JenisBarang:
          <input type="text" name="JenisBarang" value={formData.JenisBarang} onChange={handleChange} />
        </label>
        <br />
        <label>
          StokBarang:
          <input type="text" name="StokBarang" value={formData.StokBarang} onChange={handleChange} />
        </label>
        <br />
        <label>
          HargaBarang:
          <input type="text" name="HargaBarang" value={formData.HargaBarang} onChange={handleChange} />
        </label>
        <br />
        <label>
          Supplyer:
          <input type="text" name="Supplyer" value={formData.Supplyer} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Tambah Mahasiswa</button>
      </form>
    </div>
  );
};

export default AddBarangPage;