import { Routes, Route } from 'react-router-dom';
import ServiceList from '../pages/ServiceList';
import Details from '../pages/Details';
import LoginForm from '../pages/Login';
import RegisterForm from '../pages/Register';
import Basket from '../pages/Basket';
import Orders from '../pages/Orders';


export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<ServiceList />} />
      <Route path="/services/:id" element={<Details />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/allOrders" element={<Orders />} />
    </Routes>
  );
}
