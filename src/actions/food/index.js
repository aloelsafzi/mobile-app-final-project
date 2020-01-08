export const foodSelected = (food) => {
   return {
      type: 'GET_FOOD',
      payload: food
   }
};

export const detailTrxFoodAction = (food) => {
   return {
      type: 'DETAIL_TRX_FOOD',
      payload: food
   }
};

export const removeFood = (food) => {
   return {
      type: 'REMOVE_FROM_CART',
      payload: food
   }
};

export const setListTrxFood = (food) => {
   return {
      type: 'LIST_TRX_FOOD',
      payload: food
   }
};

export const removeAllFood = (food) => {
   return {
      type: 'REMOVE_ALL_FROM_CART',
      payload: food
   }
};