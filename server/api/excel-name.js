import { Router } from 'express'
// import {findExcelName} from '../mongodb/excel-name-list'

const router = Router();

router.get('/excel-list', async function (req, res, next) {
    // let json = await findExcelName();
    res.json(json);
});

export default router