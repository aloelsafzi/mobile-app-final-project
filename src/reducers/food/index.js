export const foodSelectedReducer = (foodSelected = [], action) => {
   switch (action.type) {
      case 'GET_FOOD':
         return [...foodSelected,action.payload];
      case 'REMOVE_FROM_CART':
         return foodSelected.filter((cartItem) =>cartItem.idFoodBeverage !== action.payload.idFoodBeverage);
      case 'REMOVE_ALL_FROM_CART':
         return foodSelected.filter((cartItem) =>cartItem.idFoodBeverage !== action.payload.idFoodBeverage);
   }
   return foodSelected;
};

export const listTrxFoodReducer = (listTrxFood = [], action) => {
   if (action.type === 'LIST_TRX_FOOD') {
      return [...action.payload]
   }
   return listTrxFood;
};

export const trxFoodReducer = (trxFood = {}, action) => {
   if (action.type === 'DETAIL_TRX_FOOD') {
      return action.payload
   }
   return trxFood;
};