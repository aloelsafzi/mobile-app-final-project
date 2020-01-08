import React, { Component } from 'react';
import {ImageBackground, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Label,
    Icon,
    Grid,
    Row,
    Text,
    Button,
    Thumbnail,
    Body,
    Right,
    Left,
    View, Card, CardItem, Col, Picker
} from 'native-base';
import FooterSegment from "./shared/FooterSegment";
import {getListFoodActive, searchFood} from "../api/food";
import {connect} from "react-redux";
import {foodSelected} from "../actions/food";
import NumberFormat from "react-number-format";

class OrderFood extends Component {
    state = { listFood :[], searchKey:'',loading:false, typeSearch:'', from:0, to:0, isViewDataSearch:false, AllFood:true, listFoodSearch:[] };

    async componentDidMount() {
        this.doRenderListFood();
    }

    doRenderListFood = async () => {
        try {
            this.setState({loading:true});
            await getListFoodActive().then(res => {
                if (res.status === 200){
                    this.setState({listFood:res.data})
                }
            }).catch(error =>{
                console.log('there is wrong, sorry');
            }).finally(()=>{
                this.setState({loading:false});
            })
        } catch (e) {
            console.log('there is wrong, sorry');
        }

    };

    doBack = () => {
        this.props.navigation.navigate('Home');
    };

    doBooking = (food) => {
     this.props.foodSelected(food);
    };

    doDetailBookFood = () => {
        this.props.navigation.navigate('PaymentFood');
    };

    // doScanQrFood =()=>{
    //     this.props.navigation.navigate('ScanQRFood');
    // };

    doSearch = async () => {
        let {typeSearch,from,to,searchKey} = this.state;
        this.setState({loading:true});
        await searchFood(typeSearch,from,to,searchKey).then(res => {
            if (res.status === 200){
                this.setState({
                    listFoodSearch:res.data, isViewDataSearch:true,AllFood:false
                })
            }
        }).catch(()=>{
            alert('data not found');
        }).finally(()=>{
            this.setState({
                from: 0,to: 0, typeSearch: '',searchKey:''
            });
            this.setState({loading:false});
        })
    };

    doViewFormSearch = () => {
        switch (this.state.typeSearch) {
            case 'cost':
                return(
                    <Card style={{paddingHorizontal:10, paddingVertical:5, borderRadius: 10}}>
                        <Form>
                            <Row>
                                <Col size={3}>
                                    <Item>
                                        <Input keyboardType="number-pad" placeholder={'from : ex 1000'} onChangeText={(search) => { this.setState({ from: search }) }} />
                                    </Item>
                                    <Item>
                                        <Input keyboardType="number-pad" placeholder={'to : ex 4000'} onChangeText={(search) => { this.setState({ to: search }) }} />
                                    </Item>
                                </Col>
                            </Row>
                            <Row style={{marginTop:10}}>
                                <Col size={4}>
                                </Col>
                                <Col size={1}>
                                    <TouchableOpacity onPress={()=> this.doSearch()} style={{ backgroundColor: '#3F51B5', borderRadius: 10,
                                        paddingHorizontal:5, paddingVertical:5 }}>
                                        <Icon style={{color:'white'}} type='Feather' name='search' />
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                );
                break;
            case "name":
                return (
                    <Card style={{paddingHorizontal:10, paddingVertical:5, borderRadius: 10}}>
                        <Form>
                            <Row>
                                <Col size={3}>
                                    <Item>
                                        <Input placeholder={'food: ex Bakso'} onChangeText={(search) => { this.setState({ searchKey: search }) }} />
                                    </Item>
                                </Col>
                            </Row>
                            <Row style={{marginTop:10}}>
                                <Col size={4}>
                                </Col>
                                <Col size={1}>
                                    <TouchableOpacity onPress={()=> this.doSearch()} style={{ backgroundColor: '#3F51B5', borderRadius: 10,
                                        paddingHorizontal:5, paddingVertical:5 }}>
                                        <Icon style={{color:'white'}} type='Feather' name='search' />
                                    </TouchableOpacity>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                )
        }
    };

    doViewDataSearch = () => {
        let data = this.state.listFoodSearch;
        if (data.length > 0){
            return data.map((food) => {
                let fotoFood;
                let foto;
                try {
                    let lastIdx =  food.images.length - 1;
                    fotoFood = `data:image/png;base64,${food.images[lastIdx].sourceImage}`;
                    foto = food.images.length > 0 ? {uri :fotoFood} : require('../../assets/food.jpg');
                }catch (e) {
                    foto = food.images.length > 0 ? {uri :fotoFood} : require('../../assets/food.jpg');
                }
                return(
                    <View key={food.idFoodBeverage}>
                        <Card>
                            <CardItem >
                                <Left>
                                    <Thumbnail source={require("../../assets/topup.png")} />
                                    <Body>
                                        <Text style={styles.textCard}>{food.foodBeverageName}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <Text style={styles.textCard}>
                                        {food.foodBeverageTime === 1?'Breakfast':null}
                                        {food.foodBeverageTime === 2?'Brunch':null}
                                        {food.foodBeverageTime === 3?'Lunch':null}
                                        {food.foodBeverageTime === 4?'Dinner':null}
                                        {food.foodBeverageTime === 5?'Night Mile':null}
                                        {food.foodBeverageTime === 6?'All Time':null}
                                    </Text>
                                </Right>
                            </CardItem>
                            <CardItem cardBody style={{paddingHorizontal:10}}>
                                <Image source={foto} style={{height: 200, flex: 1, borderRadius:10}}/>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text>{food.foodBeverageType}</Text>
                                </Left>
                                <Body>
                                    <TouchableOpacity
                                        style={styles.btnBook}
                                        onPress={() => this.doBooking(food)}>
                                        <Text style={styles.txtBtn}>Booking</Text>
                                    </TouchableOpacity>
                                </Body>
                                <Right>
                                    <NumberFormat
                                        value={food.costFoodBeverage}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'Rp.'} renderText={value => <Text style={styles.textCardChild}>{value}</Text>} />
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Row>
                                    <Col size={1}>
                                        <Text style={styles.textdetail}>Detail : </Text>
                                    </Col>
                                    <Col size={4}>
                                        <Text style={styles.textdetail}>{food.descriptionFb}</Text>
                                    </Col>
                                </Row>
                            </CardItem>
                        </Card>
                    </View>
                )
            })
        }
    };

    listFood = () =>{
        let data = this.state.listFood;
        if (data.length > 0){
            return data.map((food) => {
                let fotoFood;
                let foto;
                try {
                    let lastIdx =  food.images.length - 1;
                    fotoFood = `data:image/png;base64,${food.images[lastIdx].sourceImage}`;
                    foto = food.images.length > 0 ? {uri :fotoFood} : require('../../assets/food.jpg');
                }catch (e) {
                    foto = food.images.length > 0 ? {uri :fotoFood} : require('../../assets/food.jpg');
                }
                return(
                    <View key={food.idFoodBeverage}>
                        <Card>
                            <CardItem >
                                <Left>
                                    <Thumbnail source={require("../../assets/topup.png")} />
                                    <Body>
                                        <Text style={styles.textCardChild}>{food.foodBeverageName}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <Text style={styles.textCardChild}>
                                        {food.foodBeverageTime === 1?'Breakfast':null}
                                        {food.foodBeverageTime === 2?'Brunch':null}
                                        {food.foodBeverageTime === 3?'Lunch':null}
                                        {food.foodBeverageTime === 4?'Dinner':null}
                                        {food.foodBeverageTime === 5?'Night Mile':null}
                                        {food.foodBeverageTime === 6?'All Time':null}
                                    </Text>
                                </Right>
                            </CardItem>
                            <CardItem cardBody style={{paddingHorizontal:10}}>
                                <Image source={foto} style={{height: 200, flex: 1, borderRadius:10}}/>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    <Text style={styles.textCardChild}>{food.foodBeverageType}</Text>
                                </Left>
                                <Body>
                                    <TouchableOpacity
                                        style={styles.btnBook}
                                        onPress={() => this.doBooking(food)}>
                                        <Text style={styles.txtBtn}>Booking</Text>
                                    </TouchableOpacity>
                                </Body>
                                <Right>
                                    <NumberFormat
                                        value={food.costFoodBeverage}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'Rp.'} renderText={value => <Text style={styles.textCardChild}>{value}</Text>} />
                                </Right>
                            </CardItem>
                            <CardItem>
                                <Row>
                                    <Col size={1}>
                                        <Text style={styles.textdetail}>Detail : </Text>
                                    </Col>
                                    <Col size={4}>
                                        <Text style={styles.textdetail}>{food.descriptionFb}</Text>
                                    </Col>
                                </Row>
                            </CardItem>
                        </Card>
                    </View>
                )
            })
        }

    };


    render() {
        let {AllFood,isViewDataSearch} = this.state;
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
                            <Text style={styles.textHeader}>Order Food</Text>
                        </Body>
                        <Right style={{marginRight: 10}}>
                            <Button transparent onPress={this.doDetailBookFood} >
                                <Icon type="AntDesign" name="shoppingcart"/>
                                <Text style={styles.textHeader}>{this.props.listFoodSelected.length}</Text>
                            </Button>
                            {/*<Button transparent onPress={this.doScanQrFood} >*/}
                            {/*   <Icon type="AntDesign" name="qrcode"/>*/}
                            {/*</Button>*/}
                        </Right>
                    </Header>
                    <Content padder>
                        <ScrollView>
                            <Grid>
                                <Row style={{flexDirection: "column", marginTop:10}}>
                                    <Card style={{paddingVertical:5, paddingHorizontal:10, borderRadius: 10}}>
                                        <Form>
                                            <Row>
                                                <Col size={3}>
                                                    <Item picker>
                                                        <Label><Text>Search</Text></Label>
                                                        <Picker
                                                            mode="dropdown"
                                                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                            selectedValue={this.state.typeSearch}
                                                            onValueChange={(itemValue, itemIndex) =>
                                                                this.setState({typeSearch: itemValue})
                                                            }>
                                                            <Picker.Item label="By" value="B" />
                                                            <Picker.Item label="Price" value="cost" />
                                                            <Picker.Item label="Name Food" value="name" />
                                                        </Picker>
                                                    </Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Card>
                                </Row>
                                <Row style={{ flexDirection: "column", marginTop: 5}}>
                                    {this.doViewFormSearch()}
                                </Row>
                                <Row style={{flexDirection:'column', marginTop:10}}>
                                    {AllFood?this.listFood():null}
                                    {isViewDataSearch?this.doViewDataSearch():null}
                                </Row>
                            </Grid>
                        </ScrollView>
                    </Content>
                    <FooterSegment/>
                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textLabel: {
        paddingLeft: 10,
        fontSize: 14,
        color: "grey",
        fontFamily: 'Montserrat-Medium',
    },
    btnBook: {
        backgroundColor:'#5cb85c',
        padding:10,
        borderRadius:10
    },
    txtBtn : {
        fontFamily: "Montserrat-Medium",
        color: 'white'
    },
    textCardChild: {
        fontFamily: "Montserrat-Bold"
    },
    layoutForm: {
        flexDirection: 'column',
        width: '100%',
        padding: 5,
    },
    buttonSearch: {
       borderRadius:100,
       marginLeft:2,
       marginRight:8
    },
    textHeader: {
        color: "white",
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
    },
    textdetail: {
        fontFamily: "Montserrat-Medium",
        fontSize: 8
    }
});

const mapDispatchToProps = {
    foodSelected: foodSelected
};

const mapStateToProps = (state) => {
    return {
        listFoodSelected: state.listFoodSelected,
        userActive: state.userActive,
        listRoom:state.listRoom
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderFood);
