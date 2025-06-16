import React from 'react';
import type { ServiceFilter } from '../interface/Form';
import '../styles/search_form.css';

interface Props {
  values: ServiceFilter;
  onChange: (values: ServiceFilter) => void;
  onSubmit: () => void;
}

export default function SearchForm({ values, onChange, onSubmit }: Props) {
  // Обработка изменений в инпутах
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    onChange({
      ...values,
      [name]: name.includes('price') ? Number(value) || null : value,
    });
  };

  // Обработка сабмита формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Наименование"
        value={values.name}
        onChange={handleInputChange}
      />

      <input
        type="number"
        name="price_min"
        placeholder="Мин цена"
        value={values.price_min ?? ''}
        onChange={handleInputChange}
      />

      <input
        type="number"
        name="price_max"
        placeholder="Макс цена"
        value={values.price_max ?? ''}
        onChange={handleInputChange}
      />

      <button type="submit">Поиск</button>
    </form>
  );
}
