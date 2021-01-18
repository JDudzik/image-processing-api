import express from 'express';
import modifyImage from './modifyImage';

const router = express.Router();

router.get('/:file', modifyImage);


export default router;
