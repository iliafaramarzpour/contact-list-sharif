'use client';

import { Badge } from '@/libs/components/ui/badge';
import { Button } from '@/libs/components/ui/button';
import { Card } from '@/libs/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/libs/components/ui/dropdown-menu';
import { Input } from '@/libs/components/ui/input';
import { useContactsStore } from '@/libs/store/contacts-store';
import { cn } from '@/libs/utils';
import { Edit, Filter, MapPin, Phone, Plus, Search, Trash2, X } from 'lucide-react';

interface ContactsListProps {
    onEditContact: (contact: any) => void;
    onDeleteContact: (contact: any) => void;
    onAddContact: () => void;
}

export function ContactsList({ onEditContact, onDeleteContact, onAddContact }: ContactsListProps) {
    const { contacts, searchTerm, searchFilter, setSearchTerm, setSearchFilter, getFilteredContacts } =
        useContactsStore();

    const filteredContacts = getFilteredContacts();

    const getFilterLabel = (filter: 'all' | 'name' | 'phone' | 'address') => {
        switch (filter) {
            case 'all':
                return 'همه موارد';
            case 'name':
                return 'نام';
            case 'phone':
                return 'شماره تماس';
            case 'address':
                return 'آدرس';
            default:
                return 'همه موارد';
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchFilter('all');
    };

    return (
        <div className='flex flex-col h-full'>
            <div className='p-6 border-b border-border bg-card/50'>
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
                    <div>
                        <h2 className='text-2xl font-bold text-card-foreground'>لیست مخاطبین</h2>
                        <p className='text-muted-foreground mt-1'>مدیریت و جستجوی مخاطبین شما</p>
                    </div>

                    <div className='flex flex-col sm:flex-row gap-3'>
                        <div className='flex gap-2 flex-1 sm:w-80'>
                            <div className='relative flex-1'>
                                <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
                                <Input
                                    placeholder={`جستجو در ${getFilterLabel(searchFilter)}...`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className='pr-10'
                                />
                                {searchTerm && (
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={clearSearch}
                                        className='absolute left-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted'
                                    >
                                        <X className='w-3 h-3' />
                                    </Button>
                                )}
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='outline' size='sm' className='gap-2 flex-shrink-0 bg-transparent'>
                                        <Filter className='w-4 h-4' />
                                        <span className='hidden sm:inline'>{getFilterLabel(searchFilter)}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end' className='w-48'>
                                    <DropdownMenuLabel>جستجو در:</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => setSearchFilter('all')}
                                        className={cn(searchFilter === 'all' && 'bg-accent')}
                                    >
                                        همه موارد
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSearchFilter('name')}
                                        className={cn(searchFilter === 'name' && 'bg-accent')}
                                    >
                                        نام و نام خانوادگی
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSearchFilter('phone')}
                                        className={cn(searchFilter === 'phone' && 'bg-accent')}
                                    >
                                        شماره تماس
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSearchFilter('address')}
                                        className={cn(searchFilter === 'address' && 'bg-accent')}
                                    >
                                        آدرس
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <Button onClick={onAddContact} className='gap-2'>
                            <Plus className='w-4 h-4' />
                            افزودن مخاطب
                        </Button>
                    </div>
                </div>

                {(searchTerm || searchFilter !== 'all') && (
                    <div className='flex items-center gap-2 mt-4'>
                        <span className='text-sm text-muted-foreground'>فیلترهای فعال:</span>
                        {searchTerm && (
                            <Badge variant='secondary' className='gap-1'>
                                <Search className='w-3 h-3' />
                                {searchTerm}
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    onClick={() => setSearchTerm('')}
                                    className='h-4 w-4 p-0 hover:bg-transparent'
                                >
                                    <X className='w-3 h-3' />
                                </Button>
                            </Badge>
                        )}
                        {searchFilter !== 'all' && (
                            <Badge variant='outline' className='gap-1'>
                                <Filter className='w-3 h-3' />
                                {getFilterLabel(searchFilter)}
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    onClick={() => setSearchFilter('all')}
                                    className='h-4 w-4 p-0 hover:bg-transparent'
                                >
                                    <X className='w-3 h-3' />
                                </Button>
                            </Badge>
                        )}
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={clearSearch}
                            className='text-xs text-muted-foreground hover:text-foreground'
                        >
                            پاک کردن همه
                        </Button>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className='flex-1 overflow-auto p-6'>
                {filteredContacts.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-full text-center'>
                        <div className='w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4'>
                            <Search className='w-8 h-8 text-muted-foreground' />
                        </div>
                        <h3 className='text-lg font-semibold text-card-foreground mb-2'>
                            {searchTerm ? 'نتیجه‌ای یافت نشد' : 'هیچ مخاطبی وجود ندارد'}
                        </h3>
                        <p className='text-muted-foreground mb-4'>
                            {searchTerm
                                ? `جستجوی "${searchTerm}" در ${getFilterLabel(searchFilter)} نتیجه‌ای نداشت.`
                                : 'برای شروع، اولین مخاطب خود را اضافه کنید.'}
                        </p>
                        {searchTerm ? (
                            <Button variant='outline' onClick={clearSearch} className='gap-2 bg-transparent'>
                                <X className='w-4 h-4' />
                                پاک کردن جستجو
                            </Button>
                        ) : (
                            <Button onClick={onAddContact} className='gap-2'>
                                <Plus className='w-4 h-4' />
                                افزودن اولین مخاطب
                            </Button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className='hidden lg:block'>
                            <Card className='overflow-hidden'>
                                <div className='overflow-x-auto'>
                                    <table className='w-full'>
                                        <thead className='bg-muted/50'>
                                            <tr>
                                                <th className='text-right p-4 font-medium text-muted-foreground'>
                                                    نام و نام خانوادگی
                                                </th>
                                                <th className='text-right p-4 font-medium text-muted-foreground'>
                                                    شماره تماس
                                                </th>
                                                <th className='text-right p-4 font-medium text-muted-foreground'>
                                                    آدرس
                                                </th>
                                                <th className='text-center p-4 font-medium text-muted-foreground'>
                                                    عملیات
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredContacts.map((contact, index) => (
                                                <tr
                                                    key={contact.id}
                                                    className={cn(
                                                        'border-b border-border hover:bg-muted/30 transition-colors',
                                                        index % 2 === 0 ? 'bg-card' : 'bg-muted/10'
                                                    )}
                                                >
                                                    <td className='p-4'>
                                                        <div className='flex items-center gap-3'>
                                                            <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
                                                                <span className='text-primary font-medium'>
                                                                    {contact.firstName.charAt(0)}
                                                                    {contact.lastName.charAt(0)}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <div className='font-medium text-card-foreground'>
                                                                    {contact.firstName} {contact.lastName}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='p-4'>
                                                        <div className='flex items-center gap-2 text-muted-foreground'>
                                                            <Phone className='w-4 h-4' />
                                                            <span className='text-left' dir='ltr'>
                                                                {contact.phone}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className='p-4'>
                                                        <div className='flex items-center gap-2 text-muted-foreground max-w-xs'>
                                                            <MapPin className='w-4 h-4 flex-shrink-0' />
                                                            <span className='truncate'>{contact.address}</span>
                                                        </div>
                                                    </td>
                                                    <td className='p-4'>
                                                        <div className='flex items-center justify-center gap-2'>
                                                            <Button
                                                                variant='ghost'
                                                                size='sm'
                                                                onClick={() => onEditContact(contact)}
                                                                className='text-muted-foreground hover:text-primary'
                                                            >
                                                                <Edit className='w-4 h-4' />
                                                            </Button>
                                                            <Button
                                                                variant='ghost'
                                                                size='sm'
                                                                onClick={() => onDeleteContact(contact)}
                                                                className='text-muted-foreground hover:text-destructive'
                                                            >
                                                                <Trash2 className='w-4 h-4' />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>

                        <div className='lg:hidden space-y-4'>
                            {filteredContacts.map((contact) => (
                                <Card key={contact.id} className='p-4'>
                                    <div className='flex items-start justify-between'>
                                        <div className='flex items-center gap-3 flex-1'>
                                            <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0'>
                                                <span className='text-primary font-medium text-sm'>
                                                    {contact.firstName.charAt(0)}
                                                    {contact.lastName.charAt(0)}
                                                </span>
                                            </div>
                                            <div className='flex-1 min-w-0'>
                                                <h3 className='font-medium text-card-foreground truncate'>
                                                    {contact.firstName} {contact.lastName}
                                                </h3>
                                                <div className='flex items-center gap-1 text-sm text-muted-foreground mt-1'>
                                                    <Phone className='w-3 h-3' />
                                                    <span className='text-left' dir='ltr'>
                                                        {contact.phone}
                                                    </span>
                                                </div>
                                                <div className='flex items-start gap-1 text-sm text-muted-foreground mt-1'>
                                                    <MapPin className='w-3 h-3 mt-0.5 flex-shrink-0' />
                                                    <span className='line-clamp-2'>{contact.address}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex gap-1 ml-2'>
                                            <Button
                                                variant='ghost'
                                                size='sm'
                                                onClick={() => onEditContact(contact)}
                                                className='text-muted-foreground hover:text-primary'
                                            >
                                                <Edit className='w-4 h-4' />
                                            </Button>
                                            <Button
                                                variant='ghost'
                                                size='sm'
                                                onClick={() => onDeleteContact(contact)}
                                                className='text-muted-foreground hover:text-destructive'
                                            >
                                                <Trash2 className='w-4 h-4' />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className='mt-6 flex items-center justify-between text-sm text-muted-foreground'>
                            <div>
                                نمایش {filteredContacts.length} از {contacts.length} مخاطب
                            </div>
                            {(searchTerm || searchFilter !== 'all') && (
                                <div className='flex items-center gap-2'>
                                    <Badge variant='secondary' className='gap-1'>
                                        <Search className='w-3 h-3' />
                                        {filteredContacts.length} نتیجه
                                    </Badge>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

