import {Elysia, t} from "elysia";
import {AuthService} from "../services/authService";
import {AuthController} from "../controllers/authController";
import {RegisterRequest, LoginRequest} from "../models/userModel";

const authService = new AuthService();
const authController = new AuthController(authService);

export const authRoutes = new Elysia({prefix: '/auth'})
    .post('/register', ({body}: { body: RegisterRequest }) =>
        authController.register(body.username, body.email, body.password), {
        body: t.Object({
            username: t.String(),
            email: t.String(),
            password: t.String()
        })
    })

    .post('/login', ({body}: { body: LoginRequest }) =>
        authController.login(body.email, body.password), {
        body: t.Object({
            email: t.String(),
            password: t.String()
        })
    })

    .post('/hello', ({body}: { body: { name: string } }) =>
        authController.hello(body.name), {
        body: t.Object({
            name: t.String()
        })
    });