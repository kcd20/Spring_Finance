import './Watchlist.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useHistory, useParams } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const url = "http://localhost:8080/watchassets";

function Watch(props) {
    const [assets, setAssets] = useState(null);
    const [pending, setPending] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [rise, setRise] = useState("desc");
    const [valid, setValid] = useState({
        msg: null
    })
    const [assetName, setAssetName] = useState(null);
    
    const {add} = useParams();
    const history = useHistory();

    useEffect(()=>{
if (cookies.get("userName") === undefined) {
      history.push("/login");}

        axios.get(url+"/all")
        .then(res=>{setAssets(res.data); setPending(false)})
      }, [refresh])

    const handleDeleteClick = (id)=>{
        axios.delete(url + '/delete/' + id);
        setAssets(assets.filter(x=>x.watchAssetId!=id))
        history.push("/watchlist")
    }

    const handleNameChange = (e)=>{
        setAssetName(e.target.value)
    }

    const validate = ()=>{
        if(assetName==null){
            return false
        }
        return true
    }

    // const handleAddClick = ()=>{
    //     if(validate()) {
    //         setValid({msg: null});
    //         axios.post(url + "/add", {
    //             assetName: assetName
    //         })
    //         .then(res=>{
    //           history.push("/watchlist"); setRefresh(!refresh)}
    //         )
    //     }
    //     else{
    //         setValid({msg: "invalid input!"})
    //     }
    // }

    const handleAddClick = ()=>{
      if(validate()){
          setValid({msg: null})
          axios.post(url + "/add", {
              assetName: assetName
          })
          .then(res=>{
            console.log(res.data)
            if(res.data.closePrice == -1.0){
              setValid({msg: "invalid input!"})
              alert("The asset symbol is invalid, please enter a correct name!")
            }else{
              history.push("/watchlist"); setRefresh(!refresh)
            }} )
            .then(setAssetName(null))
      }else{
          setValid({msg: "invalid input!"})
      }
    }

    const handleCancelClick = ()=>{
        history.go(-1);
    }

    const handSortClick = ()=>{
      if(rise=="desc"){
        setRise("asce")
        let a = []
        for(let i=assets.length-1;i>=0;i--){
          a.push(assets[i])
        }
        setAssets(a)
      }
      else{
        setRise("desc")
        let a = []
        for(let i=assets.length-1;i>=0;i--){
          a.push(assets[i])
        }
        setAssets(a)
      }
    }

  return (
    <div>
      <h1>My Watchlist</h1> <br/>
      <Link id="add-link" to="/watchlist/1">Add New Asset</Link> <br/>
      {!add && pending && <h6>Fetching Latest Info ......  Just a Moment!</h6>}
      {!add && assets && 
        <div>
            <table className="styled-table" width="100%" border="0">
            <thead>
              <tr>
                <td>Asset Symbol</td>
                <td>Date Added to Watchlist</td>
                <td>Latest Open Price (USD)</td>
                <td>Latest Close Price (USD)</td>
                <td>Rise by Value (USD)</td>
                <td>Rise by Rate (%) <button id="sort" onClick={handSortClick}>{rise}</button> </td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {
                assets.map( asset=>(
                  <tr key={asset.watchAssetId}>
                    <td>{asset.assetName}</td>
                    <td>{asset.addDate}</td>
                    <td>{asset.openPrice}</td>
                    <td>{asset.closePrice}</td>
                    <td>{asset.changeValue}</td>
                    <td>{asset.changeRate}</td>
                    <td><button className="button-7" onClick={()=>handleDeleteClick(asset.watchAssetId)}>Delete</button></td>
                  </tr> ) )
              }
            </tbody>
          </table>
        </div>
      }

      {add == 1 && 
        <div>
            <br/>
            <h5>Add Asset to MyWatchlist</h5>
            Asset Symbol: <input placeholder="eg. GOOG" name ="Name" onChange={handleNameChange}/> <br/>
            <p style={{color:"red"}}>{valid.msg}</p>
            <button className='button-7' onClick={handleAddClick}>Add</button>
            <button className='button-7' onClick={handleCancelClick}>Cancel</button>
        </div>}
    </div>
  );
}

  export default Watch;