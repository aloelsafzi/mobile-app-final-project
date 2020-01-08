import React from 'react';
import {Body, Container, Content, Header, Text, Thumbnail, Title, Grid, Row, Icon, Button, Right, Left, StyleProvider} from "native-base";
import {Platform, StatusBar, StyleSheet} from "react-native";
import getTheme from "../../../native-base-theme/components";
import {withNavigation} from "react-navigation";
import {logout} from "../../actions/user";
import {connect} from "react-redux";


class Sidebar extends React.Component {

    doLogout = () =>{
        logout();
        this.props.navigation.navigate('Login');
    };

    doOrderFood= () =>{
        this.props.navigation.navigate("OrderFood")
    };

    doListTrx= () =>{
        this.props.navigation.navigate("ListTrx")
    };

    doOrderLaudry = () => {
        this.props.navigation.navigate("OrderLaundry")
    };

    // var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANS...';
    // <Image style={{width: 50, height: 50}} source={{uri: base64Icon}}/>

    render() {
        let fotoUSer = `data:image/png;base64,${this.props.userActive.sourcePhotoProfile}`;
        let foto = this.props.userActive.sourcePhotoProfile ? {uri :fotoUSer} : require('../../../assets/profile.png');
        return (
            <StyleProvider style={getTheme(Platform)}>
                <Container>
                    <Header transparent>
                        <Left>
                            <Icon type='AntDesign' style={{color: "black", fontSize:30}} name="home"/>
                        </Left>
                        <Body>
                            <Title style={styles.TextHeader}>Sweet Hotel</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content padder>
                        <Grid>
                            <Row style={{flex:1, justifyContent:"center"}}>
                                <Thumbnail small style={{ width: 150, height: 150, borderRadius:100 }}
                                           source={foto}
                                />
                            </Row>
                            <Text style={styles.TextUser}>{this.props.userActive.fullnameUser}</Text>
                            <Text style={styles.TextUsername}>{this.props.userActive.usernameUser}</Text>
                            <Row style={{flexDirection:"column", marginTop:20}}>
                                <Button full iconLeft transparent onPress={this.doOrderFood} >
                                    <Left>
                                        <Icon type="Entypo" name="bowl" style={{color:"black", fontSize:25, marginLeft:20}} />
                                    </Left>
                                    <Text style={styles.buttonSideText}>Order Food</Text>
                                    <Body/>
                                    <Right/>
                                </Button>
                                <Button full iconLeft transparent onPress={this.doOrderLaudry} >
                                    <Left>
                                        <Icon type="MaterialIcons" name="local-laundry-service" style={{color:"black", fontSize:25, marginLeft:20}} />
                                    </Left>
                                    <Text style={styles.buttonSideText}>Laundry</Text>
                                    <Body/>
                                    <Right/>
                                </Button>
                                <Button full iconLeft transparent onPress={this.doListTrx} >
                                    <Left>
                                        <Icon type="Entypo" name="shopping-cart" style={{color:"black", fontSize:25, marginLeft:20}} />
                                    </Left>
                                    <Text style={styles.buttonSideText}>My Transactions</Text>
                                    <Body/>
                                    <Right/>
                                </Button>
                                <Button full iconLeft transparent onPress={this.doLogout}>
                                    <Left>
                                        <Icon type="Feather" style={{color:"black", fontSize:25, marginLeft:20}} name='log-out'/>
                                    </Left>
                                    <Text style={styles.buttonSideText}>Logout</Text>
                                    <Body/>
                                    <Right/>
                                </Button>
                            </Row>
                        </Grid>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}
const styles = StyleSheet.create({
    buttonSideText: {
        fontFamily: 'Montserrat-Medium',
        fontSize:15,
        color: 'black',
    },
    TextHeader: {
        fontFamily: 'Montserrat-Medium',
        color: 'black',
        fontSize:18,
    },
    TextUser: {
        fontFamily: 'Montserrat-Medium',
        fontSize:20,
        textAlign:"center"
    },
    TextUsername:{
        fontFamily: 'Montserrat-Medium',
        fontSize:12,
        textAlign:"center"
    }
});
const mapStateToProps = (state) => {
    console.log(state);
    return { userActive: state.userActive };
};

const mapDispatchToProps = {
    logout: logout
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Sidebar));
