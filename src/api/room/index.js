import Api from "../api";
import * as SecureStore from 'expo-secure-store';

export async function getListRoom() {
  let token = await SecureStore.getItemAsync('alphaKey');
   return Api.get('/alpha/room/available', {
      headers:{
         'Authorization': `Bearer ${token}`
      }
   })
}

export async function getListTrx() {
   let token = await SecureStore.getItemAsync('alphaKey');
   return Api.get('/alpha/trx',{
      headers:{
         'Authorization': `Bearer ${token}`
      }
   })
}

export async function trxBookRoom(trx) {
   let token = await SecureStore.getItemAsync('alphaKey');
   return Api.post('/alpha/trx/booking',{
      roomCode: trx.roomCode,
      dateCheckIn:trx.checkIn,
      dateCheckOut:trx.checkOut,
      idUserDetail:trx.idUser,
      paymentType:trx.payType
   }, {
      headers:{
         'Authorization': `Bearer ${token}`
      }
   })
}

export async function payBookRoom(trx) {
   let token = await SecureStore.getItemAsync('alphaKey');
   return Api.post('/alpha/trx/booking/pay',{
      accountNo: trx.noRek,
      trxNo:trx.noTrx,
      payTotal:trx.payTotal
   },{
      headers:{
         'Authorization': `Bearer ${token}`
      }
   })
}

export async function trxBookRoomWithSaldo(trx) {
   let token = await SecureStore.getItemAsync('alphaKey');
   return Api.post('/alpha/trx/booking',{
      roomCode: trx.roomCode,
      dateCheckIn:trx.checkIn,
      dateCheckOut:trx.checkOut,
      idUserDetail:trx.idUser,
      paymentType:trx.payType
   },{
      headers:{
         'Authorization': `Bearer ${token}`
      }
   })
}

export async function checkIn(noTrx) {
   let token = await SecureStore.getItemAsync('alphaKey');
   return Api.post('/alpha/trx/check/in',{
     trxNo:noTrx
   },{
      headers:{
         'Authorization': `Bearer ${token}`
      }
   })
}

export async function checkOut(noTrx) {
   let token = await SecureStore.getItemAsync('alphaKey');
   return Api.post('/alpha/trx/check/out',{
      trxNo:noTrx
   },{
      headers:{
         'Authorization': `Bearer ${token}`
      }
   })
}

export async function searchRoom(by,value1,value2) {
   let token = await SecureStore.getItemAsync('alphaKey');
   switch (by) {
      case 'cost':
         return Api.get(`/alpha/room/nop/search?by=cost&valueOne=${value1}&&valueTwo=${value2}`, {
            headers:{
               'Authorization': `Bearer ${token}`
            }
         });
         break;
      case 'capacity':
         return Api.get(`/alpha/room/nop/search?by=capacity&valueOne=${value1}&&valueTwo=${value2}`, {
            headers:{
               'Authorization': `Bearer ${token}`
            }
         });
         break;
   }
}


