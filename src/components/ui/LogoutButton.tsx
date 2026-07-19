"use client";

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface LogoutButtonProps {
    className?: string;
    variant?: 'primary' | 'outline' | 'ghost' | 'glass';
}

export function LogoutButton({ className, variant = 'outline' }: LogoutButtonProps) {
    return (
        <Button
            variant={variant}
            onClick={() => signOut({ callbackUrl: '/' })}
            className={cn(
                "gap-2",
                variant === 'outline' && "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white",
                className
            )}
        >
            <LogOut className="w-4 h-4" />
            Sign Out
        </Button>
    );
}
