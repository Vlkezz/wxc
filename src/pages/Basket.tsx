// pages/Basket.tsx
import { useBasket } from '../hooks/useBasket';
import BasketCard from '../components/BasketCard';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { CreateOrderAPI } from '../API/createOrder';

export default function Basket() {
  const { 
    items, 
    remove, 
    updateitemQuantity,
    clear,
    totalPrice,
    count
  } = useBasket();
  
  const navigate = useNavigate();

  const handleCheckout = async () => {
  try {
    await CreateOrderAPI();
    const orderId = localStorage.getItem('orderId');

    if (orderId) {
      console.log('Order ID:', orderId);
      alert('Ваш заказ успешно выполнен.');
    } else {
      console.error('Order ID не найден');
      alert('Ошибка при оформлении заказа.');
    }
  } catch (error) {
    console.error('Ошибка оформления заказа:', error);
    alert('Не удалось оформить заказ, попробуйте позже.');
  }
};

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <Container className="py-4">
      {/* Шапка с заголовком и кнопкой очистки */}
      <Row className="mb-4 align-items-center">
        <Col >
          <h2>Ваша корзина</h2>
          {count > 0 && (
            <div className="text-muted">Товаров: {count}</div>
          )}
        </Col>
        {items.length > 0 && (
          <Col xs="auto">
            <Button 
              variant="outline-danger" 
              onClick={clear}
              size="sm"
            >
              Очистить корзину
            </Button>
          </Col>
        )}
      </Row>

      {/* Основное содержимое */}
      {items.length === 0 ? (
        <Alert className="text-center">
          <Alert.Heading>Корзина пуста</Alert.Heading>
          <p>Выберите услуги в нашем каталоге</p>
          <Button  className="custom-button"  onClick={handleContinueShopping} >
            Перейти к услугам
          </Button>
        </Alert>
      ) : (
        <>
          {/* Список товаров */}
          <Row xs={1} md={2} lg={4} className="g-4">
            {items.map(item => (
              <Col key={item.service.id}>
                <BasketCard
                  service={item.service}
                  quantity={item.quantity}
                  onRemove={remove}
                  onQuantityChange={updateitemQuantity}
                />
              </Col>
            ))}
          </Row>

          {/* Панель итогов */}
          <div className="mt-4 p-3 bg-light rounded-3">
            <Row className="align-items-center">
              <Col>
                <h4 className="mb-0">
                  Итого: <strong>{totalPrice} руб</strong>
                </h4>
              </Col>
              <Col xs="auto">
                <Button 
                  variant="success" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Оформить заказ
                </Button>
              </Col>
            </Row>
          </div>
        </>
      )}
    </Container>
  );
}