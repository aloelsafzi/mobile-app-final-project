import React, { Component } from 'react';
import {ImageBackground, StyleSheet, KeyboardAvoidingView, ScrollView, Alert, TouchableOpacity} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Icon, Grid, Col, Row, Text, Button, Thumbnail, Body, Right, Left } from 'native-base';
import FooterSegment from "./shared/FooterSegment";
import {connect} from "react-redux";
import {getUserById, topUp} from "../api/user";
import {authUser} from "../actions/user";

class TopUp extends Component {
    state = { balance :"", balanceUser :0, idUserDetail:""};

    componentDidMount() {
        let {saldoUser , idUserDetail} = this.props.userActive;
        this.setState({balanceUser:saldoUser, idUserDetail:idUserDetail});
    }

    doBack = () => {
        this.props.navigation.navigate('Home');
    };

    doTopUp = async () =>{
        let {balance ,balanceUser,idUserDetail} = this.state;
        let balanceNow = (Number(balance)+Number(balanceUser));
        let data = {
            id:idUserDetail,
            balance:balanceNow
        };
        if (!balance){
            Alert.alert("Top Up",`please fill in your Top Up`);
        } else {
            await topUp(data).then((res) =>{
                if (res.status === 200){
                    Alert.alert("Top Up",`your balance now Rp. ${balanceNow}`);
                    this.setState({balance: null})
                }
            }).catch(err => {
                Alert.alert("Top Up failed",`sorry top up balance failed`)
            });
            await getUserById(data.id).then(res => {
                if (res.status === 200){
                    this.props.authUser(res.data)
                }
            }).catch(err => {
                console.log("Soory Server Erorr");
            });
        }
    };

    render() {
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
                            <Text style={styles.textHeader}>Top Up</Text>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <KeyboardAvoidingView behavior={"height"} enabled>
                            <ScrollView>
                                <Grid>
                                    <Row style={styles.layoutForm} size={3}>
                                        <Thumbnail style={{ alignSelf: "center", width: 200, height: 150 }}  source={require("../../assets/topup.png")} />
                                        <Form>
                                            <Item floatingLabel>
                                                <Label style={styles.textLabel}>Nominal</Label>
                                                <Icon iconleft type="FontAwesome" name="money" />
                                                <Input value={this.state.balance} keyboardType="number-pad" onChangeText={(balance) => { this.setState({ balance: balance }) }} />
                                            </Item>
                                            <Row>
                                                <Col style={{ margin: 4 }}>
                                                    <Button style={styles.buttonTopUp} full rounded iconLeft primary
                                                    onPress={this.doTopUp}
                                                    >
                                                        <Icon type='Feather' name='check-square' />
                                                        <Text style={styles.buttonTxt}>Top Up</Text>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
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
        paddingLeft: 10,
        fontSize: 14,
        fontFamily: 'Montserrat-Medium'
    },
    layoutForm: {
        flexDirection: 'column',
        width: '100%',
        padding: 30,
    },
    buttonTopUp: {
        marginTop: 30
    },
    buttonTxt: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium'
    },
    textHeader: {
        color: "white",
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        textAlign: "center"
    }
});

const mapDispatchToProps = {
    authUser: authUser

};
const mapStateToProps = (state) => {
    return { userActive: state.userActive };
};

export default connect(mapStateToProps,mapDispatchToProps)(TopUp);
