import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ServiceCard from '../components/Card';
import SearchForm from '../components/SearchForm';
import '../styles/service_card.css';
import { useEffect, useState } from 'react';
import type { Service } from '../interface/Service';
import type { ServiceFilter } from '../interface/Form';

export default function ServiceList() {
  const [services, setServices] = useState<Service[]>([]);
  const [filters, setFilters] = useState<ServiceFilter>({
    name: '',
    price_min: null,
    price_max: null,
  });
  const [hasSearched, setHasSearched] = useState(false);

  // Мок-данные для услуг
  const mockServices: Service[] = [
    {
      id: 1,
      name: 'Установка Docker',
      description: 'Полная установка и настройка Docker',
      price: 500,
      image: '/wxc/images/error.png',
      status: 'active'
    },
    {
      id: 2,
      name: 'Установка антивируса',
      description: 'Установка и настройка антивирусной программы',
      price: 1000,
      image: '/wxc/images/error.png',
      status: 'active'
    },
    {
      id: 3,
      name: 'Настройка базы данных',
      description: 'Настройка и оптимизация БД',
      price: 1500,
      image: '/wxc/images/error.png',
      status: 'active'
    },
    {
      id: 4,
      name: 'Установка операционной системы',
      description: 'Полная установка и настройка ОС',
      price: 2000,
      image: '/wxc/images/error.png',
      status: 'active'
    },
    {
      id: 5,
      name: 'Мониторинг и автоматическое оповещение о сбоях',
      description: 'Настройка систем мониторинга',
      price: 3000,
      image: '/wxc/images/error.png',
      status: 'active'
    },
    {
      id: 6,
      name: 'Защита от DDoS - атак',
      description: 'Установка всех необходимых сервисов и программ от нежелательных запросов',
      price: 5000,
      image: '/wxc/images/error.png',
      status: 'active'
    },
    {
      id: 7,
      name: 'Администрирование  сервера',
      description: 'Берем на себя полное поддержание вашего сервера',
      price: 3000,
      image: '/wxc/images/error.png',
      status: 'active'
    },
      {
      id: 8,
      name: 'Установка 1C',
      description: 'Установка всех приложений',
      price: 3500,
      image: '/wxc/images/error.png',
      status: 'active'
    },
  ];

  // Функция фильтрации данных
  const filterData = (data: Service[], filters: ServiceFilter): Service[] => {
    return data.filter(service => {
      // Фильтрация по имени
      if (filters.name && 
          !service.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }
      
      // Фильтрация по минимальной цене
      if (filters.price_min !== null && service.price < filters.price_min) {
        return false;
      }
      
      // Фильтрация по максимальной цене
      if (filters.price_max !== null && service.price > filters.price_max) {
        return false;
      }
      
      return true;
    });
  };

  // Обработка поиска
  const handleSearch = () => {
    setHasSearched(true);
    const filteredServices = filterData(mockServices, filters);
    setServices(filteredServices);
  };

  // Инициализация данных при загрузке компонента
  useEffect(() => {
    const initialServices = filterData(mockServices, filters);
    setServices(initialServices);
  }, []);

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-center">
        <SearchForm
          values={filters}
          onChange={setFilters}
          onSubmit={handleSearch}
        />
      </div>

      <Row className="justify-content-center mt-4">
        {services.length > 0 ? (
          services.map((service) => (
            <Col
              key={service.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="d-flex justify-content-center mb-4"
            >
              <ServiceCard service={service} />
            </Col>
          ))
        ) : hasSearched ? (
          <p>Ничего не найдено по заданным параметрам</p>
        ) : null}
      </Row>
    </Container>
  );
}