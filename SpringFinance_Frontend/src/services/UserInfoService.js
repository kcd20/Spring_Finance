import axios from 'axios'

const USERS_REST_API_URL = "http://localhost:8080/user";
axios.defaults.withCredentials = true
class UserInfoService{

    getUsers(){
        return axios.get(USERS_REST_API_URL);
    }

    saveuser(user){
        return axios.post(USERS_REST_API_URL, user)
    }

    getUsersById(userId){
        return axios.get(USERS_REST_API_URL+"/"+userId);
    }

    updateUser(userId,user){
         return axios.put(USERS_REST_API_URL+"/"+userId,user);
    }

    resetUserPwd(userId,user){
        return axios.put(USERS_REST_API_URL+"/resetPassword/"+userId,user);
    }

    verify(user){
        return axios.put(USERS_REST_API_URL+"/verify", user)
    }
}

export default new UserInfoService();