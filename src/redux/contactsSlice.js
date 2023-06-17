import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from 'redux/operations';
import { toast } from 'react-toastify';
import { initialState } from './initialContactsState';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleFulfilledFetchContacts = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items = payload;
};

const handleFulfilledAddContact = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  if (
    state.items.some(
      contact =>
        contact.name.toLowerCase().trim() === payload.name.toLowerCase().trim()
    )
  ) {
    toast.error(`${payload.name} is already in the contacts.`);
    return;
  }
  state.items.push(payload) &&
    toast.success(`${payload.name} was added to the contacts successfully.`);
};

const handleFulfilledDeleteContact = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items = state.items.filter(contact => contact.id !== payload.id);
  toast.success(`Contact ${payload.name} was deleted successfully.`);
};

const handleFulfilledEditContact = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items = state.items.map(contact => {
    if (contact.id === payload.id) {
      toast.success(`Contact ${payload.name} was updated successfully.`);
      return payload;
    }
    return contact;
  });
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleFulfilledFetchContacts)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, handleFulfilledAddContact)
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, handleFulfilledDeleteContact)
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(editContact.pending, handlePending)
      .addCase(editContact.fulfilled, handleFulfilledEditContact)
      .addCase(editContact.rejected, handleRejected)
      // .addMatcher(isAnyOf([fetchContacts.pending, addContact.pending, deleteContact.pending, editContact.pending]), handlePending);
  },
});

export const contactsReducer = contactsSlice.reducer;
