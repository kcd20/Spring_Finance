import axios from 'axios';

const ASSET_API_BASE_URL = "http://localhost:8080/authentication/";
axios.defaults.withCredentials = true
class CommonService {

  login(user){
        return axios.post(ASSET_API_BASE_URL+"login", user);
    }
  register(user){
    return axios.post(ASSET_API_BASE_URL+"register",user)
  }

}
export default new CommonService()