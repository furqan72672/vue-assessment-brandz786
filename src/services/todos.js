import axiosHandler from "./axiosHandler";

export class TodoService{
    async getAll(){
        return ((await axiosHandler.get('/items')).data)
    }
    async getOne(id){
        return ((await axiosHandler.get(`/item/${id}`)).data)
    }
    async create(obj){
        return ((await axiosHandler.post(`/item`,obj)).data)
    }
    async update(id,obj){
        return ((await axiosHandler.put(`/item/${id}`,obj)).data)
    }
    async delete(id){
        return ((await axiosHandler.delete(`/item/${id}`)).data)
    }
}
