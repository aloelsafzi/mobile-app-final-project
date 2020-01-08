import React, { Component } from 'react';
import {ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Alert, TouchableOpacity} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Icon, Grid, Col, Row, Text, Button, Thumbnail, Body, Right, Left } from 'native-base';
import {createNewUser} from "../api/user";


class SignUp extends Component {
   state = { username: '', password: '', email:'',fullname:'',confirmPass:'' };

   doBack = () => {
      this.props.navigation.navigate('Login');
   };

   validateEmail = () => {
      const email = this.state.email;
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
      if(reg.test(email) === false)
      {
         Alert.alert("Incorrect input","Input email correctly, \"ex: aloel@gmail.com\"");
         return false;
      }
      else {
         return true;
      }
   };


   doSignUp = async () => {
      const {username,password,email,fullname,confirmPass} = this.state;
      const newUser = {
         username: username,
         password: password,
         email: email,
         fullname: fullname
      };
      if (!(username && password && fullname && confirmPass && email)){
         Alert.alert("Sign Up Failed", "fill out the form correctly, must fill in user name, password, confirm password and full name" );
      } else{
         const valid = this.validateEmail();
         if (valid){
            if (password === confirmPass){
               await createNewUser(newUser).then(res => {
                  if (res.status === 200){
                     Alert.alert("Sign Up Successfully", "now you can enter the application, enjoy gaes" );
                     this.props.navigation.navigate('Login');
                  }
               }).catch(err => {
                  console.log(err);
                  Alert.alert("Sign Up Failed", "fill out the form correctly, Or Server Error !" );
               })
            }else {
               Alert.alert("Sign Up Failed", "fill out the form correctly in password and confirm password" );
            }
         }
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
                     <Text style={styles.textHeader}>Sweet Hotel</Text>
                  </Body>
                  <Right />
               </Header>
               <Content>
                  <KeyboardAvoidingView behavior={"height"} enabled>
                     <ScrollView>
                        <Grid>
                           <Row style={styles.layoutForm} size={3}>
                              <Thumbnail style={{ alignSelf: "center", width: 200, height: 120 }}  source={require("../../assets/create_account.png")} />
                              <Text style={styles.textJudul}>Create Account</Text>
                              <Form>
                                 <Item floatingLabel>
                                    <Label style={styles.textLabel}>Fullname</Label>
                                    <Icon type='AntDesign' name='user' style={{ fontSize: 20 }} />
                                    <Input maxLength={25} onChangeText={(name) => { this.setState({fullname : name }) }} />
                                 </Item>
                                 <Item floatingLabel>
                                    <Label style={styles.textLabel}>Username</Label>
                                    <Icon type='AntDesign' name='user' style={{ fontSize: 20 }} />
                                    <Input maxLength={10} onChangeText={(username) => { this.setState({ username: username }) }} />
                                 </Item>
                                 <Item floatingLabel>
                                    <Label style={styles.textLabel}>Password</Label>
                                    <Icon type='AntDesign' name='lock' style={{ fontSize: 20 }} />
                                    <Input maxLength={8} secureTextEntry onChangeText={(password) => { this.setState({ password: password }) }} />
                                 </Item>
                                 <Item floatingLabel>
                                    <Label style={styles.textLabel}>Confirm password</Label>
                                    <Icon type='AntDesign' name='lock' style={{ fontSize: 20 }} />
                                    <Input maxLength={8} secureTextEntry onChangeText={(password) => { this.setState({ confirmPass: password }) }} />
                                 </Item>
                                 <Item floatingLabel>
                                    <Label style={styles.textLabel}>Email</Label>
                                    <Icon type='AntDesign' name='mail' style={{ fontSize: 20 }} />
                                    <Input maxLength={40} onChangeText={(email) => { this.setState({ email: email }) }} />
                                 </Item>
                                 <Row>
                                    <Col style={{ margin: 4 }}>
                                       <Button style={styles.buttonLogin} full rounded iconLeft primary onPress={this.doSignUp} >
                                          <Icon type='AntDesign' name='like2' />
                                          <Text style={styles.buttonTxt}>Register Now</Text>
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
export default SignUp;