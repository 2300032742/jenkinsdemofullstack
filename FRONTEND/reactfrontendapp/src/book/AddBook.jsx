import { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function AddBook() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    author: '',
    edition: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.url}/add`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setFormData({
          id: '',
          name: '',
          author: '',
          edition: ''
        });
        setError('');
      }
    } catch (error) {
      setMessage('');
      setError(error.response ? error.response.data : "An unexpected error occurred.");
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Add Book</h3>
      {
        message ?
          <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>{message}</p> :
          <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>{error}</p>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book ID</label>
          <input type="number" id="id" value={formData.id} onChange={handleChange} required />
        </div>
        <div>
          <label>Book Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Author</label>
          <input type="text" id="author" value={formData.author} onChange={handleChange} required />
        </div>
        <div>
          <label>Edition</label>
          <input type="text" id="edition" value={formData.edition} onChange={handleChange} required />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
