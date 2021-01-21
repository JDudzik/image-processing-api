import express from 'express';
import images from 'controllers/images';
import endpointValidator from 'utils/validations/endpointValidator';

const modifyImage = [
  endpointValidator({
    params: {
      type: 'object',
      properties: {
        file: { type: 'string', pattern: '^(.+)(\\.\\w+)$' }, // Image file-path. eg: "fjord.jpg"
      },
    },
    query: {
      type: 'object',
      properties: {
        width: { type: 'string', pattern: '^\\d{1,4}$' }, // Any number less than 5 digits
        height: { type: 'string', pattern: '^\\d{1,4}$' }, // Any number less than 5 digits
        quality: { type: 'string', pattern: '^(100|[1-9][0-9]|[1-9])$' }, // Between 1 and 100
      },
      additionalProperties: false,
    },
  }),
  async (req: express.Request, res: express.Response): Promise<void> => {
    const imagePath = await images.resolveImage(req.params.file, req.query).catch((err) => {
      res.status(500);
      res.send({
        status: 'UNKNOWN_ERROR',
        message: `An unknown error occured: ${err.message}`,
      });
    });

    if (!imagePath) {
      res.status(400);
      res.send({
        status: 'FILE_DOES_NOT_EXIST',
        message: `The requested image: ${req.params.file} does not exist`,
      });
      return;
    }

    const options = {
      root: process.cwd(),
    };
    res.sendFile(imagePath, options);
    return;
  },
];

export default modifyImage;
