import Express from "express";
import { createSong } from '../../controllers/adminController.js';


const router = Express.Router();

router.route("/createsong").post(createSong)

export default router
