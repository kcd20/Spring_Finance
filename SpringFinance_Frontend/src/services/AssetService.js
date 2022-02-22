import axios from 'axios';

const ASSET_API_BASE_URL = "http://localhost:8080/assets";
axios.defaults.withCredentials = true;
class AssetService {
    
    getAssets(){
        return axios.get(ASSET_API_BASE_URL);
    }

    createAsset(asset){
        return axios.post(ASSET_API_BASE_URL, asset);
    }

    getAssetById(assetId){
        return axios.get(ASSET_API_BASE_URL + '/' + assetId);
    }

    updateAsset(assetId, asset){
        return axios.put(ASSET_API_BASE_URL + '/' + assetId, asset);
    }

    deleteAsset(assetId){
        return axios.delete(ASSET_API_BASE_URL + '/' + assetId);
    }

    getAssetNews(ticker) {
        return axios.get(ASSET_API_BASE_URL + '/news/' + ticker);
    }

    getPrediction(ticker, date) {
        return axios.get(ASSET_API_BASE_URL + '/predict/' + ticker + '/' + date);
    }
}

export default new AssetService()
