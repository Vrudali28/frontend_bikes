
/*import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingBike from './pages/BookingBike';
import UserBookings from './pages/UserBookings';
import AddBike from './pages/AddBike';
import AdminHome from './pages/AdminHome';
import EditBike from './pages/EditBike';
function App() {
  const isAuthenticated = localStorage.getItem('user');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!isAuthenticated && <Route path='*' element={<Navigate to="/login" />} />}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {isAuthenticated && (
            <>
              <Route path='/' element={<Home />} />
              <Route path='/booking/:bikeid' element={<BookingBike/>} />
              <Route path='/userbookings' element={<UserBookings/>} />
              <Route path='/addbike' element={<AddBike/>} />
              <Route path='/editbike/:bikeid' element={<EditBike/>} />
              <Route path='/admin' element={<AdminHome/>} />

            
              
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;*/

import './App.css';
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingBike from './pages/BookingBike';
import UserBookings from './pages/UserBookings';
import AddBike from './pages/AddBike';
import AdminHome from './pages/AdminHome';
import EditBike from './pages/EditBike';

function App() {
  const isAuthenticated = localStorage.getItem('user');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {isAuthenticated ? (
            <>
              <Route path='/' element={<Home />} />
              <Route path='/booking/:bikeid' element={<BookingBike />} />
              <Route path='/userbookings' element={<UserBookings />} />
              <Route path='/addbike' element={<AddBike />} />
              <Route path='/editbike/:bikeid' element={<EditBike />} />
              <Route path='/admin' element={<AdminHome />} />
            </>
          ) : (
            <Route path='*' element={<Navigate to="/login" />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

