import {AuthService} from '../services/authService';
import {User} from "../models/userModel";

export class AuthController {
    constructor(private authService: AuthService) {

    }

    async register(username: string, email: string, password: string) {
        let user = new User();
        user.generate(username, email, password);
        return this.authService.register(user);
    }

    async login(email: string, password: string) {
        const user = await this.authService.login(email, password);
        return {
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }

    async hello(name: string) {
        return `Hello ${name}`
    }
}
