import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TourCard } from '@/components/ui/TourCard';

describe('TourCard Component', () => {
    it('renders correctly', () => {
        const dummyTour = {
            id: '1',
            title: 'Sample Tour',
            description: 'A beautiful tour',
            destination: 'Kerala',
            image: '/placeholder-tour.jpg',
            price: '₹10,000',
            duration: '3 Days',
            featured: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        render(<TourCard tour={dummyTour} />);
        expect(screen.getByText('Sample Tour')).toBeInTheDocument();
    });
});