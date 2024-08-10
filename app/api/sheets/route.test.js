import handler from '../../api/sheets/route';
import { createMocks } from 'node-mocks-http';

describe('/api/sheets API', () => {
  it('should return 200 status and data on POST request', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        category: 'Test Category',
        item: 'Test Item',
        amount: 100,
      },
    });

    await handler(req);

    expect(res.statusCode).toBe(200);
    const jsonData = JSON.parse(res._getData());
    expect(jsonData).toHaveProperty('data');
  });

  it('should return 500 status on error', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        category: '',
        item: '',
        amount: '',
      },
    });

    await handler(req);

    expect(res.statusCode).toBe(500);
  });
});
