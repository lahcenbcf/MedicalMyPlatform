import Login from './pages/Login';
import HomePage from "./pages/HomePage"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './AppLayout';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AppLayout />}>
        <Route path='/' element={<HomePage />} />
        </Route>
        <Route path='/login' element={<Login />} />
        
      </Routes>
    </Router>
  );
}

export default App;
