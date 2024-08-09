import { google } from 'googleapis';

export async function POST(req) {
  const body = await req.json();
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = '11JZ7GixO8hYBkHgDmw5JVtOtWUhI60MqpByN6PW05-M';
  const range = 'B4:I66';  // A부터 F열까지, 특정 시트를 지정하지 않음

  const { category, item, amount } = body;

  const date = new Date().toISOString().split('T')[0];

  const request = {
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [[date, category, item, '', '', amount]],
    },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    return new Response(JSON.stringify({ data: response.data }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
