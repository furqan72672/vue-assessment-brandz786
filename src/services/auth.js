import axiosHandler from "./axiosHandler";

export class AuthService{
    async login(obj){
        return ((await axiosHandler.post('/login',obj)).data)
    }
    async register(obj){
        return ((await axiosHandler.post('/register',obj)).data)
    }
    async logout(obj){
        return ((await axiosHandler.post('/logout',obj)).data)
    }
}
