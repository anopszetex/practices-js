import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import { buildServer } from './api.js';

describe('API Suite test', () => {
  describe('/contact', () => {
    test('Should request the contact page and return HTTP status 200', async () => {
      const server = buildServer();

      const response = await request(server).get('/contact').expect(200);

      expect(response.text).toEqual('contact us page');
      expect(response.status).toEqual(200);

      server.close();
    });
  });

  describe('/hello', () => {
    test('should ', async () => {
      const server = buildServer();

      const response = await request(server).get('/hi').expect(200);

      expect(response.text).toEqual('Not Found');
      expect(response.status).toEqual(200);

      server.close();
    });
  });

  describe('/login', () => {
    test('Should login successfully on the login route and return HTTP status 200', async () => {
      const server = buildServer();

      const response = await request(server)
        .post('/login')
        .send({ username: 'admin', password: 'admin' })
        .expect(200);

      expect(response.text).toEqual('Logging has been successful');
      expect(response.status).toEqual(200);

      server.close();
    });

    test('Should unauthorize a request when requesting it using wrong credentials and return HTTP status code 401', async () => {
      const server = buildServer();

      const response = await request(server)
        .post('/login')
        .send({ username: 'xuxa', password: 'admin' })
        .expect(401);

      expect(response.text).toEqual('Invalid credentials');
      expect(response.status).toEqual(401);

      server.close();
    });
  });
});
