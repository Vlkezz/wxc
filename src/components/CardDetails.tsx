import '../styles/service_details.css';
import type { Service } from '../interface/Service';
import { useNavigate } from 'react-router-dom';

interface Props {service:Service}

export default function DetailsCard({ service }:Props) {
     const navigate = useNavigate();
return (
 <div className="main-container">
    <div className="container-details">
      <h1>{service.name}</h1>
      <img src={service.image}/>
      <p>{service.description} </p>
      <p>Цена: {service.price} руб.</p>
       <div className="button-details">
      <button className="backbutton" onClick={() => navigate(`/`)}>
        Список услуг
      </button>
      <button className="basketButton" onClick={() => console.log('Добавлено в корзину')}>
        <img src="/images/basket.png" alt="Корзина" />
      </button>
    </div>

      
    </div>
</div>
);
}

