import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
//BrowserRouter - wraps where everywhere we want to use router
//Routes - wraps individual routes
//Route - create a single route

//pages & components
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home'
import Navbar from './components/Navbar';

function App() {

  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ?<Home />:<Navigate to='/login'/>}
            />
            <Route
              path="/login"
              element={!user ? <Login />: <Navigate to='/'/>}
            />
            <Route
              path="/signup"
              element={!user ? <Signup />: <Navigate to='/'/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
