export class User{
    public id: string
    public name: string
    public email: string
    public password: string

    constructor() {
        this.id = User.generateId()
        this.name = ''
        this.email = ''
        this.password = ''
    }

    public generate(name: string, email: string, password: string) {
        this.name = name
        this.email = email
        this.password = password
    }

    private static generateId(): string {
        return Math.random().toString(36).substring(2) + Date.now().toString(36)
    }
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}
