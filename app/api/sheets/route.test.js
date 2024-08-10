import { POST } from '../../api/sheets/route';
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

    // req.json() 대신 req.body를 사용하여 데이터를 가져옵니다.
    req.json = async () => req.body;

    await POST(req, res);

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

    req.json = async () => req.body;

    await POST(req, res);

    expect(res.statusCode).toBe(500);
  });
});
