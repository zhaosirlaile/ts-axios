import axios from '../../src/index';
import { AxiosError } from '../../src/helpers/error';

// document.cookie='a=b';

// // const instance = axios.create({
// //   xsrfCookieName: 'XSRF-TOKEN-D',
// //   xsrfHeaderName: 'X-XSRF-TOKEN-D',
// // })

// axios.get('/more/get').then(res => {
//   console.log(res);
// })
// axios.get('http://127.0.0.1:8088/more/server2').then(res => {
//   console.log(res);
// })
// // instance.get('/more/get').then(res => {
// //   console.log(res);
// // })

// axios.post('http://127.0.0.1:8088/more/server2',
//   {},
//   {
//     withCredentials: true
// }).then(res => {
//   console.log(res);
// })

// axios.post('/more/post',{
//   a:1
// },{
//   auth:{
//     username:'Yee',
//     password: '123456',
//   }
// }).then(res => {
//   console.log(res);
// })

// axios.get('/more/304').then(res => {
//   console.log(res);
// }).catch((e: AxiosError) => {
//   console.log(e.message);
// })

// axios.get('/more/304',{
//   validateStatus(status){
//     return status >= 200 && status < 400
//   }
// }).then(res => {
//   console.log(res)
// }).catch((e: AxiosError) =>{
//   console.log(e.message);
// })

axios.get('https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3705262743,2581226057&fm=85&app=92&f=JPEG?w=121&h=75&s=F2F5E16C345B3A7516CA321D030080CC')

axios.get('6Ot1bjeh1BF3odCf/it/u=1883663310,3129364928&fm=85&app=92&f=PNG?w=121&h=75&s=4DA13C72D7227701067861D2030080B2',{
    baseURL:'https://dss0.baidu.com/'
})
