export const roomSelectedReducer = (roomSelected = {}, action) => {
   if (action.type === 'GET_ROOM') {
      return action.payload
   }
   return roomSelected;
};

export const listRoomReducer = (listRoom = [], action) => {
   if (action.type === 'GET_LIST_ROOM') {
      return [...action.payload]
   }
   return listRoom;
};

export const trxRoomReducer = (trxRoom = {}, action) => {
   if (action.type === 'GET_TRX') {
      return action.payload
   }
   return trxRoom;
};

export const listTrxRoomReducer = (listTrxRoom = [], action) => {
   if (action.type === 'GET_LIST_TRX_ROOM') {
      return [...action.payload]
   }
   return listTrxRoom;
};

export const roomActiveReducer = (roomActive = {}, action) => {
   if (action.type === 'GET_ROOM_ACTIVE') {
      return action.payload
   }
   return roomActive;
};

