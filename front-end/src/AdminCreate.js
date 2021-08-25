import axios from 'axios';
const REGISTER_USER = "http://localhost:3001/register"

export function createUser(user, cb){
    axios.post(REGISTER_USER, user)
    .then(res=>{
        console.log(res);
        console.log(res.data);
        let data = res.data;
        if(data.err ===  "ER_DUP_ENTRY"){
            cb({successful:false, duplicate:true})
        }else{
            cb({successful:true});
        }
    })
    .catch(err=>{
        console.log(err);
        cb({successful:false})
    })
}