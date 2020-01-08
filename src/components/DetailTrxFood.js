import React, { Component } from 'react';
import {ImageBackground, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity} from 'react-native'
import {
   Container,
   Header,
   Content,
   Text,
   Left,
   Body,
   Right,
   Icon,
   Card,
   Row,
   View,Col
} from 'native-base';
import {connect} from "react-redux";
import NumberFormat from "react-number-format";

class DetailTrxFood extends Component {
   doRenderListDetailFood = () => {
      let {listDetail} = this.props.detailTrxFood;
      if (listDetail.length > 0){
         return listDetail.map((food,index) => {
            return (
                <View key={index}>
                   <Row style={{padding:10,paddingLeft:20,paddingRight:20}}>
                      <Col size={2}>
                         <Text style={styles.textTrx}>{food.msFB.foodBeverageName}</Text>
                      </Col>
                      <Col size={2}>
                         <Text style={styles.textTrx}>{food.msFB.costFoodBeverage}</Text>
                      </Col>
                   </Row>
                </View>
            )
         })
      }
   };

   doBack = async () => {
      this.props.navigation.navigate('ListTrx');
   };

   render() {
      let {trxFoodBeverageNo,quantityFoodBeverage,trxDate,totalCost} = this.props.detailTrxFood;
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
                      <Text style={styles.textHeader}>Detail Trx Food</Text>
                   </Body>
                   <Right />
                </Header>
                <Content padder>
                   <KeyboardAvoidingView behavior={"height"} enabled>
                      <ScrollView>
                         <Card style={{borderRadius:20}}>
                            <Row style={{padding:10,paddingLeft:20,paddingRight:20}}>
                               <Left>
                                  <Text style={styles.textTrx}>No Trx Food</Text>
                               </Left>
                               <Text style={styles.textTrx}>{trxFoodBeverageNo} </Text>
                            </Row>
                            <Row style={{padding:10,paddingLeft:20,paddingRight:20}}>
                               <Left>
                                  <Text style={styles.textTrx}>Trx date</Text>
                               </Left>
                               <Text style={styles.textTrx}>{trxDate}</Text>
                            </Row>
                            <Row style={{padding:10,paddingLeft:20,paddingRight:20}}>
                               <Left>
                                  <Text style={styles.textTrx}>Qty</Text>
                               </Left>
                               <Text style={styles.textTrx}>{quantityFoodBeverage}</Text>
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
                         </Card>
                         <Card style={{borderRadius:20, paddingVertical:3,paddingHorizontal:3}}>
                            <Row style={{paddingVertical:10,paddingHorizontal:10,backgroundColor:'#e7f0c3', borderRadius:20}}>
                               <Col size={2}>
                                  <Text style={styles.textTrx}>Name</Text>
                               </Col>
                               <Col size={2}>
                                  <Text style={styles.textTrx}>Price</Text>
                               </Col>
                            </Row>
                            {this.doRenderListDetailFood()}
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


const mapStateToProps = (state) => {
   return {
      detailTrxFood:state.detailFood
   };
};

export default connect(mapStateToProps)(DetailTrxFood);