import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./main.css";

export default function ViewAllBooks() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    author: "",
    edition: ""
  });

  const [idToFetch, setIdToFetch] = useState("");
  const [fetchedBook, setFetchedBook] = useState(null);
  const [message, setMessage] = useState("");

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${config.url}/viewall`);
      setBooks(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch book data: " + err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (bid) => {
    try {
      const response = await axios.delete(`${config.url}/delete/${bid}`);
      toast.success(response.data);
      fetchBooks();
    } catch (err) {
      setError("Failed to delete book: " + err.message);
      toast.error("Deletion failed: " + err.message);
    }
  };

  const startEdit = (book) => {
    setEditId(book.id);
    setEditData({ ...book });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({ id: "", name: "", author: "", edition: "" });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const updateBook = async () => {
    try {
      await axios.put(`${config.url}/update`, editData);
      toast.success("Book updated successfully!");
      setEditId(null);
      fetchBooks();
    } catch (err) {
      toast.error("Failed to update book!");
    }
  };

  const getBookById = async () => {
    try {
      const res = await axios.get(`${config.url}/display?bid=${Number(idToFetch)}`);
      if (res.data) {
        setFetchedBook(res.data);
        setMessage("");
      } else {
        setFetchedBook(null);
        setMessage("Book not found.");
      }
    } catch (error) {
      setFetchedBook(null);
      setMessage("Book not found.");
    }
  };

  return (
    <div className="container">
      <h3 className="title">View All Books</h3>

      <ToastContainer position="top-center" autoClose={4000} />

      <div className="form-group">
        <input
          type="number"
          placeholder="Enter Book ID"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
        />
        <button onClick={getBookById}>Fetch</button>
      </div>
      {message && <p className="error-message">{message}</p>}

      {fetchedBook && (
        <div className="book-details">
          <h4>Book Found</h4>
          <pre>{JSON.stringify(fetchedBook, null, 2)}</pre>
        </div>
      )}

      {error ? (
        <p className="error-message">{error}</p>
      ) : books.length === 0 ? (
        <p className="error-message">No Book Data Found</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Author</th>
              <th>Edition</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((bk) => (
              <tr key={bk.id}>
                {editId === bk.id ? (
                  <>
                    <td>
                      <input type="text" value={editData.id} readOnly />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="author"
                        value={editData.author}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="edition"
                        value={editData.edition}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={updateBook}
                        style={{ marginRight: "5px" }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{bk.id}</td>
                    <td>{bk.name}</td>
                    <td>{bk.author}</td>
                    <td>{bk.edition}</td>
                    <td>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => startEdit(bk)}
                        style={{ marginRight: "5px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteBook(bk.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
