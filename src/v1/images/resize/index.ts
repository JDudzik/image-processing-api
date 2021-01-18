import express from 'express';
import images from 'controllers/images';
import endpointValidator from 'utils/validations/endpointValidator';


const resize = [
  endpointValidator({
    query: {
      type: "object",
      properties: {
        width: {type: 'string', pattern: '^\\d*$'}, // Any numbers
        height: {type: 'string', pattern: '^\\d*$'}, // Any numbers
        quality: {type: 'string', pattern: '^(100|[1-9][0-9]|[1-9])$'}, // Between 1 and 100
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
    // res.send();

    return;
  }
];


export default resize;
