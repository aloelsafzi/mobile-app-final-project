import React from "react";
import { StyleSheet, ImageBackground,Alert,TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Row, Grid, Text, Card, CardItem, Container, Content, Icon, Left, Body, Right, View, Header } from "native-base";
import {removeAllFood, removeFood} from "../actions/food";
import {bookFood} from "../api/food";
import {getUserById} from "../api/user";
import {authUser} from "../actions/user";
import NumberFormat from "react-number-format";

class PaymentFood extends React.Component {

   doBack = () => {
      this.props.navigation.navigate('OrderFood');
   };

   doPaymentFood = async () => {
      let {saldoUser,idUserDetail} = this.props.userActive;
      let dataFood = this.props.listFoodSelected;
      let {room} = this.props.roomActive;
      let totalPrice = 0;
      let listFood=[];
      if (dataFood.length > 0){
         dataFood.map(d => {
            totalPrice += Number(d.costFoodBeverage);
            let objFood = {
               "foodBeverageCode" : d.foodBeverageCode
            };
            listFood.push(objFood);
         });
         if (saldoUser < totalPrice ){
            Alert.alert("Order Food Failed","Sorry Your Balance not enough")
         } else {
            try {
               await bookFood(idUserDetail,room.roomCode,listFood).then(res => {
                  if (res.status === 200){
                     this.doRemoveAllFood();
                     Alert.alert("Order Food Success","Enjoy For Your Day");
                     this.doBack();
                  }
               });
               await getUserById(idUserDetail).then(res => {
                  if (res.status === 200){
                     this.props.authUser(res.data)
                  }
               }).catch(err => {
                  console.log("Soory Server Erorr");
               });
            } catch (e) {
               Alert.alert("Order Food Failed","Please Booking Room and Check-in to have Order Food")
            }
         }
      }
   };

   doViewTotPrice = () => {
      let data = this.props.listFoodSelected;
      let totalPrice = 0;
      if (data.length > 0){
         data.map(d => totalPrice += Number(d.costFoodBeverage) );
        return(
            <Card style={{padding:10, borderRadius:10}}>
               <NumberFormat
                   value={totalPrice}
                   displayType={'text'}
                   thousandSeparator={true}
                   prefix={'Rp.'} renderText={value => <Text style={styles.textPrice}>Total Price : {value}</Text>} />
            </Card>
        )
      }
   };

   doRemoveAllFood = () => {
      let data = this.props.listFoodSelected;
      if (data.length > 0){
         data.map(d => this.props.doRemoveAllFood(d) )
      }
   };


   doRemoveItemFood = (food) =>{
      this.props.doRemoveFood(food);
   };

   renderFood = () => {
      let data = this.props.listFoodSelected;
      if (data.length > 0){
         return data.map((food,index) => {
            return (
                <View key={index}>
                   <Card>
                      <CardItem bordered>
                         <Left>
                            <Text style={styles.textKey}>Food Name</Text>
                         </Left>
                         <Body>
                            <Text style={styles.textPrice}>{food.foodBeverageName}</Text>
                         </Body>
                         <Right />
                      </CardItem>
                      <CardItem bordered>
                         <Left>
                            <Text style={styles.textKey}>Price</Text>
                         </Left>
                         <Body>
                            <NumberFormat
                                value={food.costFoodBeverage}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'Rp.'} renderText={value => <Text style={styles.textPrice}>{value}</Text>} />
                         </Body>
                         <Right />
                      </CardItem>
                      <TouchableOpacity style={{backgroundColor:'#ef4339', paddingVertical:10}} onPress={() => this.doRemoveItemFood(food)} >
                         <Text style={{ fontFamily: "Montserrat-Medium", color:'white',textAlign: 'center'}}>Cancle</Text>
                      </TouchableOpacity>
                   </Card>
                </View>
            )
         });
      } else {
         return (
          <View>
             <Card style={{padding:20,borderRadius:20}}>
                <Text style={{textAlign:'center'}}>Not Your Food, Sorry</Text>
             </Card>
          </View>
         )
      }
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
                      <Text style={styles.textHeader}>Food Payment</Text>
                   </Body>
                   <Right />
                </Header>
                <Content padder>
                   <Grid>
                      <Row style={{ flexDirection: 'column', marginTop: 30 }}>
                         <Text style={styles.textDetail}>Detail Food</Text>
                         {this.renderFood()}
                      </Row>
                      <Row style={{flexDirection:'column'}}>
                         {this.doViewTotPrice()}
                      </Row>
                      <Row style={{flexDirection:'column', alignSelf:'center' , marginTop:10}}>
                         <TouchableOpacity style={{backgroundColor:'#5cb85c', padding:10,
                            borderRadius:10}} onPress={()=>this.doPaymentFood()} >
                            <Text style={styles.textHeader}>Pay With Balance</Text>
                         </TouchableOpacity>
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
   doRemoveFood: removeFood,
   doRemoveAllFood:removeAllFood,
   authUser: authUser
};

const mapStateToProps = (state) => {
   return {
      listFoodSelected: state.listFoodSelected,
      userActive: state.userActive,
      roomActive:state.roomActive,
   };
};

export default connect(mapStateToProps,mapDispatchToProps)(PaymentFood);
