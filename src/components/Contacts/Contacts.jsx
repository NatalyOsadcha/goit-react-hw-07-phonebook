import React from 'react';
import css from './Contacts.module.css';
import ContactsItem from './ContactsItem';
import {useSelector } from 'react-redux';
import { getItems, filterSelector } from 'redux/selectors';

const Contacts = () => {
  const filterValue = useSelector(filterSelector);
  const items = useSelector(getItems);
 

  const getFilteredContacts = () => {
    return items.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase().trim())
    );
  };
  const filteredContacts = getFilteredContacts();
  return (
    <ul className={css.contactsList}>
      {filteredContacts.map(contact => (
        <ContactsItem key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};

export default Contacts;
