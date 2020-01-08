import React from "react";
import {StyleSheet, Image, ImageBackground, Alert, TouchableOpacity} from "react-native";
import DatePicker from "react-native-datepicker";
import { connect } from "react-redux";
import { Row, Grid, Text, Card, CardItem, Container, Content, Icon, Left, Body, Right, Button, View, Header } from "native-base";
import {getListRoom, trxBookRoom, trxBookRoomWithSaldo} from "../api/room";
import {getListRoomAction,confirmPayRoomAction} from "../actions/room";
import {getUserById} from "../api/user";
import {authUser} from "../actions/user";
import NumberFormat from "react-number-format";

class BookingRoom extends React.Component {
   state = { saldoUser:null ,hotel: {}, roomCpty: '', roomCode: '', price: '', roomSize: '', typRoom: '', checkIn:'', checkOut:'',idUser:'' };

   componentDidMount() {
      let { roomCode, type,hotel } = this.props.roomSelected;
      let {saldoUser,idUserDetail} = this.props.userActive;
      this.setState({
         saldoUser:saldoUser,
         hotel:hotel,
         roomCpty: type.roomCapacity,
         roomCode: roomCode,
         price: type.roomCost,
         roomSize: type.roomSize,
         typRoom: type.typeName,
         idUser:idUserDetail

      });
   }

   doUpdateListRoom= async () => {
      this.props.navigation.navigate('ListTrx');
      await getListRoom().then(res => {
         if (res.status === 200){
            this.props.setListRoom(res.data);
         }
      })
   };

   doBack = () => {
      this.props.navigation.navigate('Home');
   };

   doPayWithBalance = async (price) =>{
      const priceRoom = Number(price);
      let {checkIn,checkOut,idUser,roomCode,saldoUser} = this.state;
      if (!(checkIn && checkOut)){
         Alert.alert("Room Payment Failed","Fill in the input check-in and check-out ! ")
      }else {
         if (priceRoom > saldoUser){
            Alert.alert("Room Payment Failed","sorry your balance is not enough ! ")
         } else {
            let trx = {
               roomCode:roomCode,
               checkIn:checkIn,
               checkOut:checkOut,
               idUser:idUser,
               payType:1
            };
            await trxBookRoomWithSaldo(trx).then(res => {
               if (res.status === 200 ){
                  this.doUpdateListRoom();
                  Alert.alert("Room Payment Success","Enjoy For your Day ! ")
               }
            }).catch(e => {
               Alert.alert("Booking Failed","Sorry it is there wrong !");
               console.log(e);
            });
            await getUserById(trx.idUser).then(res => {
               if (res.status === 200){
                  this.props.authUser(res.data)
               }
            }).catch(err => {
               console.log("Soory Server Erorr");
            });

         }
      }
   };

   doPayWithTransfer = async () =>{
      let {checkIn,checkOut,idUser,roomCode} = this.state;
      if (!(checkIn && checkOut)){
         Alert.alert("Room Payment Failed","Fill in the input check-in and check-out ! ")
      } else {
         let trx = {
            roomCode:roomCode,
            checkIn:checkIn,
            checkOut:checkOut,
            idUser:idUser,
            payType:2
         };
         await trxBookRoom(trx).then(res =>{
            if (res.status === 200){
               Alert.alert("Booking Successfully","Enjoy For your Day");
               this.doUpdateListRoom();
            }
         }).catch(err => {
            Alert.alert("Booking Failed","Sorry it is there wrong !");
            console.log(err);
         });
      }
   };

   cardRoom = () => {
      let { hotel, roomCpty, roomCode, price, roomSize, typRoom } = this.state;
      let { addressCity, addressDistrict, addressVillage, hotelAddress, hotelName, postalCode } = hotel;
      return (
         <View>
            <Image source={require("../../assets/room.jpg")} style={{ height: 200, width: null, flex: 1, borderRadius: 40}} />
            <Card>
               <CardItem bordered>
                  <Left>
                     <Text style={styles.textKey}>Price</Text>
                  </Left>
                  <Body>
                     <NumberFormat
                         value={price}
                         displayType={'text'}
                         thousandSeparator={true}
                         prefix={'Rp.'} renderText={value => <Text style={styles.textPrice}>{value}</Text>} />
                  </Body>
                  <Right />
               </CardItem>
               <CardItem bordered>
                  <Left>
                     <Text style={styles.textKey}>Room Capacity</Text>
                  </Left>
                  <Body>
                     <Text style={styles.textKey}>{roomCpty} Person</Text>
                  </Body>
                  <Right />
               </CardItem>
               <CardItem bordered>
                  <Left>
                     <Text style={styles.textKey}>Room Code</Text>
                  </Left>
                  <Body>
                     <Text style={styles.textKey}>{roomCode}</Text>
                  </Body>
                  <Right />
               </CardItem>
               <CardItem bordered>
                  <Left>
                     <Text style={styles.textKey}>Type Room</Text>
                  </Left>
                  <Body>
                     <Text style={styles.textKey}>{typRoom}</Text>
                  </Body>
                  <Right />
               </CardItem>
               <CardItem bordered>
                  <Left>
                     <Text style={styles.textKey}>Room Size</Text>
                  </Left>
                  <Body>
                     <Text style={styles.textKey}>{roomSize}</Text>
                  </Body>
                  <Right />
               </CardItem>
               <CardItem bordered>
                  <Left>
                     <Text style={styles.textKey}>Address</Text>
                  </Left>
                  <Body style={{ marginRight: -10 }}>
                     <Text style={styles.textAddress}>{`${hotelName} ${hotelAddress} ${addressVillage} ${addressDistrict} ${addressCity} ${postalCode} `}</Text>
                  </Body>
                  <Right />
               </CardItem>
               <CardItem bordered>
                  <Left>
                     <Text style={styles.textKey}>Check in</Text>
                  </Left>
                  <Body>
                     <DatePicker
                         style={{width: 200}}
                         date={this.state.checkIn} //initial date from state
                         mode="date" //The enum of date, datetime and time
                         placeholder="Select Date"
                         format="YYYY-MM-DD"
                         minDate="2016-01-01"
                         maxDate="2025-01-01"
                         confirmBtnText="Confirm"
                         cancelBtnText="Cancel"
                         customStyles={{
                            dateIcon: {
                               position: 'absolute',
                               left: 0,
                               top: 4,
                               marginLeft: 0
                            },
                            dateInput: {
                               marginLeft: 36
                            }
                         }}
                         onDateChange={(date) => {this.setState({checkIn: date})}}
                     />
                  </Body>
                  <Right />
               </CardItem>
               <CardItem bordered>
                  <Left>
                     <Text style={styles.textKey}>Check Out</Text>
                  </Left>
                  <Body>
                     <DatePicker
                         disabled={this.state.checkIn===""}
                         style={{width: 200}}
                         date={this.state.checkOut} //initial date from state
                         mode="date" //The enum of date, datetime and time
                         placeholder="Select Date"
                         format="YYYY-MM-DD"
                         minDate={this.state.checkIn}
                         maxDate="2025-01-01"
                         confirmBtnText="Confirm"
                         cancelBtnText="Cancel"
                         customStyles={{
                            dateIcon: {
                               position: 'absolute',
                               left: 0,
                               top: 4,
                               marginLeft: 0
                            },
                            dateInput: {
                               marginLeft: 36
                            }
                         }}
                         onDateChange={(date) => {this.setState({checkOut: date})}}
                     />
                  </Body>
                  <Right />
               </CardItem>
               <CardItem button onPress={() => this.doPayWithBalance(price)} style={{backgroundColor:"#617BE3"}} >
                  <Left/>
                  <Text style={{ fontFamily: "Montserrat-Medium", color: "white"}}>Pay with Balance</Text>
                  <Right/>
               </CardItem>
               <CardItem button onPress={() => this.doPayWithTransfer()} >
                  <Left/>
                  <Text style={styles.textKey}>Pay with Transfer</Text>
                  <Right/>
               </CardItem>
            </Card>
         </View>
      )
   };

   render() {
      return (
         <Container>
            <ImageBackground source={require("../../assets/bg-food.png")} style={{ width: "100%", height: "100%" }}>
               <Header transparent>
                  <Left>
                     <TouchableOpacity onPress={this.doBack}>
                        <Icon style={{color:'white', fontSize:25}} type="Feather" name='arrow-left-circle' />
                     </TouchableOpacity>
                  </Left>
                  <Body>
                     <Text style={styles.textHeader}>Room Payment</Text>
                  </Body>
                  <Right />
               </Header>
               <Content padder>
                  <Grid>
                     <Row style={{ flexDirection: 'column', marginTop: 20 }}>
                        <Text style={styles.textDetail}>Detail Room</Text>
                        {this.cardRoom()}
                     </Row>
                  </Grid>
               </Content>
            </ImageBackground>
         </Container>
      );
   }
}

const styles = StyleSheet.create({
   textHeader: {
      fontFamily: "Montserrat-Medium",
      color: "white"
   },
   textDetail: {
      fontFamily: "Montserrat-Medium",
      color: "white",
      fontSize: 20,
      marginBottom: 8,
      textAlign: 'center'
   },
   textPrice: {
      fontFamily: "Montserrat-Bold"
   },
   textKey: {
      fontFamily: "Montserrat-Medium",
      color: "black",
      fontSize: 14
   },
   textAddress: {
      fontFamily: "Montserrat-Medium",
      color: "black",
      fontSize: 10
   }
});

const mapDispatchToProps = {
   setListRoom:getListRoomAction,
   trxRoomAction:confirmPayRoomAction,
   authUser: authUser
};

const mapStateToProps = (state) => {
   return {
      roomSelected: state.roomSelected,
      userActive:state.userActive
   };
};

export default connect(mapStateToProps,mapDispatchToProps)(BookingRoom);
