import { Router } from "express";
import {getSillas, getSillabyId, updateSillabyId} from "../controllers/silla.controller"

const router = Router();

router.get('/silla', getSillas);

router.get('/silla/:id', getSillabyId)

router.put('/silla/:id', updateSillabyId);

export default router