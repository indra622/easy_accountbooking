import { google } from 'googleapis';

export async function GET(req) {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = '11JZ7GixO8hYBkHgDmw5JVtOtWUhI60MqpByN6PW05-M';
  const range = 'M4:S4'; // 카테고리 범위

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const categories = response.data.values[0];

    return new Response(JSON.stringify({ categories }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
