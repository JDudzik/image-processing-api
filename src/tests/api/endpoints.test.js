import server from 'src/server';
import supertest from 'supertest';

const request = supertest(server);

it('checks the root endpoint', async (done) => {
  const response = await request.get('/')

  expect(response.status).toBe(200);

  done();
})


describe('modifyImage endpoint', () => {
  it('checks existing image succeeds', async (done) => {
    const response = await request.get('/v1/images/fjord.jpg?width=400');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toBe('image/jpeg');

    done();
  });

  it('checks missing image fails', async (done) => {
    const response = await request.get('/v1/images/noimage.jpg?height=100');

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('FILE_DOES_NOT_EXIST');

    done();
  });
})
