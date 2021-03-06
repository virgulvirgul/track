import { Router } from 'express'

import users from './users'
import tracking from './tracking'
import updateExcel from './update-excel'
import excelName from './excel-name'
import getTrackInfo from './get-track-info'
import erpPost from './erp-post'
import logistics from './logistics'
import queue from './day-queue'

const router = Router();

// Add USERS Routes
router.use(users);
router.use(tracking);
router.use(updateExcel);
router.use(excelName);
router.use(getTrackInfo);
router.use(erpPost);
router.use(logistics);
router.use(queue);
import test from "../controller/test";
router.use(test);

export default router
