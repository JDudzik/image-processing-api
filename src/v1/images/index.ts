import express from 'express';
import modifyImage from './modifyImage';

const router = express.Router();

router.get('/:image', modifyImage);

export default router;
