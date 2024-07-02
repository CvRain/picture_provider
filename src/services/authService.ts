import {createUser, getUserByEmail} from "../database/userOperation";

export class AuthService {
    async register(name: string, email: string, password: string) {
        const user = await createUser({
            user_name: name,
            email,
            password
        });
        console.log("create new user: ", user);

        return {
            id: user._id,
            name: user.user_name,
            email: user.email,
        };
    }

    async login(email: string, password: string) {
        //get user by email
        const user = await getUserByEmail(email)

        //check user password equal to password
        if (user && user.password === password) {
            return {
                id: user._id,
                name: user.user_name,
                email: user.email
            }
        }
    }


}