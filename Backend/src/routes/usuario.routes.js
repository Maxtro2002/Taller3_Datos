import { Router } from "express";
import {createNewUsuario, getUsuario, getUsuariobyId} from "../controllers/usuario.controller"

const router = Router();

router.get('/usuario', getUsuario);

router.get('/usuario/:cedula', getUsuariobyId);

router.post('/usuario', createNewUsuario);

export default router