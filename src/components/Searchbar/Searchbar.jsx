import { Component, useState } from 'react';
import s from './searchbar.module.css';
import { ImSearch } from 'react-icons/im';

const Searchbar = ({ onSubmit }) => {
  // state = {
  //   submitValue: '',
  // };

  const [submitValue, setSubmitValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(submitValue);
  };

  const handleValueChange = e => {
    setSubmitValue(e.currentTarget.value.toLowerCase());
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s['SearchForm']}>
        <button
          type="submit"
          className={s['SearchForm-button']}
          disabled={submitValue.trim() === ''}
        >
          <ImSearch style={{ marginRight: 8, width: 30, height: 30 }} />
          <span className={s['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={s['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleValueChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
