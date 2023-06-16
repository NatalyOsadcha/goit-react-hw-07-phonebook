import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [] },
  reducers: {
    addContact(state, { payload }) {
      if (
        state.contacts.some(
          contact =>
            contact.name.toLowerCase().trim() ===
            payload.name.toLowerCase().trim()
        )
      ) {
        toast.error(`${payload.name} is already in the contacts.`);
        return;
      }
      state.contacts.push(payload);
    },
    deleteContact(state, { payload }) {
      state.contacts = state.contacts.filter(contact => contact.id !== payload);
    },
    editContact(state, { payload }) {
      state.contacts = state.contacts.map(contact => {
        if (contact.id === payload.id) {
          return payload;
        }
        return contact;
      });
    },
  },
});

export const { addContact, deleteContact, editContact } = contactsSlice.actions;
const contactsReducer = contactsSlice.reducer;

