import React,{Component} from 'react';
import * as Permissions from 'expo-permissions';
import {Body, Button, Container, Header, Icon, Left, Text, View} from "native-base";
import {BarCodeScanner} from "expo-barcode-scanner";
import {ImageBackground, StyleSheet, Vibration} from 'react-native';
import {checkIn, checkOut, getListTrx} from "../api/room";
import {connect} from "react-redux";
import {getListTrxRoomAction} from "../actions/room";

class QRCheckInOut extends Component{

   state = {
      hasCameraPermission: null,
      scanned: false
   };

   doBack = () =>{
      this.props.navigation.navigate('ListTrx');
   };

   async componentDidMount() {
      this.getPermission();
   }

   handleCheckIn = async (noTrx) => {
      await checkIn(noTrx).then(res => {
        if (res.status === 200){
           alert('CheckIn Success');
           this.doBack();
        }
      }).catch(error => {
         alert('Check In Failed');
      });

      await getListTrx().then(res => {
         if (res.status === 200){
            this.props.setListTrxRoom(res.data);
         }
      })
   };

   handleCheckOut = async (noTrx) => {
      await checkOut(noTrx).then(res => {
         if (res.status === 200) {
            alert('CheckOut Success');
            this.doBack();
         }
      });
      await getListTrx().then(res => {
         if (res.status === 200){
            this.props.setListTrxRoom(res.data);
         }
      })
   };

   getPermission = async () => {
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({hasCameraPermission: status === 'granted'})
   };
   handleBarCodeScanned = async ({type, data}) => {
      Vibration.vibrate();
      this.setState({scanned: true});
      let noTrx = this.props.roomActive.noTrx;
      switch (data) {
         case 'checkin':
            this.handleCheckIn(noTrx);
            break;
         case 'checkout':
            this.handleCheckOut(noTrx);
            break;
         default:
            alert('QR Code is Wrong');
      }
   };

   render() {
      return(
          <Container>
             <ImageBackground source={require("../../assets/bg.png")} style={{width:"100%", height:"100%"}}>
                <Header transparent>
                   <Left>
                      <Button transparent onPress={this.doBack}>
                         <Icon type="Feather" name='arrow-left-circle' />
                      </Button>
                   </Left>
                   <Body>
                      <Text style={styles.textHeader}>Check-In And Check-Out</Text>
                   </Body>
                </Header>
                <BarCodeScanner
                    onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
                    style={styles.cameraView}
                />
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                   <Button rounded
                           onPress={() => this.setState({scanned: false})}>
                      <Text>Scan Again</Text>
                   </Button>
                </View>
             </ImageBackground>
          </Container>
      )
   }
}

const styles = StyleSheet.create({
   textHeader: {
      color: "white",
      fontFamily: 'Montserrat-Medium',
      fontSize: 15,
      textAlign: "center"
   },
   cameraView: {
      height: 500,
      width: "100%",
   }
});

const mapDispatchToProps = {
   setListTrxRoom: getListTrxRoomAction,
};

const mapStateToProps = (state) => {
   return {
      roomActive:state.roomActive,
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(QRCheckInOut);
