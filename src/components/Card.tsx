import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/service_card.css';
import type { Service } from '../interface/Service';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../hooks/useBasket';

interface Props {service:Service}

export default function ServiceCard({ service }:Props) {
  const navigate = useNavigate();
  const { add, isInBasket } = useBasket();
  
   const handleAddToBasket = (e: React.MouseEvent) => {
    e.stopPropagation();
    add(service);
  };
  return (
   <Card className="shadow rounded-4 text-center custom-card h-100">
      <Card.Img
        variant="top"
        src={service.image}
        alt={service.name}
        style={{ height: '100px', objectFit: 'contain', marginTop: '10px' }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{service.name}</Card.Title>
        <Card.Text>Цена: {service.price} руб</Card.Text>
      </Card.Body>

      <Card.Footer className="bg-transparent border-0 d-flex gap-2 justify-content-between" >
        <Button
          className="flex-grow-1 custom-button rounded-3 "
          onClick={() => navigate(`/services/${service.id}`)}
        >
          Подробнее
        </Button>

       <Button
          className={`basket-button d-flex align-items-center justify-content-center rounded-3 ${
             isInBasket(service.id) ? 'added' : ''
       }`}
          onClick={handleAddToBasket}
          disabled={isInBasket(service.id)}
          variant={isInBasket(service.id) ? "success" : "outline-primary"}
      >
          <img src="/wxc/images/basket.png" alt="Добавить в корзину" />
        </Button>
      </Card.Footer>
    </Card>
  );
}