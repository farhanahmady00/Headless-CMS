import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Barang {
  id: number;
  attributes: {
    NamaBarang: string;
    JenisBarang: string;
    StokBarang: number;
    HargaBarang: number;
    Supplyer: string;
  };
}

const EditBarangPage = () => {
  const [formData, setFormData] = useState({
    NamaBarang: "",
    JenisBarang: "",
    StokBarang: 0,
    HargaBarang: 0,
    Supplyer: "",
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/barangs/${id}`);
        const barangData = response.data.data as Barang;
        setFormData({
          NamaBarang: barangData.attributes.NamaBarang,
          JenisBarang: barangData.attributes.JenisBarang,
          StokBarang: barangData.attributes.StokBarang,
          HargaBarang: barangData.attributes.HargaBarang,
          Supplyer: barangData.attributes.Supplyer,
        });
      } catch (error) {
        console.error('Error fetching Barang:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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
      await axios.put(`http://localhost:1337/api/barangs/${id}`, {
        data: formData,
      });
      // Redirect to the Mahasiswa list page after successful submission
      router.push('/barang');
    } catch (error) {
      console.error('Error updating Barang:', error);
    }
  };

  return (
    <div>
      <h1>Edit Barang</h1>
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
        <button type="submit">Update Mahasiswa</button>
      </form>
    </div>
  );
};

export default EditBarangPage;