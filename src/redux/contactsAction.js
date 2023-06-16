import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact, editContact } from 'redux/api';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        if (
          state.items.some(
            contact =>
              contact.name.toLowerCase().trim() ===
              payload.name.toLowerCase().trim()
          )
        ) {
          toast.error(`${payload.name} is already in the contacts.`);
          return;
        }
        state.items.push(payload) &&
          toast.success(
            `${payload.name} was added to the contacts successfully.`
          );
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items =
          state.items.filter(contact => contact.id !== payload) &&
          toast.success(`${payload.name} was deleted successfully.`);
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }).addCase(editContact.pending, state => {
        state.isLoading = true;
      })
      .addCase(editContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
         state.items = state.items.map(contact => {
        if (contact.id === payload.id) {
          return payload;
        }
        return contact;
      }) && toast.success(`${payload.name} was edited successfully.`)
      })
      .addCase(editContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
