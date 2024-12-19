import Express from "express";
import { allSong } from '../../controllers/userController.js'

const router = Express.Router();

router.route("/song").get(allSong)


export default router