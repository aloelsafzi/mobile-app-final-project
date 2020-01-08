import React from 'react';
import socketIOClient from "socket.io-client";
import {
   Text,
   Card,
   View,
   Icon,
   Input,
   Container, Header, Content, Grid, Row, Col
} from "native-base";
import {StyleSheet, TouchableOpacity, ImageBackground, KeyboardAvoidingView, ScrollView,Alert} from "react-native";
import {connect} from "react-redux";

var socket;
class Chatting extends React.Component{

     state = {
         response: [],
         endpoint: "https://pascal-enigma.site:6900",
         message:"",
         bilik:"alpha"
      };

   componentDidMount() {
      this.doConnect();
   }

   doBack = () => {
      this.props.navigation.navigate('Home');
   };

   doConnect=()=>{
      const { endpoint } = this.state;
      socket = socketIOClient(endpoint);
      socket.on(this.state.bilik,this.doGetData);
   };

   componentWillUnmount() {
      socket.off(this.state.bilik);
   }
   doGetData = (msg)=>{
      this.setState({response:msg})
   };

   doSend = ()=>{
      if (! this.state.message){
         Alert.alert("Message Failed","please fill in your message ")
      } else {
         socket.emit(this.state.bilik, this.props.userActive.usernameUser+" : "+ this.state.message);
         this.setState({'message':''})
      }
   };

   doRenderMessage=()=>{
      return this.state.response.map((msg,index)=>{
        let a = RegExp(`${this.props.userActive.usernameUser} :`);
         if (a.test(msg)){
            return (
                <View key={index}>
                   <Row>
                      <Col size={1}>

                      </Col>
                      <Col size={4}>
                         <Card
                               style={{
                                  backgroundColor:'#f4eec7',
                                  borderRadius:20,
                                  paddingHorizontal: 10,
                                  paddingVertical:10
                               }}>
                            <Text style={styles.txtChat}>
                               {msg}
                            </Text>
                         </Card>
                      </Col>
                   </Row>
                </View>
            )
         } else {
            return (
                <View key={index}>
                   <Row>
                      <Col size={4}>
                         <Card
                               style={{
                                  backgroundColor:'#d2ebe9',
                                  borderRadius:20,
                                  paddingHorizontal: 10,
                                  paddingVertical:10
                               }}>
                            <Text style={styles.txtChat}>
                               {msg}
                            </Text>
                         </Card>
                      </Col>
                      <Col size={1}>
                      </Col>
                   </Row>
                </View>
            )
         }

      })
   };

   render(){
      return (
          <Container>
             <ImageBackground source={require("../../assets/bg_chat.jpg")} style={{width:"100%", height:"100%"}}>
                <Header transparent style={{height:120}}>
                   <Grid>
                      <Row>
                         <Col size={1}>
                            <TouchableOpacity onPress={this.doBack}>
                               <Icon style={{color:'white', fontSize:25,paddingTop:10}} type="Feather" name='arrow-left-circle' />
                            </TouchableOpacity>
                         </Col>
                         <Col size={4} style={{paddingTop:10}}>
                            <Text style={styles.txtHeader}>Customer Care</Text>
                         </Col>
                      </Row>
                      <Row>
                         <Col size={4}>
                            <Input
                                placeholder='Message'
                                value={this.state.message}
                                style={styles.composeText}
                                onChangeText={(text) => this.setState({message:text})}
                                editable = {true}
                                maxLength = {40}
                            />
                         </Col>
                        <Col size={1}>
                           <TouchableOpacity style={{
                              backgroundColor:'#007aff',
                              padding: 12,
                              borderRadius:10,
                              marginLeft:3
                           }} onPress={()=> this.doSend()}>
                              <Icon style={{color: 'white', fontSize:20, marginLeft:8}} type='FontAwesome' name='send'/>
                           </TouchableOpacity>
                        </Col>
                      </Row>
                   </Grid>
                </Header>
                <Content padder>
                   <KeyboardAvoidingView behavior="padding" enabled>
                      <ScrollView >
                           {this.doRenderMessage()}
                      </ScrollView>
                   </KeyboardAvoidingView>
                </Content>
             </ImageBackground>
          </Container>
      );
   }
}

const styles = StyleSheet.create({
   btnBook: {
      backgroundColor:'#5cb85c',
      borderRadius:10
   },
   txtHeader : {
      fontFamily: "Montserrat-Medium",
      color: 'white'
   },
   txtChat : {
      fontFamily: "Montserrat-Medium",
      fontSize:12
   },
   composeText: {
      width: '100%',
      paddingHorizontal: 10,
      height: 50,
      backgroundColor: 'white',
      borderColor: '#979797',
      borderStyle: 'solid',
      borderRadius: 10,
      borderWidth: 1,
   }
});

const mapStateToProps = (state) => {
   return {
      userActive: state.userActive,
   };
};

export default connect(mapStateToProps)(Chatting);
