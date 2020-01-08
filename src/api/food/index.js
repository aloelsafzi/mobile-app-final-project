import Api from "../api";
import * as SecureStore from 'expo-secure-store';

export async function getListFoodActive() {
   let token = await SecureStore.getItemAsync('alphaKey');
   return Api.get('/alpha/food',{
      headers:{
         'Authorization': `Bearer ${token}`
      }
   })
}

export async function getListTrxFood() {
   let token = await SecureStore.getItemAsync('alphaKey');
   return Api.get('/alpha/trx/food',{
      headers:{
         'Authorization': `Bearer ${token}`
      }
   })
}

export async function bookFood(id,codeRoom,food) {
   let token = await SecureStore.getItemAsync('alphaKey');
   return Api.post('/alpha/trx/food',{
      userDetailId:id,
      roomCode:codeRoom,
      food:food
   },{
      headers:{
         'Authorization': `Bearer ${token}`
      }
   })
}

export async function searchFood(by,value1,value2,name) {
   let token = await SecureStore.getItemAsync('alphaKey');
   switch (by) {
      case 'cost':
         return Api.get(`/alpha/food/nop/search?by=cost&valueOne=${value1}&&valueTwo=${value2}`, {
            headers:{
               'Authorization': `Bearer ${token}`
            }
         });
         break;
      case 'name':
         return Api.get(`/alpha/food/nop/search?by=name&value=${name}`, {
            headers:{
               'Authorization': `Bearer ${token}`
            }
         });
         break;
   }
}
