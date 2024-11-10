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
    // Fetch the latest board entry
    const boardData = await sql`SELECT content FROM boards ORDER BY created_at DESC LIMIT 1;`;

    // Log the entire response to inspect the structure
    console.log("Fetched board data from database:", boardData);

    // Check if there is any row in the result
    if (boardData.rowCount === 0) {
      console.log("No board data found in database.");
      return response.status(404).json({ error: 'No board data found' });
    }

    // Access the content field correctly
    const content = boardData.rows[0].content;

    // Return the board data as JSON
    return response.status(200).json({ boardData: JSON.parse(content) });
  } catch (error) {
    console.error("Error while loading board data:", error);
    return response.status(500).json({ error: (error as Error).message });
  }
}
