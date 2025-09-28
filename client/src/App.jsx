import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // this must match your file + component
import Navbar from './components/Navbar';
import PaymentSuccess from './pages/PaymentSuccess';
import Login from './pages/Login';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/payment-success/:subscriptionId" element={<PaymentSuccess />} />
      <Route path="/login" element={<Login/>}/>

    </Routes>
    </>
  );
}

export default App;
