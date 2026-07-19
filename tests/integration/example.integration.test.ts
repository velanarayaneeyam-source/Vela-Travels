import { createInquiry } from '@/lib/actions';

describe('Inquiry Integration', () => {
    it('creates an inquiry successfully', async () => {
        const formData = new FormData();
        formData.append('name', 'John Doe');
        formData.append('phone', '9876543210');
        formData.append('message', 'Test message');
        const response = await createInquiry(formData);
        expect(response).toEqual(expect.objectContaining({ success: true }));
    });
});