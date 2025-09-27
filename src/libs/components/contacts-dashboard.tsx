'use client';

import { ContactModal } from '@/libs/components/contact-modal';
import { ContactsList } from '@/libs/components/contacts-list';
import { DeleteConfirmModal } from '@/libs/components/delete-confirm-modal';
import { Sidebar } from '@/libs/components/sidebar';
import { Button } from '@/libs/components/ui/button';
import { useContactsStore, type Contact } from '@/libs/store/contacts-store';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function ContactsDashboard() {
    const { deleteContact } = useContactsStore();

    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const handleAddContact = () => {
        setSelectedContact(null);
        setIsContactModalOpen(true);
    };

    const handleEditContact = (contact: Contact) => {
        setSelectedContact(contact);
        setIsContactModalOpen(true);
    };

    const handleDeleteContact = (contact: Contact) => {
        setContactToDelete(contact);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (contactToDelete) {
            deleteContact(contactToDelete.id);
            setIsDeleteModalOpen(false);
            setContactToDelete(null);
        }
    };

    return (
        <div className='flex h-screen bg-background'>
            <div className='lg:hidden fixed top-4 right-4 z-50'>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={() => setIsMobileSidebarOpen(true)}
                    className='bg-background/80 backdrop-blur-sm border-border'
                >
                    <Menu className='h-4 w-4' />
                </Button>
            </div>

            <Sidebar
                onAddContact={handleAddContact}
                isMobileOpen={isMobileSidebarOpen}
                onMobileClose={() => setIsMobileSidebarOpen(false)}
            />

            <main className='flex-1 overflow-hidden'>
                <ContactsList
                    onEditContact={handleEditContact}
                    onDeleteContact={handleDeleteContact}
                    onAddContact={handleAddContact}
                />
            </main>

            {isMobileSidebarOpen && (
                <div
                    className='lg:hidden fixed inset-0 bg-black/50 z-40'
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => {
                    setIsContactModalOpen(false);
                    setSelectedContact(null);
                }}
                contact={selectedContact}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setContactToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                contactName={contactToDelete ? `${contactToDelete.firstName} ${contactToDelete.lastName}` : ''}
            />
        </div>
    );
}

