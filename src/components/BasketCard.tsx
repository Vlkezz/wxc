import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/service_card.css';
import type { Service } from '../interface/Service';

interface Props {service: Service; quantity: number;  onRemove: (id: number) => void;
 onQuantityChange: (id: number, newQuantity: number) => void }

export default function BasketCard({ service, quantity, onRemove, onQuantityChange 
}: Props) {
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
        <Card.Text>Итого: {service.price * quantity} руб</Card.Text>
      </Card.Body>

      <Card.Footer className="bg-transparent border-0 d-flex gap-2 justify-content-between">
        <div className="d-flex align-items-center">
          <Button 
            variant="outline-secondary" 
            onClick={() => onQuantityChange(service.id, quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="mx-2">{quantity}</span>
          <Button 
            variant="outline-secondary" 
            onClick={() => onQuantityChange(service.id, quantity + 1)}
          >
            +
          </Button>
        </div>

        <Button
          variant="danger"
          onClick={() => onRemove(service.id)}
        >
          Удалить
        </Button>
      </Card.Footer>
    </Card>
  );
}