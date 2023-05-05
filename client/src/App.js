import AllUsers from './Component/AllUsers';
import AddUser from './Component/AddUser';
import EditUser from './Component/EditUser';
import Navbar from './Component/Navbar';
import NotFound from './Component/NotFound'; 
import Payroll from './Component/Payroll';
import Register from './Component/Register';
import LogIn from './Component/LogIn';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>    
        
        <Route path="/" element={<Payroll /> } />
        <Route path="all" element={<AllUsers /> } />
        <Route path="/add" element={<AddUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={< LogIn />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

