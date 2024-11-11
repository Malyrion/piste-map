import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    return response.setHeader('Allow', ['POST']).status(405).end(`Method ${request.method} Not Allowed`);
  }

  try {
    const { boardData } = request.body;

    if (!boardData) {
      return response.status(400).json({ error: 'Board data is required' });
    }

    // Insert serialized board data into the `boards` table
    await sql`INSERT INTO boards (content) VALUES (${JSON.stringify(boardData)})`;

    // Retrieve the saved board data for confirmation
    const savedBoardResult = await sql<{ content: string; created_at: Date }[]>`
      SELECT * FROM boards ORDER BY created_at DESC LIMIT 1
    `;

    // Access the first row from the result's rows
    const savedBoard = savedBoardResult.rows[0];

    return response.status(200).json({ message: 'Board saved successfully', board: savedBoard });
  } catch (error) {
    return response.status(500).json({ error: (error as Error).message });
  }
}
