import React, { Component } from 'react';
import {BackHandler, ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Alert, Image} from 'react-native';
import { authUser } from '../actions/user';
import {doAuth} from  '../api/user';
import { connect } from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, View, Icon, Grid, Col, Row, Text, Button, Thumbnail } from 'native-base';
import * as Font from "expo-font/build/Font";
import * as SecureStore from 'expo-secure-store';



class Login extends Component {
   state = { username: '', password: '', loading: false };

   async UNSAFE_componentWillMount() {
      this.setState({loading: true});
      await Font.loadAsync({
         'Roboto_medium': require("../../node_modules/native-base/Fonts/Roboto_medium.ttf"),
         'Montserrat-Thin': require("../../assets/fonts/Montserrat-Thin.ttf"),
         'Montserrat-Medium': require("../../assets/fonts/Montserrat-Medium.ttf"),
         'Montserrat-Bold': require("../../assets/fonts/Montserrat-Bold.ttf")
      }).finally(()=>{
         this.setState({loading: false});
      });

      BackHandler.addEventListener('hardwareBackPress', this.backPressed);
   }

   componentDidMount() {
      BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
   }

   backPressed = () => {
      Alert.alert('Exit App', 'Do you want to exit?', [
         {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
         {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ], {cancelable: false});
      return true;
   };

   doLogin = async () => {
      const {username,password} = this.state;
      const user = {
         username : username,
         password : password
      };
      if (!(username && password)){
         Alert.alert("Login Failed","Fill in all input forms !");
      } else {
         this.setState({loading: true});
         await doAuth(user).then((res)=>{
            if (res.status === 200){
               SecureStore.setItemAsync('alphaKey', res.data.token);
               this.props.authUser(res.data);
               this.setState({loading: false,username:'',password:''});
               this.props.navigation.navigate('Home');
            }
         }).catch(err =>{
            Alert.alert("Login Failed","Username and Password is wrong or Server Error !");
            this.props.navigation.navigate('Login');

         }).finally(()=>{
            this.setState({loading: false});
         });
      }
   };

   doSignUp = () => {
      this.props.navigation.navigate('SignUp');
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
                   <Header transparent style={{marginTop: 5}}>
                      <Text style={styles.textHeader}>Sweet Hotel</Text>
                   </Header>
                   <Content style={{ backgroundColor: "" }}>
                      <KeyboardAvoidingView behavior={"height"} enabled>
                         <ScrollView>
                            <Grid>
                               <Row style={styles.layoutForm}>
                                  <Thumbnail style={{ alignSelf: "center", width: "80%", height: "30%" }} source={require("../../assets/logo.png")} />
                                  <Text style={styles.textJudul}>Sign in User</Text>
                                  <Form>
                                     <Item floatingLabel>
                                        <Label style={styles.textLabel}>Username</Label>
                                        <Icon type='AntDesign' name='user' style={{ fontSize: 20 }} />
                                        <Input onChangeText={(username) => { this.setState({ username: username }) }} maxLength={10} />
                                     </Item>
                                     <Item floatingLabel>
                                        <Label style={styles.textLabel}>Password</Label>
                                        <Icon type='AntDesign' name='lock' style={{ fontSize: 20 }} />
                                        <Input secureTextEntry onChangeText={(password) => { this.setState({ password: password }) }} maxLength={8}/>
                                     </Item>
                                     <Row style={{ height: 300 }}>
                                        <Col style={{ margin: 4 }}>
                                           <Button style={styles.buttonLogin} full rounded iconLeft light onPress={this.doLogin}>
                                              <Icon type='AntDesign' name='login' />
                                              <Text style={styles.buttonTxt}>Sign in</Text>
                                           </Button>
                                        </Col>
                                        <Col style={{ margin: 4 }}>
                                           <Button style={styles.buttonLogin} full rounded iconLeft primary onPress={this.doSignUp}>
                                              <Icon type='AntDesign' name='adduser' />
                                              <Text style={styles.buttonTxt}>Sign Up</Text>
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
      fontSize: 30

   }
});


const mapDispatchToProps = {
   authUser: authUser
};

export default connect(null, mapDispatchToProps)(Login);