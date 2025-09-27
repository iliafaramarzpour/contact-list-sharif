import { ThemeProvider } from '@/libs/components/theme-provider';
import { vazirmatn } from '@/libs/fonts/font';
import type { Metadata } from 'next';
import type React from 'react';
import { Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = {
    title: 'مدیریت مخاطبین | Contacts Dashboard',
    description: 'سیستم مدیریت مخاطبین'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='fa' dir='rtl' suppressHydrationWarning>
            <body className={`${vazirmatn.className}`}>
                <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
                    <Suspense fallback={null}>{children}</Suspense>
                </ThemeProvider>
            </body>
        </html>
    );
}

