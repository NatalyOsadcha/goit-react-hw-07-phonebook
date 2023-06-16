import React from 'react';
import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterContacts } from 'redux/filterSlice';
import { filterSelector } from 'redux/selectors';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(filterSelector);

  const changeFilter = evt => {
    dispatch(filterContacts(evt.target.value));
  };
  return (
    <label>
      Find contacts by name
      <input
        type="text"
        value={filter}
        name="filter"
        onChange={changeFilter}
        className={css.filterInput}
      />
    </label>
  );
};
export default Filter;
