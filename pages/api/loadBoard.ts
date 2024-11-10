import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'GET') {
    return response.setHeader('Allow', ['GET']).status(405).end(`Method ${request.method} Not Allowed`);
  }

  try {
    // Log that the request was received
    console.log("Received request to load board data");

    // Fetch the latest board entry
    const boardData = await sql`SELECT content FROM boards ORDER BY created_at DESC LIMIT 1;`;

    // Log the retrieved board data
    console.log("Fetched board data from database:", boardData);

    if (boardData.length === 0) {
      console.log("No board data found in database.");
      return response.status(404).json({ error: 'No board data found' });
    }

    // Return the board data as JSON
    return response.status(200).json({ boardData: JSON.parse(boardData[0].content) });
  } catch (error) {
    console.error("Error while loading board data:", error);
    return response.status(500).json({ error: (error as Error).message });
  }
}
