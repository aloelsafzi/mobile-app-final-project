import React, { Component } from 'react';
import {ImageBackground, StyleSheet, KeyboardAvoidingView, ScrollView, Alert, TouchableOpacity} from 'react-native'
import {
   Container,
   Header,
   Content,
   Text,
   Left,
   Body,
   Right,
   Button,
   Icon,
   Card,
   CardItem,
   Row,
   Item,
   Label,
   Input,View,Col
} from 'native-base';
import {connect} from "react-redux";
import {getListRoom, getListTrx, payBookRoom} from "../api/room";
import {getListRoomAction, getListTrxRoomAction} from "../actions/room";
import NumberFormat from "react-number-format";

class ConfirmPayment extends Component {
   state = {
      noRek:null,
      pay:false,
      chckInOut:false
   };

   componentDidMount() {
      let {detail} = this.props.trxRoom;
      let detailUrut = detail.sort((a,b) => (b.idDetail - a.idDetail));
      if (detailUrut[0].statusTrx === 3){
         this.setState({pay:true});
      }
      if(detailUrut[0].statusTrx === 1 ||detailUrut[0].statusTrx === 4 ) {
         this.setState({chckInOut:true});
      }
   }


   doBack = async () => {
      this.props.navigation.navigate('ListTrx');
   };

   doScand = () => {
      this.props.navigation.navigate('QRCheckInOut');
   };

   doAlreadyPay = async () => {
      if (!this.state.noRek){
         Alert.alert("Payment Failed","Fill in all input forms NoRek !");
      } else {
         let {noTrx,totalCost} = this.props.trxRoom;
         let detTrx = {
            noTrx : noTrx,
            noRek : this.state.noRek,
            payTotal : totalCost
         };

         await payBookRoom(detTrx).then(res => {
            if (res.status === 200){
               Alert.alert("Payment Success","Enjoy For Your Day");
               this.doBack();
            }
         }).catch(e => {
            Alert.alert("Payment Failed","We are Sorry");
         });
         await getListTrx().then(res => {
            if (res.status === 200){
               this.props.setListTrxRoom(res.data);
            }
         }).catch(e => {
            console.log('something wrong')
         });

         await getListRoom().then((res) => {
            if (res.status === 200) {
               this.props.setListRoom(res.data);
            }
         }).catch(e => {
            console.log('something wrong')
         });
      }
   };
   render() {
      let {detail,totalCost} = this.props.trxRoom;
      let detailUrut = detail.sort((a,b)=>(b.idDetail - a.idDetail));
      let toActPay;
      let checkInAndOut;
      let none;
      if (this.state.pay){
         toActPay = (
             <View>
                <Row style={{flexDirection:'column',padding:10,paddingLeft:20,paddingRight:20}}>
                   <Item floatingLabel>
                      <Label style={styles.textLabel}>No Rek</Label>
                      <Icon type='AntDesign' name='creditcard' style={{ fontSize: 20 }} />
                      <Input keyboardType="numeric" onChangeText={(rek) => { this.setState({ noRek: rek }) }}/>
                   </Item>
                </Row>
                <Row style={{padding:10,paddingLeft:20,paddingRight:20}}>
                   <Text style={styles.textNote}>Please transfer the payment to the following account number BNI: 45678798. Sweet Hotel</Text>
                </Row>
                <Row style={{flexDirection:'column',padding:20}}>
                   <Button success full rounded onPress={this.doAlreadyPay}>
                      <Text style={styles.textHeader}>
                         already paid
                      </Text>
                   </Button>
                </Row>
             </View>
         )
      } else if (this.state.chckInOut){
         checkInAndOut = (
             <Row style={{marginTop:10}}>
                <Col style={{margin:2}}>
                   <CardItem style={{backgroundColor:'#007aff', borderRadius:20}} button={true} onPress={this.doScand}>
                      <Left>
                         <Icon  style={styles.textIconTrx} iconleft type="Feather" name="check-circle" />
                      </Left>
                      <Text style={styles.textBtnTrx}>Check In</Text>
                      <Right/>
                   </CardItem>
                </Col>
                <Col  style={{margin:2}}>
                   <CardItem style={{backgroundColor:'#f0ad4e', borderRadius:20}} button={true} onPress={this.doScand}>
                      <Left>
                         <Icon style={styles.textIconTrx} iconleft type="Feather" name="x-circle" />
                      </Left>
                      <Text style={styles.textBtnTrx}>Check Out</Text>
                      <Right/>
                   </CardItem>
                </Col>
             </Row>
         )
      } else {
         none = (<View></View>);
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
                      <Text style={styles.textHeader}>Payment confirmation</Text>
                   </Body>
                   <Right />
                </Header>
                <Content padder>
                   <KeyboardAvoidingView behavior={"height"} enabled>
                      <ScrollView>
                         <Card style={{borderRadius:20}}>
                            <Row style={{padding:10,paddingLeft:20,paddingRight:20}}>
                               <Left>
                                  <Text style={styles.textTrx}>No Trx</Text>
                               </Left>
                                  <Text style={styles.textTrx}>{detailUrut[0].trxNo} </Text>
                            </Row>
                            <Row style={{padding:10,paddingLeft:20,paddingRight:20}}>
                               <Left>
                                  <Text style={styles.textTrx}>Trx date</Text>
                               </Left>
                                  <Text style={styles.textTrx}>{detailUrut[0].trxDate}</Text>
                            </Row>
                            <Row style={{padding:10,paddingLeft:20,paddingRight:20}}>
                               <Left>
                                  <Text style={styles.textTrx}>Check-In date</Text>
                               </Left>
                                  <Text style={styles.textTrx}>{detailUrut[0].dateCheckIn}</Text>
                            </Row>
                            <Row style={{padding:10,paddingLeft:20,paddingRight:20}}>
                               <Left>
                                  <Text style={styles.textTrx}>Check-Out date</Text>
                               </Left>
                                  <Text style={styles.textTrx}> {detailUrut[0].dateCheckOut} </Text>
                            </Row>
                            <Row style={{padding:10,paddingLeft:20,paddingRight:20}}>
                               <Left>
                                  <Text style={styles.textTrx}>Total Pay</Text>
                               </Left>
                               <NumberFormat
                                   value={totalCost}
                                   displayType={'text'}
                                   thousandSeparator={true}
                                   prefix={'Rp.'} renderText={value => <Text>{value}</Text>} />
                            </Row>
                            <Row style={{padding:10,paddingLeft:20,paddingRight:20}}>
                               <Left>
                                  <Text style={styles.textTrx}>Status</Text>
                               </Left>
                               <Text style={styles.textTrx}>
                                  {detailUrut[0].statusTrx === 1? "already paid" : null}
                                  {detailUrut[0].statusTrx === 2? "cancle" : null}
                                  {detailUrut[0].statusTrx === 3? "not yet paid" : null}
                                  {detailUrut[0].statusTrx === 4? "Check In" : null}
                                  {detailUrut[0].statusTrx === 5? "Check Out" : null}
                               </Text>
                            </Row>
                            {toActPay}
                            </Card>
                         {checkInAndOut}
                         {none}
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
   },
   textTrx:{
      fontFamily: 'Montserrat-Medium',
      fontSize:13,
   },
   textBtnTrx:{
      fontFamily: 'Montserrat-Medium',
      fontSize:13,
      color:'white'
   },
   textIconTrx:{
      fontFamily: 'Montserrat-Medium',
      fontSize:20,
      color:'white'
   },
   textNote :{
      fontFamily: 'Montserrat-Medium',
      fontSize:13,
      color:"red"
   },
   textLabel: {
      paddingLeft: 10,
      fontSize: 14,
      fontFamily: 'Montserrat-Medium'
   }
});


const mapDispatchToProps = {
   setListTrxRoom: getListTrxRoomAction,
   setListRoom: getListRoomAction
};

const mapStateToProps = (state) => {
   return {
      trxRoom:state.trxRoom
   };
};

export default connect(mapStateToProps,mapDispatchToProps)(ConfirmPayment);