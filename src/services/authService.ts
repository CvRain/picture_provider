import {User} from "../models/userModel";

export class AuthService{
    async register(user: User){
        //todo
    }

    async login(email: string, password: string) {
        //todo
        let user = new User()
        user.generate('test', email, password)
        return user;
    }


        
}