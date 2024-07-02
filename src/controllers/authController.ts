import {AuthService} from '../services/authService';
import {getUserByEmail} from "../database/userOperation";

export class AuthController {
    constructor(private authService: AuthService) {

    }

    async register(username: string, email: string, password: string) {
        //check string is not empty
        if (!username || !email || !password) {
            return {
                success: false,
                message: 'Invalid input'
            };
        }

        //check use is not duplicate by email
        const result = await getUserByEmail(email);
        if (result) {
            return {
                success: false,
                message: 'User already exists'
            };
        }

        const newUser = await this.authService.register(username, email, password);
        return {
            success: true,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        };
    }

    async login(email: string, password: string) {
        //check string is not empty
        if (!email || !password) {
            return {
                success: false,
                message: 'Invalid input'
            };
        }

        const user = await this.authService.login(email, password);
        if (!user) {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }
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
