import React, { Component } from 'react';
import {ImageBackground, StyleSheet, Image} from 'react-native';
import {Container, Header, Content, Icon, Grid, Row, Text, Button, Body, Right, Left, View, Card, Col} from 'native-base';
import FooterSegment from "./shared/FooterSegment";
import {connect} from "react-redux";


class Profile extends Component {

    doBack = () => {
        this.props.navigation.navigate('Home');
    };

    doEditProfile = () =>{
        this.props.navigation.navigate('EditProfile');
    };

    render() {
        let fotoUSer = `data:image/png;base64,${this.props.userActive.sourcePhotoProfile}`;
        let foto = this.props.userActive.sourcePhotoProfile ? {uri :fotoUSer} : require('../../assets/profile.png');
        return (
            <Container>
                <ImageBackground source={require("../../assets/bg.png")} style={{width:"100%", height:"100%"}}>
                    <Header transparent>
                        <Left>
                            <Button transparent onPress={this.doBack}>
                                <Icon type="Feather" name='arrow-left-circle' />
                            </Button>
                        </Left>
                        <Body>
                            <Text style={styles.textHeader}>Profile</Text>
                        </Body>
                        <Right />
                    </Header>
                    <Content padder>
                        <Grid>
                            <Row>
                                <View style={styles.lyImage}>
                                    <Image source={foto} style={styles.imgUser}/>
                                    <Text style={styles.textName}>{this.props.userActive.fullnameUser}</Text>
                                    <Text style={styles.textProfile}>{this.props.userActive.usernameUser}</Text>
                                </View>
                            </Row>
                            <Row style={{ marginTop:20, marginLeft:10}}>
                                <Button full rounded iconLeft primary onPress={this.doEditProfile}>
                                    <Icon type='Feather' name='edit' />
                                    <Text>Edit Profile</Text>
                                </Button>
                            </Row>
                            <Row style={{flexDirection:"column", marginTop:10}}>
                                <Card style={{borderRadius: 20, paddingHorizontal:10, paddingVertical:10}} >
                                    <Row style={{paddingVertical:5}}>
                                        <Col size={2}>
                                            <Text style={styles.textProfile}>Address </Text>
                                        </Col>
                                        <Col size={2}>
                                           <Text style={styles.textProfile}>{this.props.userActive.addressUser?this.props.userActive.addressUser:'-'}</Text>
                                        </Col>
                                    </Row>
                                    <Row  style={{paddingVertical:5}}>
                                        <Col size={2}>
                                            <Text style={styles.textProfile}>Phone Number </Text>
                                        </Col>
                                        <Col size={2}>
                                            <Text style={styles.textProfile}>{this.props.userActive.noPhoneUser?this.props.userActive.noPhoneUser:'-'}</Text>
                                        </Col>
                                    </Row>
                                    <Row  style={{paddingVertical:5}}>
                                        <Col size={2}>
                                            <Text style={styles.textProfile}>Email </Text>
                                        </Col>
                                        <Col size={2}>
                                            <Text style={styles.textProfile}>{this.props.userActive.emailUser}</Text>
                                        </Col>
                                    </Row>
                                    <Row  style={{paddingVertical:5}}>
                                        <Col size={2}>
                                            <Text style={styles.textProfile}>Gender </Text>
                                        </Col>
                                        <Col size={2}>
                                            <Text style={styles.textProfile}>
                                                {this.props.userActive.genderId === 1?'Male':null}
                                                {this.props.userActive.genderId === 2?'Female':null}
                                                {!this.props.userActive.genderId?'-':null}
                                            </Text>
                                        </Col>
                                    </Row>
                                </Card>
                            </Row>
                        </Grid>
                    </Content>
                    <FooterSegment/>
                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    lyImage:{
        flex:1,
      alignItems:"center"
    },
    textHeader: {
        color: "white",
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        textAlign: "center"
    },
    imgUser:{
        width:150,
        height:150,
        borderRadius:100,
        alignSelf:"center"
    },
    textName :{
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
    },
    textProfile :{
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    }
});
const mapStateToProps = (state) => {
    return { userActive: state.userActive };
};
export default connect(mapStateToProps)(Profile);
