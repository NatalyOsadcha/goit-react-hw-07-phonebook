import React, { useEffect } from 'react';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getIsLoading, getError } from 'redux/selectors';
import {LineWave} from  'react-loader-spinner'


export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <PhonebookForm />
      <h2>Contacts</h2>
      <Filter />
      {isLoading && <LineWave color="blue"/>}
      {error && <b>{error}</b>}
      <Contacts />
      <ToastContainer autoClose={2000} />
    </>
  );
}
