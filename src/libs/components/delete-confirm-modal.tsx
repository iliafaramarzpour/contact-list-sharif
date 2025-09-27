'use client';

import { Alert, AlertDescription } from '@/libs/components/ui/alert';
import { Button } from '@/libs/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/libs/components/ui/dialog';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    contactName: string;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, contactName }: DeleteConfirmModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = async () => {
        setIsDeleting(true);

        try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 800));
            onConfirm();
        } catch (error) {
            console.error('Error deleting contact:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleClose = () => {
        if (!isDeleting) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle className='flex items-center gap-2 text-xl text-destructive'>
                        <div className='w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center'>
                            <AlertTriangle className='w-4 h-4 text-destructive' />
                        </div>
                        تأیید حذف مخاطب
                    </DialogTitle>
                </DialogHeader>

                <div className='space-y-4 mt-6'>
                    {/* Warning Alert */}
                    <Alert className='border-destructive/20 bg-destructive/5'>
                        <AlertTriangle className='h-4 w-4 text-destructive' />
                        <AlertDescription className='text-destructive'>
                            این عمل قابل بازگشت نیست و تمام اطلاعات مخاطب حذف خواهد شد.
                        </AlertDescription>
                    </Alert>

                    {/* Contact Info */}
                    <div className='p-4 bg-muted/50 rounded-lg border border-border'>
                        <h4 className='text-sm font-medium text-muted-foreground mb-2'>مخاطب مورد نظر برای حذف:</h4>
                        <div className='flex items-center gap-3'>
                            <div className='w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center'>
                                <span className='text-destructive font-medium text-sm'>
                                    {contactName
                                        .split(' ')
                                        .map((name) => name.charAt(0))
                                        .join('')}
                                </span>
                            </div>
                            <div>
                                <div className='font-medium text-card-foreground'>{contactName}</div>
                                <div className='text-sm text-muted-foreground'>این مخاطب برای همیشه حذف خواهد شد</div>
                            </div>
                        </div>
                    </div>

                    {/* Confirmation Text */}
                    <div className='text-center py-2'>
                        <p className='text-muted-foreground'>
                            آیا از حذف مخاطب <span className='font-medium text-card-foreground'>"{contactName}"</span>{' '}
                            اطمینان دارید؟
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-border'>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={handleClose}
                            disabled={isDeleting}
                            className='flex-1 bg-transparent'
                        >
                            <X className='w-4 h-4 ml-2' />
                            انصراف
                        </Button>
                        <Button
                            type='button'
                            variant='destructive'
                            onClick={handleConfirm}
                            disabled={isDeleting}
                            className='flex-1 gap-2'
                        >
                            {isDeleting ? (
                                <>
                                    <div className='w-4 h-4 border-2 border-destructive-foreground/30 border-t-destructive-foreground rounded-full animate-spin' />
                                    در حال حذف...
                                </>
                            ) : (
                                <>
                                    <Trash2 className='w-4 h-4' />
                                    حذف مخاطب
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Additional Warning */}
                    <div className='text-center'>
                        <p className='text-xs text-muted-foreground'>
                            پس از حذف، امکان بازیابی اطلاعات این مخاطب وجود نخواهد داشت.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

