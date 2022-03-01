import axios from "axios";  
axios.defaults.baseURL = 'http://localhost:5000/api';

const  token = sessionStorage.getItem('__token__');
export default function callAPI (method, endpoint, body){
    axios({
        method: method,
        url: endpoint,
        data: body,
        headers: { Authorization: `Bearer ${token}`,
                   Accept: 'application/json'}
      }).then((res) => res.data.data).catch((err) => false);;
 }

//  export default callAPIVerify = (method, endpoint) =>{
//     axios({
//         method: method,
//         url:  endpoint,
//         data: { res },
//         headers: { Authorization: `Bearer ${token}` }
//       });
//  }
