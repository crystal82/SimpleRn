
import Http from './Http';
import Config from './Config';

export default HttpUtils = {

    login:(userName, password) => {
       global.storage.load('token').then(tk=>{
          return this.enqueueLogin(userName,password,tk);
       }).catch(err=>{
           return this.enqueueLogin(userName,password,'');
       });

    },
    enqueueLogin:(userName, password,tk)=>{
        var token=tk;
        var hd:{
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Gizwits-Application-Id':Config.app_id,
            'X-Gizwits-User-token':token,
        };
        var body = {
            "username": userName,
            "password": password,
            "lang": 'chinese'
        };
        return Http.post('http://api.gizwits.com/app/login',hd,body);
    }
}
