import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const { name, id, defaultroom, defaultroomid } = request.query;

    // Check for missing fields
    if (!name || !id || !defaultroom || !defaultroomid) {
      return response.status(400).json({ error: 'All user fields are required' });
    }

    // Insert user data into the `users` table with lowercase column names
    await sql`
      INSERT INTO users (name, id, defaultroom, defaultroomid)
      VALUES (${name}, ${id}, ${defaultroom}, ${defaultroomid});
    `;

    // Retrieve all user data from the `users` table
    const users = await sql`SELECT * FROM users;`;

    return response.status(200).json({ users });
  } catch (error) {
    return response.status(500).json({ error: (error as Error).message });
  }
}
