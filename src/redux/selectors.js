import { createSelector } from "@reduxjs/toolkit";
export const getItems = state => state.contacts.items;
export const getIsLoading = state => state.contacts.isLoading;
export const getError = state => state.contacts.error;
export const filterSelector = state => state.filters.filter;

export const sortContacts = createSelector([getItems], items => {
    return [...items].sort((a, b) => {
    return a.name.localeCompare(b.name)
})
})

