// pages/api/auth/login.ts
import { sql } from '@vercel/postgres'
import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid' // Use uuid for generating unique IDs

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const { name } = request.body

  if (!name) {
    return response.status(400).json({ error: 'Name is required' })
  }

  try {
    // Check if the user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE name = ${name};
    `

    let user
    if (existingUser.rowCount > 0) {
      // If user exists, retrieve their information
      user = existingUser.rows[0]
    } else {
      // If user does not exist, create a new user with generated IDs
      const id = uuidv4()
      const roomId = uuidv4()
      const roomName = `${name}'s Room`

      await sql`
        INSERT INTO users (name, id, defaultroom, defaultroomid)
        VALUES (${name}, ${id}, ${roomName}, ${roomId});
      `

      // Retrieve the newly created user
      const newUser = await sql`
        SELECT * FROM users WHERE id = ${id};
      `
      user = newUser.rows[0]
    }

    return response.status(200).json({ user })
  } catch (error) {
    return response.status(500).json({ error: (error as Error).message })
  }
}
