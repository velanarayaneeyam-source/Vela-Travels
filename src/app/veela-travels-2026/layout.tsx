import React from 'react';
import { AdminLayoutClient } from '@/components/layout/AdminLayoutClient';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminLayoutClient>
            {children}
        </AdminLayoutClient>
    );
}
