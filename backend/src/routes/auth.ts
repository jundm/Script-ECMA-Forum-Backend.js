import {Router} from "express";
import {login, register} from "@controller/auth";

const auth = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Create a new user
 *     description: Create a new user with the given name, email and password
 *     operationId: registerUser
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully.
 */
auth.post("/register", register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login to the application
 *     description: Login to the application with the given email and password
 *     tags:
 *       - Auth
 *     operationId: loginUser
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Invalid email or password.
 */
auth.post("/login", login);
export default auth;