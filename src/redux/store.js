import {configureStore} from '@reduxjs/toolkit';
import {filterReducer} from './filterSlice';
import {contactsReducer } from './contactsAction';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer ,
    filters: filterReducer,
  },
 
});

