import { Router } from "express";
import {createNewReserva, getReserva} from "../controllers/reserva.controller"

const router = Router();

router.get('/reserva', getReserva);

router.post('/reserva', createNewReserva);

export default router