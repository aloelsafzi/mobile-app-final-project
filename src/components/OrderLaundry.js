import React, { Component } from 'react';
import {ImageBackground, StyleSheet, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import {
    Container,
    Header,
    Content,
    Icon,
    Grid,
    Row,
    Text,
    Button,
    Body,
    Right,
    Left,
    View, Card
} from 'native-base';
import FooterSegment from "./shared/FooterSegment";
import {getListFoodActive} from "../api/food";

class OrderLaundry extends Component {

    doBack = () => {
        this.props.navigation.navigate('Home');
    };

    // doBooking = (food) => {
    //     alert('See You Next Time')
    //  // this.props.foodSelected(food);
    // };

    doDetailBookLaundry = () => {
       Alert.alert("Under Maintenance",'See You Next Time')
    };


    // listLaundry = () =>{
    //     let data = this.state.listFood;
    //     if (data){
    //         return data.map((food) => {
    //             return(
    //                 <View key={food.idFoodBeverage}>
    //                     <Card>
    //                         <CardItem >
    //                             <Left>
    //                                 <Thumbnail source={require("../../assets/laundry.png")} />
    //                                 <Body>
    //                                     <Text style={styles.textCard}>{Kemeja}</Text>
    //                                 </Body>
    //                             </Left>
    //                         </CardItem>
    //                         <CardItem cardBody style={{paddingHorizontal:10}}>
    //                             <Image source={require("../../assets/laundry-kemeja.png")} style={{height: 200, flex: 1, borderRadius:6}}/>
    //                         </CardItem>
    //                         <CardItem>
    //                             <Left>
    //                                 <NumberFormat
    //                                     value={food.costFoodBeverage}
    //                                     displayType={'text'}
    //                                     thousandSeparator={true}
    //                                     prefix={'Rp.'} renderText={value => <Text style={styles.textCardChild}>{value}</Text>} />
    //                             </Left>
    //                             <TouchableOpacity style={{backgroundColor:'#61A765', paddingHorizontal:12, paddingVertical:11, alignSelf:'flex-end', borderRadius:4}} onPress={() => this.doBooking()}>
    //                                 <Text style={{fontSize:13, fontWeight:'bold', color:'white', textAlign:'center'}}>Order Laundry</Text>
    //                             </TouchableOpacity>
    //                         </CardItem>
    //                     </Card>
    //                 </View>
    //             )
    //         })
    //     }
    //
    // };


    render() {
        return (
            <Container>
                <ImageBackground source={require("../../assets/bg-food.png")} style={{width:"100%", height:"100%"}}>
                    <Header transparent style={{height:220}}>
                        <Grid>
                            <Row style={{flexDirection: "row"}}>
                                <Left>
                                    <Button transparent onPress={this.doBack}>
                                        <Icon type="Feather" name='arrow-left-circle' />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text style={styles.textHeader}>Laundry</Text>
                                </Body>
                                <Right>
                                    <Button transparent onPress={this.doDetailBookLaundry} >
                                        <Icon type="AntDesign" name="shoppingcart"/>
                                        <Text style={styles.textHeader}>0</Text>
                                    </Button>
                                </Right>
                            </Row>
                            <View style={{marginHorizontal:2, marginTop:50}}>
                            <View style={{
                                flexDirection:'row',
                                paddingTop:20, paddingBottom:14,
                                backgroundColor:'#FFFF', borderRadius:20,
                                borderWidth:0.3,
                                borderColor:'grey'
                            }}>
                                <TouchableOpacity onPress={this.doDetailBookLaundry} style={{ flex:1, alignItems:'center'}}>
                                <Image source={require('../../assets/piyama.png')} />
                                <Text style={styles.textLabel}>Clothes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.doDetailBookLaundry} style={{ flex:1, alignItems:'center'}}>
                                <Image source={require('../../assets/pants.png')}/>
                                <Text style={styles.textLabel}>Pants</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.doDetailBookLaundry} style={{ flex:1, alignItems:'center'}}>
                                <Image source={require('../../assets/shoes.png')}/>
                                <Text style={styles.textLabel}>Shoes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.doDetailBookLaundry} style={{ flex:1, alignItems:'center'}}>
                                <Image source={require('../../assets/bag.png')}/>
                                <Text style={styles.textLabel}>Bags</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        </Grid>
                    </Header>
                    <Content padder>
                        <KeyboardAvoidingView behavior={"height"} enabled>
                            <ScrollView>
                                <Grid>
                                    <Row style={{flexDirection:'column', marginTop:10}}>
                                        {/*{this.listLaundry()}*/}
                                        <Card style={{
                                            borderRadius:20
                                        }}>
                                            <Image source={require("../../assets/e_503.png")} style={{borderRadius:20}}/>
                                        </Card>
                                    </Row>
                                </Grid>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </Content>
                    <FooterSegment/>
                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textLabel: {
        marginTop:13,
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
    },
    textCardChild: {
        fontFamily: "Montserrat-Bold"
    },
    layoutForm: {
        flexDirection: 'column',
        width: '100%',
        padding: 5,
    },
    textHeader: {
        color: "white",
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
    }
});
export default OrderLaundry;
