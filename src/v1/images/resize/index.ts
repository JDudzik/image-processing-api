import express from 'express';


const resize = (req: express.Request, res: express.Response): void => {
  console.log(req, res);

  res.send('Lorem Ipsum');

  return;
}


export default resize;
