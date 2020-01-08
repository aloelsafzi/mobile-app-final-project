export const roomSelected = (room) => {
   return {
      type: 'GET_ROOM',
      payload: room
   }
};

export const getListRoomAction = (listRoom) => {
   return {
      type: 'GET_LIST_ROOM',
      payload: listRoom
   }
};

export const getListTrxRoomAction = (listTrxRoom) => {
   return {
      type: 'GET_LIST_TRX_ROOM',
      payload: listTrxRoom
   }
};

export const confirmPayRoomAction = (trx) => {
   return {
      type:'GET_TRX',
      payload:trx
   }
};

export const roomActiveAction = (room) => {
   return {
      type:'GET_ROOM_ACTIVE',
      payload:room
   }
};