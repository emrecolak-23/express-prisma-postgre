import express, { Request, Response } from 'express'
import currentUser from '../../middlewares/current-user'

const router = express.Router()

router.post('/checkAuth', currentUser, async (req: Request, res: Response) => {

    res.status(200).json(req.currentUser || null)
})

export { router as checkAuth }