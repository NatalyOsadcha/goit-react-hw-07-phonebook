export const getItems = state => state.contacts.items;
export const getIsLoading = state => state.contacts.isLoading;
export const getError = state => state.contacts.error;
export const filterSelector = state => state.filters.filter;

export const sortContacts = (state) => {
    const contacts = state.contacts.items
    return [...contacts].sort((a, b) => {
    return a.name.localeCompare(b.name)
})
}
