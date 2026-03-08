/**
 * TEST CLIENT HELPER
 * ------------------
 * Provides a pre-authenticated Supertest agent for testing protected routes.
 * Logs in once using the seeded test accounts and reuses the session cookies.
 */

import request, { type Agent } from 'supertest';
import { app } from '../../server.js';
import { TEST_CREDENTIALS } from './seed-test-users.js';

/**
 * Creates a Supertest agent already logged in as CLIENT user.
 * Use this for testing /api/client/* routes.
 */
export async function getClientAgent(): Promise<Agent> {
  const agent = request.agent(app);
  await agent
    .post('/api/login')
    .send({
      email: TEST_CREDENTIALS.client.email,
      password: TEST_CREDENTIALS.client.password,
    })
    .expect(200);
  return agent;
}

/**
 * Creates a Supertest agent already logged in as MANAGER user.
 * Use this for testing /api/manager/* routes.
 */
export async function getManagerAgent(): Promise<Agent> {
  const agent = request.agent(app);
  await agent
    .post('/api/login')
    .send({
      email: TEST_CREDENTIALS.manager.email,
      password: TEST_CREDENTIALS.manager.password,
    })
    .expect(200);
  return agent;
}

/**
 * Creates a Supertest agent already logged in as ADMIN user.
 * Use this for testing /api/admin/* routes.
 */
export async function getAdminAgent(): Promise<Agent> {
  const agent = request.agent(app);
  await agent
    .post('/api/login')
    .send({
      email: TEST_CREDENTIALS.admin.email,
      password: TEST_CREDENTIALS.admin.password,
    })
    .expect(200);
  return agent;
}

/**
 * A plain unauthenticated request object for testing public/401 routes.
 */
export const unauthenticatedRequest = () => request(app);
