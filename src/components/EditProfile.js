import React, { Component } from 'react';
import {
    ImageBackground,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    Image,
    TouchableOpacity
} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Icon, Grid, Col, Row, Text, Button, Body, Right, Left, Picker,View } from 'native-base';
import {connect} from "react-redux";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {editProfile, getUserById} from "../api/user";
import {authUser} from "../actions/user";




class EditProfile extends Component {
    state = { fullname: '', address:'', email:'', phone:'',iduser:null, genderUser:'',image:null };

    doBack = () => {
        this.props.navigation.navigate('Profile');
    };

    async componentDidMount() {
       this.getPermissionAsync();
        let {addressUser,emailUser,fullnameUser,gender,idUserDetail,noPhoneUser} = this.props.userActive;
        this.setState({fullname:fullnameUser , address:addressUser, email:emailUser, phone:noPhoneUser,iduser:idUserDetail, genderUser:(gender?gender.codeGender:'S')});
    }

    getPermissionAsync = async () => {
        if (Constants.platform.android) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3 ],
            quality: 0.1,
            maxWidth:40,
            maxHeight:40
        });

        if (!result.cancelled) {
            this.setState({ image: result});
        }
    };


    doSave = async () => {
        const {fullname, address, phone,iduser , genderUser ,image} = this.state;
        let FormData = require('form-data');
        let formData = new FormData();
        if (image){
            formData.append("photo",{
                uri: image.uri,
                name: 'profile.jpg',
                type: 'image/jpg'
            });
        }
        formData.append('addressUser',address);
        formData.append('noPhoneUser',phone);
        formData.append('genderId',genderUser);
        formData.append('idUserDetail',iduser);
        formData.append('fullnameUser',fullname);
        await editProfile(formData).then((res) =>{
            if (res.status === 200){
                Alert.alert("Edit Profile","Successfully");
            }
        }).catch(err =>{
            Alert.alert("Edit Profile","Failed");
        });
        await getUserById(iduser).then(res => {
            if (res.status === 200){
                this.props.authUser(res.data);
                this.doBack();
            }
        }).catch(err => {
            console.log("Soory Server Erorr");
        });

    };

    render() {
        let {address,fullname,genderUser,phone, image} = this.state;
        let foto = this.state.image ? {uri :image.uri} : require('../../assets/edit-profile.png');
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
                            <Text style={styles.textHeader}>Edit Profile</Text>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <KeyboardAvoidingView behavior={"height"} enabled>
                            <ScrollView>
                                <Grid>
                                    <Row style={styles.layoutForm} size={3}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={foto} style={{ width: 200, height: 200, borderRadius:this.state.image ? 100:20 }} />
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                            <Button
                                                onPress={this._pickImage}
                                                transparent
                                            >
                                                <Icon iconleft type="Feather" name="camera"/>
                                                <Text style={styles.buttonTxt}>Upload Photo</Text>
                                            </Button>
                                        </View>
                                        <Form>
                                            <Item floatingLabel>
                                                <Label style={styles.textLabel}>Fullname</Label>
                                                <Icon type='AntDesign' name='user' style={{ fontSize: 20 }} />
                                                <Input value={fullname} onChangeText={(name) => { this.setState({ fullname: name }) }} />
                                            </Item>
                                            <Item floatingLabel>
                                                <Label style={styles.textLabel}>Phone Number</Label>
                                                <Icon type='Feather' name='smartphone' style={{ fontSize: 20 }} />
                                                <Input keyboardType="phone-pad" value={phone} onChangeText={(phone) => { this.setState({ phone: phone }) }} />
                                            </Item>
                                            <Item picker style={{marginLeft:15}}>
                                                <Picker
                                                    mode="dropdown"
                                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                    selectedValue={genderUser}
                                                    onValueChange={(itemValue, itemIndex) =>
                                                        this.setState({genderUser: itemValue})
                                                    }>
                                                    <Picker.Item label="Select Gender" value="S" />
                                                    <Picker.Item label="Male" value="M" />
                                                    <Picker.Item label="Female" value="F" />
                                                    <Picker.Item label="Other" value="O" />
                                                </Picker>
                                            </Item>
                                            <Item floatingLabel>
                                                <Label style={styles.textLabel}>Address</Label>
                                                <Icon type='Feather' name='home' style={{ fontSize: 20}} />
                                                <Input
                                                    multiline={true}
                                                    numberOfLines={4}
                                                    onChangeText={(address) => { this.setState({ address: address }) }}
                                                    value={address}/>
                                            </Item>
                                            <Row>
                                                <Col style={{ margin: 4 }}>
                                                    <Button style={styles.buttonLogin} full rounded iconLeft primary onPress={this.doSave} >
                                                        <Icon type='Feather' name='check-square'/>
                                                        <Text style={styles.buttonTxt}>Save</Text>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Row>
                                </Grid>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    textJudul: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        textAlign: "center"
    },
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

    buttonLogin: {
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

export default connect(mapStateToProps,mapDispatchToProps)(EditProfile);