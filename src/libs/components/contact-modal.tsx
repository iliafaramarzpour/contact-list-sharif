'use client';

import { Button } from '@/libs/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/libs/components/ui/dialog';
import { Input } from '@/libs/components/ui/input';
import { Label } from '@/libs/components/ui/label';
import { Textarea } from '@/libs/components/ui/textarea';
import { contactSchema, formatPhoneNumber, type ContactFormData } from '@/libs/schemas/contact-schema';
import { useContactsStore, type Contact } from '@/libs/store/contacts-store';
import { cn } from '@/libs/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Phone, Save, User } from 'lucide-react';
import type React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    contact?: Contact | null;
}

export function ContactModal({ isOpen, onClose, contact }: ContactModalProps) {
    const { addContact, updateContact, isLoading, setLoading } = useContactsStore();

    const isEditing = !!contact;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
        watch
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phone: '',
            address: ''
        }
    });

    const watchedValues = watch();

    useEffect(() => {
        if (isOpen) {
            if (contact) {
                reset({
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    phone: contact.phone,
                    address: contact.address
                });
            } else {
                reset({
                    firstName: '',
                    lastName: '',
                    phone: '',
                    address: ''
                });
            }
        }
    }, [isOpen, contact, reset]);

    const onSubmit = async (data: ContactFormData) => {
        setLoading(true);

        try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 500));

            if (isEditing && contact) {
                updateContact(contact.id, data);
            } else {
                addContact(data);
            }

            onClose();
        } catch (error) {
            console.error('Error saving contact:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setValue('phone', formatted, { shouldValidate: true });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='sm:max-w-md max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle className='flex items-center gap-2 text-xl'>
                        <div className='w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center'>
                            <User className='w-4 h-4 text-primary' />
                        </div>
                        {isEditing ? 'ویرایش مخاطب' : 'افزودن مخاطب جدید'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 mt-6'>
                    {/* Name Fields */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='firstName' className='text-sm font-medium'>
                                نام *
                            </Label>
                            <Input
                                id='firstName'
                                {...register('firstName')}
                                placeholder='نام را وارد کنید'
                                className={cn(errors.firstName && 'border-destructive focus-visible:ring-destructive')}
                                disabled={isSubmitting || isLoading}
                            />
                            {errors.firstName && <p className='text-sm text-destructive'>{errors.firstName.message}</p>}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='lastName' className='text-sm font-medium'>
                                نام خانوادگی *
                            </Label>
                            <Input
                                id='lastName'
                                {...register('lastName')}
                                placeholder='نام خانوادگی را وارد کنید'
                                className={cn(errors.lastName && 'border-destructive focus-visible:ring-destructive')}
                                disabled={isSubmitting || isLoading}
                            />
                            {errors.lastName && <p className='text-sm text-destructive'>{errors.lastName.message}</p>}
                        </div>
                    </div>

                    {/* Phone Field */}
                    <div className='space-y-2'>
                        <Label htmlFor='phone' className='text-sm font-medium flex items-center gap-2'>
                            <Phone className='w-4 h-4' />
                            شماره تماس *
                        </Label>
                        <Input
                            id='phone'
                            {...register('phone')}
                            onChange={handlePhoneChange}
                            placeholder='09123456789'
                            className={cn(
                                'text-left',
                                errors.phone && 'border-destructive focus-visible:ring-destructive'
                            )}
                            disabled={isSubmitting || isLoading}
                            maxLength={11}
                            dir='ltr'
                        />
                        {errors.phone && <p className='text-sm text-destructive'>{errors.phone.message}</p>}
                        <p className='text-xs text-muted-foreground'>شماره موبایل ۱۱ رقمی با ۰۹ شروع شود</p>
                    </div>

                    {/* Address Field */}
                    <div className='space-y-2'>
                        <Label htmlFor='address' className='text-sm font-medium flex items-center gap-2'>
                            <MapPin className='w-4 h-4' />
                            آدرس *
                        </Label>
                        <Textarea
                            id='address'
                            {...register('address')}
                            placeholder='آدرس کامل را وارد کنید...'
                            className={cn(
                                'min-h-[80px] resize-none',
                                errors.address && 'border-destructive focus-visible:ring-destructive'
                            )}
                            disabled={isSubmitting || isLoading}
                        />
                        {errors.address && <p className='text-sm text-destructive'>{errors.address.message}</p>}
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-border'>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={onClose}
                            disabled={isSubmitting || isLoading}
                            className='flex-1 bg-transparent'
                        >
                            انصراف
                        </Button>
                        <Button type='submit' disabled={isSubmitting || isLoading} className='flex-1 gap-2'>
                            {isSubmitting || isLoading ? (
                                <>
                                    <div className='w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin' />
                                    در حال ذخیره...
                                </>
                            ) : (
                                <>
                                    <Save className='w-4 h-4' />
                                    {isEditing ? 'ذخیره تغییرات' : 'افزودن مخاطب'}
                                </>
                            )}
                        </Button>
                    </div>
                </form>

                {/* Contact Preview */}
                {(watchedValues.firstName || watchedValues.lastName) && (
                    <div className='mt-6 p-4 bg-muted/50 rounded-lg border border-border'>
                        <h4 className='text-sm font-medium text-muted-foreground mb-2'>پیش‌نمایش:</h4>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
                                <span className='text-primary font-medium text-sm'>
                                    {watchedValues.firstName?.charAt(0)}
                                    {watchedValues.lastName?.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <div className='font-medium text-card-foreground'>
                                    {watchedValues.firstName} {watchedValues.lastName}
                                </div>
                                {watchedValues.phone && (
                                    <div className='text-sm text-muted-foreground text-left' dir='ltr'>
                                        {watchedValues.phone}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

