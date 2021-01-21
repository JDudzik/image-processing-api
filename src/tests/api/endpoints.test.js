import server from 'src/server';
import supertest from 'supertest';

const request = supertest(server);

it('checks the root endpoint', async done => {
  const response = await request
    .get('/')
    .expect(200);
    
  done();
})
