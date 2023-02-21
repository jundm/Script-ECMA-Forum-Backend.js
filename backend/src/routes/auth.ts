import {Router} from "express";
import {login, register} from "@controller/auth";

const auth = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     AuthDto:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: Username for user
 *         email:
 *           type: string
 *           description: Username for user
 *         password:
 *           type: string
 *           description: Password for user
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: User authentication for generate token
 *     produces:
 *       - application/json
 *     requestBody:
 *            description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 등록)
 *        required: true
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *              - name:
 *                type:string
 *              - email:
 *                type:string
 *              - password:
 *                type:string
 *     responses:
 *       200:
 *         description: Token generated
 *         schema:
 *           type: object
 *           schema:
 *             $ref:
 *               - '#/components/User'
 *       400:
 *         description: Some validation was threw
 *       500:
 *         description: An error has occurred during the process
 *
 */
auth.post("/register", register);
auth.post("/login", login);
export default auth;