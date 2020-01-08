import Api from '../api';
import * as SecureStore from 'expo-secure-store';

export async function doAuth(user) {
    let token = await SecureStore.getItemAsync('alphaKey');
    return Api.post('/alpha/auth/login/user', {
        usernameUser: user.username,
        passwordUser: user.password
    },{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
}

export async function createNewUser(user) {
    let token = await SecureStore.getItemAsync('alphaKey');
    return Api.post('/alpha/auth/register/user', {
        usernameUser: user.username,
        passwordUser: user.password,
        emailUser:user.email,
        detail:{
            fullnameUser:user.fullname
        }
    },{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
}

export async function getUserById(id) {
    let token = await SecureStore.getItemAsync('alphaKey');
    return Api.get('/alpha/auth/find/id',{
        params:{id:id},
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
}

export async function topUp(data) {
    let token = await SecureStore.getItemAsync('alphaKey');
    return Api.post('/alpha/trx/topup', {
        idUserDetail:data.id,
        saldo:data.balance
    },{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })
}

export async function editProfile(user) {
    let token = await SecureStore.getItemAsync('alphaKey');
    return Api.put('/alpha/auth/user',user,{headers:{
            "Accept": "application/json",
            "Content-Type":"multipart/form-data",
            'Authorization': `Bearer ${token}`
        }})
}