export interface User{
    id: string
    name: string
    email: string
    password: string

    GenerateUser(name: string, email: string, password: string): User
}