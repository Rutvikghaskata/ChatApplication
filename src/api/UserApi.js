import axios from 'axios';

const UserLogin = data => {
  const api = `http://192.168.1.147:5000/user/signin`;
  axios
    .post(api, data)
    .then(res => {
      console.log(res.data)  
      return res.data;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
export {UserLogin};
