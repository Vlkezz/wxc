import { useEffect, useState } from 'react';
import type { OrderServiceResponce } from '../interface/AddServiceInOrder'; 
import type { OrderResponse } from '../interface/CreateOrder';
import { getAllOrderAPI } from '../API/getAllOrder';
import { getALlOrdersServiceAPI } from '../API/getALlOrdersService';
import '../styles/orders.css';

interface Order extends OrderResponse {}
interface OrderService extends OrderServiceResponce {}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderServices, setOrderServices] = useState<OrderService[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([getAllOrderAPI(), getALlOrdersServiceAPI()])
      .then(([ordersData, servicesData]) => {
        setOrders(ordersData);
        setOrderServices(servicesData);
      })
      .catch(console.error);
  }, []);

  const selectedOrder = orders.find(o => o.id === selectedOrderId);
  const servicesForSelectedOrder = orderServices.filter(s => s.order === selectedOrderId);

  return (
    <div>
      <h1>Список заявок</h1>
      <table>
        <thead>
          <tr>
            <th>Дата заявки</th>
            <th>От кого</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.dateCreated}</td>
              <td>{order.creator_username}</td>
              <td>
                <button className='pages-button' onClick={() => setSelectedOrderId(order.id)}>Подробнее</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrderId(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Детали заявки #{selectedOrder.id}</h2>
            <p><b>Статус:</b> {selectedOrder.status}</p>
            <p><b>Дата создания:</b> {selectedOrder.dateCreated}</p>
            <p><b>Дата формирования:</b> {selectedOrder.dateFormed || '-'}</p>
            <p><b>Дата завершения:</b> {selectedOrder.dateFinished || '-'}</p>
            <p><b>От кого:</b> {selectedOrder.creator_username}</p>
            <p><b>Проверил модератор:</b> {selectedOrder.moderator_username || '-'}</p>

            <h3>Услуги в заявке:</h3>
            {servicesForSelectedOrder.length === 0 ? (
              <p>Услуг нет</p>
            ) : (
              <ul>
                {servicesForSelectedOrder.map(service => (
                  <li key={service.id}>{service.service_name}</li>
                ))}
              </ul>
            )}

            <button onClick={() => { /* логика редактирования */ }}>Редактировать</button>
            <button onClick={() => setSelectedOrderId(null)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}
