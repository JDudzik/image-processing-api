import images from 'controllers/images';

it('checks findImage method succeeds', async (done) => {
  const imageData = await images.findImage('fjord.jpg');

  expect(imageData).toBeDefined();
  expect(imageData).toHaveProperty('pathData.location');
  expect(imageData).toHaveProperty('pathData.fileName');
  expect(imageData).toHaveProperty('pathData.fileType');
  expect(imageData).toHaveProperty('fromCache');

  done();
})

it('checks findImage method fails with an incorrect image', async (done) => {
  const imageData = await images.findImage('noimage.jpg');

  expect(imageData).toBeUndefined();

  done();
})
