'use client';

import { Button } from '@/libs/components/ui/button';
import { cn } from '@/libs/utils';
import { Menu, Plus, Users, X } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';

interface SidebarProps {
    onAddContact: () => void;
    isMobileOpen?: boolean;
    onMobileClose?: () => void;
}

export function Sidebar({ onAddContact, isMobileOpen = false, onMobileClose }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <>
            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed lg:relative z-50 h-full bg-card border-l border-border transition-all duration-300',
                    'flex flex-col right-0 lg:right-auto',
                    'lg:translate-x-0',
                    isMobileOpen ? 'translate-x-0 w-64' : 'translate-x-full lg:translate-x-0',
                    isCollapsed ? 'lg:w-16' : 'lg:w-64'
                )}
            >
                {/* Header */}
                <div className='p-4 border-b border-border'>
                    <div className='flex items-center justify-between'>
                        <div className={cn('flex items-center gap-3', isCollapsed && 'lg:justify-center')}>
                            <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                                <Users className='w-4 h-4 text-primary-foreground' />
                            </div>
                            {!isCollapsed && (
                                <h1 className='font-semibold text-lg text-card-foreground'>مدیریت مخاطبین</h1>
                            )}
                        </div>
                        <Button variant='ghost' size='sm' onClick={onMobileClose} className='lg:hidden'>
                            <X className='w-4 h-4' />
                        </Button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className='flex-1 p-4'>
                    <div className='space-y-2'>
                        <Button
                            variant='secondary'
                            className={cn(
                                'w-full justify-start gap-3 bg-secondary/50',
                                isCollapsed && 'lg:justify-center lg:px-2'
                            )}
                        >
                            <Users className='w-4 h-4' />
                            {!isCollapsed && <span>لیست مخاطبین</span>}
                        </Button>
                    </div>
                </nav>

                {/* Add Contact Button */}
                <div className='p-4 border-t border-border'>
                    <Button onClick={onAddContact} className={cn('w-full gap-2', isCollapsed && 'lg:px-2')}>
                        <Plus className='w-4 h-4' />
                        {!isCollapsed && <span>افزودن مخاطب</span>}
                    </Button>
                </div>

                {/* Theme toggle and proper collapse toggle with hamburger/X icons */}
                <div className='hidden lg:block border-t border-border'>
                    {/* Theme toggle */}
                    <div className='p-2'>
                        <div className={cn('flex', isCollapsed ? 'justify-center' : 'justify-between items-center')}>
                            {!isCollapsed && <span className='text-sm text-muted-foreground'>تم</span>}
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Collapse toggle */}
                    <div className='p-2 border-t border-border'>
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className='w-full flex items-center justify-center'
                            title={isCollapsed ? 'باز کردن منو' : 'بستن منو'}
                        >
                            {isCollapsed ? <Menu className='w-4 h-4' /> : <X className='w-4 h-4' />}
                        </Button>
                    </div>
                </div>
            </aside>
        </>
    );
}

