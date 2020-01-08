import React from 'react';
import { Root } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux'
import Login from './src/components/Login';
import Home from './src/components/Home';
import SignUp from './src/components/SignUp';
import Profile from './src/components/Profile';
import EditProfile from "./src/components/EditProfile";
import TopUp from "./src/components/TopUp";
import OrderFood from "./src/components/OrderFood";
import BookingRoom from "./src/components/BookingRoom";
import PaymentFood from "./src/components/PaymentFood";
import {
  listRoomReducer,
  listTrxRoomReducer,
  roomActiveReducer,
  roomSelectedReducer,
  trxRoomReducer
} from "./src/reducers/room";
import { userActivateReducer } from './src/reducers/user';
import {foodSelectedReducer, listTrxFoodReducer, trxFoodReducer} from "./src/reducers/food";
import ScanQRFood from "./src/components/ScanQRFood";
import ListTrx from "./src/components/ListTrx";
import ConfirmPayment from "./src/components/ConfirmPayment";
import QRCheckInOut from "./src/components/QRCheckInOut";
import Chatting from "./src/components/Chatting";
import OrderLaundry from "./src/components/OrderLaundry";
import DetailTrxFood from "./src/components/DetailTrxFood";

const appReducer = combineReducers({
  userActive: userActivateReducer,
  roomSelected: roomSelectedReducer,
  listFoodSelected: foodSelectedReducer,
  listRoom:listRoomReducer,
  trxRoom:trxRoomReducer,
  listTrxRoom : listTrxRoomReducer,
  roomActive:roomActiveReducer,
  listTrxFood:listTrxFoodReducer,
  detailFood : trxFoodReducer

});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = null;
  }
  return appReducer(state, action);
};
const store = createStore(rootReducer);

const MainNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null
    }
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      header: null
    }
  },
  TopUp: {
    screen: TopUp,
    navigationOptions: {
      header: null
    }
  },
  OrderFood: {
    screen: OrderFood,
    navigationOptions: {
      header: null
    }
  },
  BookingRoom: {
    screen: BookingRoom,
    navigationOptions: {
      header: null
    }
  },
  PaymentFood: {
    screen: PaymentFood,
    navigationOptions: {
      header: null
    }
  },
  ScanQRFood: {
    screen: ScanQRFood,
    navigationOptions: {
      header: null
    }
  },
  ListTrx: {
    screen: ListTrx,
    navigationOptions: {
      header: null
    }
  },
  ConfirmPayment: {
    screen: ConfirmPayment,
    navigationOptions: {
      header: null
    }
  },
  QRCheckInOut: {
    screen: QRCheckInOut,
    navigationOptions: {
      header: null
    }
  },
  OrderLaundry: {
    screen: OrderLaundry,
    navigationOptions: {
      header: null
    }
  },
  Chatting: {
    screen: Chatting,
    navigationOptions: {
      header: null
    }
  },
  DetailTrxFood: {
    screen: DetailTrxFood,
    navigationOptions: {
      header: null
    }
  }
},
  {
    initialRouteName: 'Login'
  });

const AppNavigator = createAppContainer(MainNavigator);

export default () => (
  <Provider store={store}>
    <Root>
      <AppNavigator />
    </Root>
  </Provider>
);