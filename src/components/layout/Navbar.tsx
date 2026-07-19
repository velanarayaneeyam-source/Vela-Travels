import React from 'react';
import { getSiteSettings, getTours, getCars } from '@/lib/settings';
import { NavbarClient } from './NavbarClient';

export const Navbar = async () => {
    // Parallel fetch for best performance
    const [settings, tours, cars] = await Promise.all([
        getSiteSettings(),
        getTours(),
        getCars()
    ]);

    return <NavbarClient settings={settings} tours={tours} cars={cars} />;
};
