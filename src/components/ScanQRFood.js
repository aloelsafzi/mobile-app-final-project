import React,{Component} from 'react';
import * as Permissions from 'expo-permissions';
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, View} from "native-base";
import {BarCodeScanner} from "expo-barcode-scanner";
import {ImageBackground, StyleSheet, TouchableOpacity, Vibration} from 'react-native';

class ScanQRFood extends Component{

   state = {
      hasCameraPermission: null,
      scanned: false
   };

   doBack = () =>{
      this.props.navigation.navigate('OrderFood');
   };

   async componentDidMount() {
      this.getPermission();
   }

   getPermission = async () => {
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({hasCameraPermission: status === 'granted'})
   };
   handleBarCodeScanned = ({type, data}) => {
      Vibration.vibrate();
      this.setState({scanned: true});
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
   };

   render() {
      return(
       <Container>
          <ImageBackground source={require("../../assets/bg.png")} style={{width:"100%", height:"100%"}}>
          <Header transparent>
             <Left>
                <TouchableOpacity onPress={this.doBack}>
                   <Icon style={{color:'white', fontSize:25}} type="Feather" name='arrow-left-circle' />
                </TouchableOpacity>
             </Left>
             <Body>
                <Text style={styles.textHeader}>Scan QR Food</Text>
             </Body>
             <Right />
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

export default ScanQRFood;