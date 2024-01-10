import Login from './pages/Login';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './AppLayout';
import ForgotPass from './pages/ForgotPass';
import ChangePass from './pages/ChangePass';
import Register from './pages/Register';
import ConfirmPage from './pages/ConfirmPage';
import Dash from './pages/LandingPage';
import PatientScreen from './pages/PatientScreen';
import MedProfile from './pages/MedProfile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPass" element={<ForgotPass />} />
        <Route path="/changePass" element={<ChangePass />} />
        <Route path="/confirm" element={<ConfirmPage />} />

        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dash />} />
          <Route path="/patient/:patientId" element={<PatientScreen />} />
          <Route path="/myProfile" element={<MedProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
