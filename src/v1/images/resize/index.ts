import express from 'express';
import images from 'controllers/images';
import endpointValidator from 'utils/validations/endpointValidator';


const resize = [
  endpointValidator({
    query: {
      type: "object",
      properties: {
        width: {type: 'number'},
        height: {type: 'number'},
        format: {type: 'string', pattern: '^(?:jpeg|png|webp)$' },
        quality: {type: 'number', minimum: 1, maximum: 100},
      },
      additionalProperties: false,
    },
  }),
  async (req: express.Request, res: express.Response): Promise<void> => {
    const imageData = await images.resolveImage('fjord.jpg', req.query)
      .catch(err => {
        res.status(500);
        res.send({
          status: 'UNKNOWN_ERROR',
          message: `An unknown error occured: ${err.message}`,
        });
      });

    console.log(imageData);
    res.send(imageData);

    // const foo = images.imageLookup('asd', {format: format});
    // console.log('foo:', foo);

    // res.send(`format: `);
    res.send();

    return;
  }
];


export default resize;
