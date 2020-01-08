import Api from '../api';
import * as SecureStore from 'expo-secure-store';

export async function getListPromo() {
   let token = await SecureStore.getItemAsync('alphaKey');
   return Api.get('/alpha/promo', {
      headers:{
         'Authorization': `Bearer ${token}`
      }
   })
}