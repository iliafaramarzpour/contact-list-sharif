'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/libs/components/ui/button';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant='ghost' size='sm' className='w-9 h-9'>
                <div className='w-4 h-4' />
            </Button>
        );
    }

    return (
        <Button
            variant='ghost'
            size='sm'
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className='w-9 h-9'
        >
            {theme === 'light' ? <Moon className='w-4 h-4' /> : <Sun className='w-4 h-4' />}
            <span className='sr-only'>تغییر تم</span>
        </Button>
    );
}

