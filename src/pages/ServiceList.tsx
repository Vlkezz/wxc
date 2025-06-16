import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ServiceCard from '../components/Card';
import SearchForm from '../components/SearchForm';
import '../styles/service_card.css';
import { useEffect, useState } from 'react';
import { ServicesAPI } from '../API/services'; 
import type { Service } from '../interface/Service';
import type { ServiceFilter } from '../interface/Form';

export default function ServiceList() {
  const [services, setServices] = useState<Service[]>([]);
  const [filters, setFilters] = useState<ServiceFilter>({name: '',price_min: null, price_max: null,});
  const [hasSearched, setHasSearched] = useState(false);

const fetchServices = async () => {
    try {
      const data = await ServicesAPI(filters); 
      setServices(data);
    } catch (error) {
      console.error('Ошибка загрузки услуг:', error);
    }
  };

  const handleSearch = async () => {setHasSearched(true); await fetchServices(); };

  useEffect(() => {
    fetchServices();
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
        ) : hasSearched ?  (
          <p>Ничего не найдено по заданным параметрам</p>
        ) : null}
      </Row>
    </Container>
  );
}
