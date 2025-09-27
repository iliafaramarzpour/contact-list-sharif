import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ContactsState {
    contacts: Contact[];
    searchTerm: string;
    searchFilter: 'all' | 'name' | 'phone' | 'address';
    isLoading: boolean;
    // Actions
    addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateContact: (id: string, contact: Partial<Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>>) => void;
    deleteContact: (id: string) => void;
    setSearchTerm: (term: string) => void;
    setSearchFilter: (filter: 'all' | 'name' | 'phone' | 'address') => void;
    setLoading: (loading: boolean) => void;
    getFilteredContacts: () => Contact[];
}

export const useContactsStore = create<ContactsState>()(
    persist(
        (set, get) => ({
            contacts: [],
            searchTerm: '',
            searchFilter: 'all',
            isLoading: false,
            addContact: (contactData) => {
                const newContact: Contact = {
                    ...contactData,
                    id: Date.now().toString(),
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                set((state) => ({
                    contacts: [...state.contacts, newContact]
                }));
            },

            updateContact: (id, contactData) => {
                set((state) => ({
                    contacts: state.contacts.map((contact) =>
                        contact.id === id ? { ...contact, ...contactData, updatedAt: new Date() } : contact
                    )
                }));
            },

            deleteContact: (id) => {
                set((state) => ({
                    contacts: state.contacts.filter((contact) => contact.id !== id)
                }));
            },

            setSearchTerm: (term) => {
                set({ searchTerm: term });
            },

            setSearchFilter: (filter) => {
                set({ searchFilter: filter });
            },

            setLoading: (loading) => {
                set({ isLoading: loading });
            },

            getFilteredContacts: () => {
                const { contacts, searchTerm, searchFilter } = get();

                if (!searchTerm) return contacts;

                return contacts.filter((contact) => {
                    const searchLower = searchTerm.toLowerCase();

                    switch (searchFilter) {
                        case 'name':
                            return (
                                contact.firstName.toLowerCase().includes(searchLower) ||
                                contact.lastName.toLowerCase().includes(searchLower)
                            );
                        case 'phone':
                            return contact.phone.includes(searchTerm);
                        case 'address':
                            return contact.address.toLowerCase().includes(searchLower);
                        default:
                            return (
                                contact.firstName.toLowerCase().includes(searchLower) ||
                                contact.lastName.toLowerCase().includes(searchLower) ||
                                contact.phone.includes(searchTerm) ||
                                contact.address.toLowerCase().includes(searchLower)
                            );
                    }
                });
            }
        }),
        {
            name: 'contacts-storage',
            partialize: (state) => ({
                contacts: state.contacts
            })
        }
    )
);

