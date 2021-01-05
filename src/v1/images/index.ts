import express from 'express';
import resize from './resize';

const router = express.Router();

router.get('/resize', resize);


export default router;
