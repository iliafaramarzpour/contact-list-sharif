import { z } from 'zod';

const iranianPhoneRegex = /^09\d{9}$/;

export const contactSchema = z.object({
    firstName: z
        .string()
        .min(1, 'نام الزامی است')
        .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
        .max(50, 'نام نمی‌تواند بیش از ۵۰ کاراکتر باشد')
        .regex(/^[\u0600-\u06FF\s]+$/, 'نام باید فقط شامل حروف فارسی باشد'),

    lastName: z
        .string()
        .min(1, 'نام خانوادگی الزامی است')
        .min(2, 'نام خانوادگی باید حداقل ۲ کاراکتر باشد')
        .max(50, 'نام خانوادگی نمی‌تواند بیش از ۵۰ کاراکتر باشد')
        .regex(/^[\u0600-\u06FF\s]+$/, 'نام خانوادگی باید فقط شامل حروف فارسی باشد'),

    phone: z
        .string()
        .min(1, 'شماره تماس الزامی است')
        .regex(iranianPhoneRegex, 'شماره تماس باید ۱۱ رقم و با ۰۹ شروع شود')
        .length(11, 'شماره تماس باید دقیقاً ۱۱ رقم باشد'),

    address: z
        .string()
        .min(1, 'آدرس الزامی است')
        .min(10, 'آدرس باید حداقل ۱۰ کاراکتر باشد')
        .max(200, 'آدرس نمی‌تواند بیش از ۲۰۰ کاراکتر باشد')
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const searchSchema = z.object({
    searchTerm: z.string().max(100, 'جستجو نمی‌تواند بیش از ۱۰۰ کاراکتر باشد'),
    searchFilter: z.enum(['all', 'name', 'phone', 'address'])
});

export type SearchFormData = z.infer<typeof searchSchema>;

export const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 0) return '';
    if (cleaned.length === 1 && cleaned !== '0') return '09';
    if (cleaned.length === 2 && !cleaned.startsWith('09')) return '09';

    return cleaned.slice(0, 11);
};

