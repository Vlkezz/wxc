import type { Service } from '../interface/Service.ts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardDetails from '../components/CardDetails';
import {  ServiceByIdAPI } from '../API/details.ts';

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    if (!id) return;

     ServiceByIdAPI(id)
      .then(setService)
      .catch(console.error);
  }, [id]);

  if (!service) return <p>Услуга не найдена</p>;

  return <CardDetails service={service} />;
}