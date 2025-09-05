import { Routes, Route, Link } from 'react-router-dom';
import AddBook from './AddBook';
import ViewAllBooks from './ViewAllBooks';
import './style.css';


export default function NavBar() {
  return (
    <div>
      <nav className="navbar">
        
        <ul className="nav-links">
          <li><Link to="/addbook">Add</Link></li>
          <li><Link to="/viewallbooks">View All</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/viewallbooks" element={<ViewAllBooks />} />
       
      </Routes>
    </div>
  );
}