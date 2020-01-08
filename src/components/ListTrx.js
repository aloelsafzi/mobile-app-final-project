import React, { Component } from 'react';
import {ImageBackground, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image} from 'react-native'
import { Container, Header, Content,Text,Left,Body,Right,Icon,Card,CardItem,Col,View} from 'native-base';
import {getListTrx} from "../api/room";
import {getListTrxRoomAction, confirmPayRoomAction, roomActiveAction} from "../actions/room";
import {connect} from "react-redux";
import NumberFormat from "react-number-format";
import {getListTrxFood} from "../api/food";
import {detailTrxFoodAction, setListTrxFood} from "../actions/food";

class ListTrx extends Component {

   state = {loading:false};

   doBack = () => {
      this.props.navigation.navigate('Home');
   };

   async componentDidMount() {
     this.doRenderListTrx();
     this.doRenderListTrxFood();
   }

   doConfirmPay = (trx) => {
      this.props.confirmPayRoom(trx);
      this.props.navigation.navigate('ConfirmPayment');
   };

   doDetailTrxFood = (trx) => {
      this.props.detailTrxFood(trx);
      this.props.navigation.navigate('DetailTrxFood');
   };

   doRenderListTrxFood = async () => {
      this.setState({loading:true});
      await getListTrxFood().then(res => {
         if (res.status === 200){
            this.props.setListTrxFood(res.data);
         }
      }).finally(()=>{
         this.setState({loading:false})
      })
   };

   doRenderListTrx = async () => {
      this.setState({loading:true});
      await getListTrx().then(res => {
         if (res.status === 200){
            this.props.setListTrxRoom(res.data);
         }
      }).finally(()=>{
         this.setState({loading:false})
      })
   };

   getListTrxFood = () => {
      let dataFood = this.props.listTrxFood;
      let dataRoom = this.props.roomActive;
      try {
         if (dataFood.length > 0 && dataRoom.detail.length > 0) {
            let listTrxFoodById = dataFood.filter(food => food.trxNo === dataRoom.detail[0].trxNo);
            return listTrxFoodById.map(list => {
               return (
                   <CardItem bordered button onPress={() => this.doDetailTrxFood(list)}>
                      <Col size={2}>
                         <Text>{list.trxFoodBeverageNo}</Text>
                      </Col>
                      <Col size={1}>
                         <Text>{list.quantityFoodBeverage}</Text>
                      </Col>
                      <Col size={2}>
                         <NumberFormat
                             value={list.totalCost}
                             displayType={'text'}
                             thousandSeparator={true}
                             prefix={'Rp.'} renderText={value => <Text>{value}</Text>}/>
                      </Col>
                   </CardItem>
               )
            })
         }
      } catch (e) {
         console.log("please book room ok")
      }

   };

   getListTrxRoom = () => {
      let dataRoom = this.props.listTrxRoom;
      let {idUserDetail} = this.props.userActive;
      if (dataRoom.length > 0) {
         let listTrxById = dataRoom.filter(trx => trx.userDetailId === idUserDetail);
         return listTrxById.map(list => {
            let dataSort = list.detail.sort((a,b)=>(b.idDetail - a.idDetail));
            let chekRoom = dataSort[0].statusTrx;
            if ( chekRoom === 4 || chekRoom === 1  ){
               this.props.roomActiveAct(list);
            }
            return(
               <CardItem bordered button onPress={() => this.doConfirmPay(list)}>
                  <Col size={2}>
                     <Text>{list.noTrx}</Text>
                  </Col>
                  <Col size={1}>
                     <Text>{list.room.roomCode}</Text>
                  </Col>
                  <Col size={2}>
                     <NumberFormat
                         value={list.totalCost}
                         displayType={'text'}
                         thousandSeparator={true}
                         prefix={'Rp.'} renderText={value => <Text>{value}</Text>} />
                  </Col>
               </CardItem>
            )
         })
      }
   };

   render() {
      if (this.state.loading) {
         return (
             <View style={{flex:1,flexDirection:'column', alignItems:'center', justifyContent:"center"}}>
                <View style={{borderRadius: 50}}>
                   <Image style={{height:150, width:150}} source={require("../../assets/loading.gif")}/>
                </View>
             </View>);
      }
      return (
          <Container>
             <ImageBackground source={require("../../assets/bg.png")} style={{width:"100%", height:"100%"}}>
                <Header transparent>
                   <Left>
                      <TouchableOpacity onPress={this.doBack}>
                         <Icon style={{color:'white', fontSize:25}} type="Feather" name='arrow-left-circle' />
                      </TouchableOpacity>
                   </Left>
                   <Body>
                      <Text style={styles.textHeader}>List Transactions</Text>
                   </Body>
                   <Right />
                </Header>
                <Content padder>
                   <KeyboardAvoidingView behavior={"height"} enabled>
                      <ScrollView>
                         <Card style={{borderRadius:20, paddingVertical:10, marginTop:30}}>
                            <Text style={{textAlign:'center'}}>My Room Transactions</Text>
                         </Card>
                         <Card>
                            <CardItem style={{backgroundColor:'#e7f0c3'}}>
                               <Col size={2}>
                                  <Text>No Trx</Text>
                               </Col>
                               <Col size={1}>
                                  <Text>Room</Text>
                               </Col>
                               <Col size={2}>
                                  <Text>Price</Text>
                               </Col>
                            </CardItem>
                            {this.getListTrxRoom()}
                         </Card>
                         <Card style={{borderRadius:20, paddingVertical:10, marginTop:30}}>
                            <Text style={{textAlign:'center'}}>My Food Transactions</Text>
                         </Card>
                         <Card>
                            <CardItem style={{backgroundColor:'#e7f0c3'}}>
                               <Col size={2}>
                                  <Text>No Trx</Text>
                               </Col>
                               <Col size={1}>
                                  <Text>Qty</Text>
                               </Col>
                               <Col size={2}>
                                  <Text>Price</Text>
                               </Col>
                            </CardItem>
                            {this.getListTrxFood()}
                         </Card>
                      </ScrollView>
                   </KeyboardAvoidingView>
                </Content>
             </ImageBackground>
          </Container>
      );
   }
}

const styles = StyleSheet.create({
   textHeader:{
      fontFamily: 'Montserrat-Medium',
      fontSize:15,
      color:"white"
   }
});

const mapDispatchToProps = {
   setListTrxRoom: getListTrxRoomAction,
   confirmPayRoom: confirmPayRoomAction,
   detailTrxFood: detailTrxFoodAction,
   roomActiveAct: roomActiveAction,
   setListTrxFood: setListTrxFood
};

const mapStateToProps = (state) => {
   return {
      userActive: state.userActive,
      listTrxRoom: state.listTrxRoom,
      listTrxFood: state.listTrxFood,
      roomActive:state.roomActive,
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTrx);
