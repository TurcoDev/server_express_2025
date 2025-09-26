import { Router } from "express";
import UserController from "../controllers/user.controller.mjs";

const router = Router();

// Obtener todos los usuarios
router.get("/user", UserController.getAllUsers);

// Crear un nuevo usuario
router.post("/user", UserController.createUser);

// Obtener un usuario por ID
router.get("/user/:id", UserController.getUserById);

// Actualizar un usuario por ID
router.put("/user/:id", UserController.updateUser);

// Eliminar un usuario por ID
router.delete("/user/:id", UserController.deleteUser);

export default router;