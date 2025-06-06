import { test, expect } from '@playwright/test';
import { db } from '../pages/postgre.ts';

test('PostgreSQL CRUD operations', async () => {
  // Create
  const newUser = await db.createUser('jhon_bot', 'temp@gmail.com');
  console.log('Created:', newUser);
  expect(newUser).toHaveProperty('id');

  // Read
  const users = await db.getUsers();
  console.log(JSON.stringify(users, null, 2));
  expect(users.length).toBeGreaterThan(0);

  // Update
  const updatedUser = await db.updateUser(newUser.id, 'jhon_clave');
  expect(updatedUser.name).toBe('jhon_clave');

  // Delete
  const deletedUser = await db.deleteUser(newUser.id);
  expect(deletedUser.id).toBe(newUser.id);

  // Cleanup
  await db.close();
});