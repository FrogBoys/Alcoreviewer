export class User{
    username: {
        type:string
        unique: true
    }
    password: {
        type:string
        required: true
    }
}