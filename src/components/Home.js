import React from "react";
import {StyleSheet, Image, TouchableOpacity} from "react-native";
import NumberFormat from 'react-number-format';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import ContainerTop from "./shared/ContainerTop";
import CardSilder from 'react-native-cards-slider';
import { connect } from "react-redux";
import {
   Row,
   Grid,
   Text,
   Card,
   CardItem,
   StyleProvider,
   Col,
   Icon,
   Left,
   Body,
   Right,
   Thumbnail,
   View,
   Item,
   Label,
   Input,
   Form, Picker,
} from "native-base";
import {getListRoom, getListTrx, searchRoom} from "../api/room";
import {roomSelected, getListRoomAction, getListTrxRoomAction, roomActiveAction} from "../actions/room";
import {getListPromo} from "../api/promo";
class HomeScreen extends React.Component {
   state = {searchRoom: '' , VVIPRoom:false, VIPRoom:false,
      RegulerRoom:false,AllType:true,loading: false,
      listPromo : [], typeSearch:'', isBreakfast:'',
      from:0, to:0,
      listRoomWherePrice:[], isViewDataSearch:false
   };

   async componentDidMount() {
      this.getDataListRoom();
      this.doRenderListTrx();
      this.getListPromo();
   }

   getListPromo = async () => {
      this.setState({loading:true});
      try {
         await getListPromo().then((res) => {
            if (res.status === 200){
               this.setState({listPromo : res.data})
            }
         }).catch(()=> {

         }).finally(() =>{
            this.setState({loading:false});
         })
      }catch (e) {
         this.setState({loading:false});
      }
   };

   doSearch = async () => {
      let {typeSearch,from,to} = this.state;
      this.setState({loading:true});
      await searchRoom(typeSearch,from,to).then(res => {
         if (res.status === 200){
            this.setState({
               listRoomWherePrice:res.data, isViewDataSearch:true,
               VVIPRoom:false, VIPRoom:false,RegulerRoom:false, AllType:false
            })
         }
      }).catch(()=>{
         alert('data not found');
      }).finally(()=>{
         this.setState({
           from: 0,to: 0, typeSearch: ''
         });
         this.setState({loading:false});
      })
   };

   getDataListRoom = async () => {
      this.setState({loading:true});
      await getListRoom().then((res) => {
         if (res.status === 200) {
            this.props.setListRoom(res.data);
         }
      }).finally(() => {
         this.setState({loading:false});
      });
   };



   doRenderListPromo = () => {
      let data = this.state.listPromo;
        if (data) {
          return  data.map((pro) => {
             let fotoPromo;
             let foto;
             let lastFoto = pro.images.sort((a,b)=>(b.idPromoImage - a.idPromoImage));
             try {
                fotoPromo = `data:image/png;base64,${lastFoto[0].sourceImage}`;
                foto = lastFoto[0].idPromoImage ? {uri :fotoPromo} : require('../../assets/promo-15.jpg');
             }catch (e) {
                foto = lastFoto[0].idPromoImage ? {uri :fotoPromo} : require('../../assets/promo-15.jpg');
             }
            return(
                <Image style={{height: 150, width:'100%', borderRadius:20}} source={foto} />
            );
           })
        }
   };

   doRenderListTrx = async () => {
      this.setState({loading:true});
      await getListTrx().then(res => {
         if (res.status === 200){
            this.props.setListTrxRoom(res.data);
            let data = this.props.listTrxRoom;
            let {idUserDetail} = this.props.userActive;
            if (data.length > 0) {
               let listTrxById = data.filter(trx => trx.userDetailId === idUserDetail);
               listTrxById.map(list => {
                  let dataSort = list.detail.sort((a,b)=>(b.idDetail - a.idDetail));
                  let chekRoom = dataSort[0].statusTrx;
                  if ( chekRoom === 4 || chekRoom === 1  ){
                     this.props.roomActiveAct(list);
                  }
               });
            }
         }
      }).finally(() => {
         this.setState({loading:false});
      })
   };

   doBooking = (room) => {
      this.props.navigation.navigate('BookingRoom');
      this.props.roomSelected(room);
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
         case "capacity":
            return (
                <Card style={{paddingHorizontal:10, paddingVertical:5, borderRadius: 10}}>
                   <Form>
                      <Row>
                         <Col size={3}>
                            <Item>
                               <Input keyboardType="number-pad" placeholder={'from : ex 1'} onChangeText={(search) => { this.setState({ from: search }) }} />
                            </Item>
                            <Item>
                               <Input keyboardType="number-pad" placeholder={'to : ex 4'} onChangeText={(search) => { this.setState({ to: search }) }} />
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

   doViewDataFromSearch = () => {
      let data = this.state.listRoomWherePrice;
      if (data.length > 0){
         let dataByType = data.filter((data)=>data.status.idStatus === 1);
         return dataByType.map((room)=> {
            let fotoRoom;
            let foto;
            try {
               let lstIdxRoom = room.images.length - 1;
               fotoRoom = `data:image/png;base64,${room.images[lstIdxRoom].sourceImage}`;
               foto = room.images.length > 0 ? {uri :fotoRoom} : require('../../assets/room.jpg');
            }catch (e) {
               foto = room.images.length > 0 ? {uri :fotoRoom} : require('../../assets/room.jpg');
            }
            return (
                <View key={`${room.idRoom}`}>
                   <Card>
                      <CardItem>
                         <Left>
                            <Thumbnail source={require("../../assets/hotel-icon.png")} />
                            <Body>
                               <Text style={styles.textCard}>{room.roomCode}</Text>
                               <Text note style={{ fontFamily: "Montserrat-Medium", fontSize: 10 }}>{room.type.typeName}</Text>
                            </Body>
                         </Left>
                         <Right>
                            <Text style={styles.textCard}>
                               {room.type.breakfast ? 'With Breakfast ': 'Not Breakfast'}
                            </Text>
                         </Right>
                      </CardItem>
                      <CardItem cardBody>
                         <Image source={foto} style={{ height: 200, width: null, flex: 1 }} />
                      </CardItem>
                      <CardItem>
                         <Left>
                            <Icon type="EvilIcons" name="tag" />
                            <Text style={styles.textCardItem}>{room.status.statusName}</Text>
                         </Left>
                         <Body>
                            <TouchableOpacity
                                style={styles.btnBook}
                                onPress={() => this.doBooking(room)}>
                               <Text style={styles.txtBtn}>Booking</Text>
                            </TouchableOpacity>
                         </Body>
                         <Right>
                            <View>
                               <NumberFormat
                                   value={room.type.roomCost}
                                   displayType={'text'}
                                   thousandSeparator={true}
                                   prefix={'Rp.'} renderText={value => <Text style={styles.textCardChild}>{value}</Text>} />
                            </View>
                         </Right>
                      </CardItem>
                      <CardItem>
                         <Row>
                            <Col size={1}>
                               <Text style={styles.textdetail}>Detail : </Text>
                            </Col>
                            <Col size={4}>
                               <Text style={styles.textdetail}>{room.type.detail}</Text>
                            </Col>
                         </Row>
                      </CardItem>
                   </Card>
                </View>
            )
         })
      }
   };

   doFilterVVIPRoom = () => {
      this.setState({VVIPRoom:true, VIPRoom:false,RegulerRoom:false, AllType:false })
   };

   doFilterVIPRoom = () => {
      this.setState({VVIPRoom:false, VIPRoom:true,RegulerRoom:false, AllType:false})
   };

   doFilterRegRoom = () => {
      this.setState({VVIPRoom:false, VIPRoom:false,RegulerRoom:true, AllType:false})
   };

   doAllType = () => {
      this.setState({VVIPRoom:false, VIPRoom:false,RegulerRoom:false, AllType:true, loading: false})
   };

   // do render filter room vvip
   filterByTypeRoomVVIP = () => {
      let data = this.props.listRoom;
      if (data){
         let dataByType = data.filter((data)=>data.type.idTypeRoom === 1);
        return dataByType.map((room)=> {
           let fotoRoom;
           let foto;
           try {
              let lstIdxRoom = room.images.length - 1;
              fotoRoom = `data:image/png;base64,${room.images[lstIdxRoom].sourceImage}`;
              foto = room.images.length > 0 ? {uri :fotoRoom} : require('../../assets/room.jpg');
           }catch (e) {
              foto = room.images.length > 0 ? {uri :fotoRoom} : require('../../assets/room.jpg');
           }
              return (
                  <View key={`${room.idRoom}`}>
                     <Card>
                        <CardItem>
                           <Left>
                              <Thumbnail source={require("../../assets/hotel-icon.png")} />
                              <Body>
                                 <Text style={styles.textCard}>{room.roomCode}</Text>
                                 <Text note style={{ fontFamily: "Montserrat-Medium", fontSize: 10 }}>{room.type.typeName}</Text>
                              </Body>
                           </Left>
                           <Right>
                              <Text style={styles.textCard}>
                                 {room.type.breakfast ? 'With Breakfast ': 'Not Breakfast'}
                              </Text>
                           </Right>
                        </CardItem>
                        <CardItem cardBody>
                           <Image source={foto} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                           <Left>
                              <Icon type="EvilIcons" name="tag" />
                              <Text style={styles.textCardItem}>{room.status.statusName}</Text>
                           </Left>
                           <Body>
                              <TouchableOpacity
                                  style={styles.btnBook}
                                  onPress={() => this.doBooking(room)}>
                                 <Text style={styles.txtBtn}>Booking</Text>
                              </TouchableOpacity>
                           </Body>
                           <Right>
                              <View>
                                 <NumberFormat
                                     value={room.type.roomCost}
                                     displayType={'text'}
                                     thousandSeparator={true}
                                     prefix={'Rp.'} renderText={value => <Text style={styles.textCardChild}>{value}</Text>} />
                              </View>
                           </Right>
                        </CardItem>
                        <CardItem>
                           <Row>
                              <Col size={1}>
                                 <Text style={styles.textdetail}>Detail : </Text>
                              </Col>
                              <Col size={4}>
                                 <Text style={styles.textdetail}>{room.type.detail}</Text>
                              </Col>
                           </Row>
                        </CardItem>
                     </Card>
                  </View>
              )
         })
      }
   };

   // do render filter room vip
   filterByTypeRoomVIP = () => {
      let data = this.props.listRoom;
      if (data){
         let dataByType = data.filter((data)=>data.type.idTypeRoom === 2);
         return dataByType.map((room)=> {
            let fotoRoom;
            let foto;
            try {
               let lstIdxRoom = room.images.length - 1;
               fotoRoom = `data:image/png;base64,${room.images[lstIdxRoom].sourceImage}`;
               foto = room.images.length > 0 ? {uri :fotoRoom} : require('../../assets/room.jpg');
            }catch (e) {
               foto = room.images.length > 0 ? {uri :fotoRoom} : require('../../assets/room.jpg');
            }
            return (
                <View>
                   <Card key={`${room.idRoom}`}>
                      <CardItem>
                         <Left>
                            <Thumbnail source={require("../../assets/hotel-icon.png")} />
                            <Body>
                               <Text style={styles.textCard}>{room.roomCode}</Text>
                               <Text note style={{ fontFamily: "Montserrat-Medium", fontSize: 10 }}>{room.type.typeName}</Text>
                            </Body>
                         </Left>
                         <Right>
                            <Text style={styles.textCard}>
                               {room.type.breakfast ? 'With Breakfast ': 'Not Breakfast'}
                            </Text>
                         </Right>
                      </CardItem>
                      <CardItem cardBody>
                         <Image source={foto} style={{ height: 200, width: null, flex: 1 }} />
                      </CardItem>
                      <CardItem>
                         <Left>
                            <Icon type="EvilIcons" name="tag" />
                            <Text style={styles.textCardItem}>{room.status.statusName}</Text>
                         </Left>
                         <Body>
                            <TouchableOpacity
                                style={styles.btnBook}
                                onPress={() => this.doBooking(room)}>
                               <Text style={styles.txtBtn}>Booking</Text>
                            </TouchableOpacity>
                         </Body>
                         <Right>
                            <View>
                               <NumberFormat
                                   value={room.type.roomCost}
                                   displayType={'text'}
                                   thousandSeparator={true}
                                   prefix={'Rp.'} renderText={value => <Text style={styles.textCardChild}>{value}</Text>} />
                            </View>
                         </Right>
                      </CardItem>
                      <CardItem>
                         <Row>
                            <Col size={1}>
                               <Text style={styles.textdetail}>Detail : </Text>
                            </Col>
                            <Col size={4}>
                               <Text style={styles.textdetail}>{room.type.detail}</Text>
                            </Col>
                         </Row>
                      </CardItem>
                   </Card>
                </View>
            )
         })
      }
   };

   // do render filter room reg
   filterByTypeRoomReg = () => {
      let data = this.props.listRoom;
      if (data){
         let dataByType = data.filter((data)=>data.type.idTypeRoom === 3);
         return dataByType.map((room)=> {
            let fotoRoom;
            let foto;
            try {
               let lstIdxRoom = room.images.length - 1;
               fotoRoom = `data:image/png;base64,${room.images[lstIdxRoom].sourceImage}`;
               foto = room.images.length > 0 ? {uri :fotoRoom} : require('../../assets/room.jpg');
            }catch (e) {
               foto = room.images.length > 0 ? {uri :fotoRoom} : require('../../assets/room.jpg');
            }
            return (
                <View>
                   <Card key={`${room.idRoom}`}>
                      <CardItem>
                         <Left>
                            <Thumbnail source={require("../../assets/hotel-icon.png")} />
                            <Body>
                               <Text style={styles.textCard}>{room.roomCode}</Text>
                               <Text note style={{ fontFamily: "Montserrat-Medium", fontSize: 10 }}>{room.type.typeName}</Text>
                            </Body>
                         </Left>
                         <Right>
                            <Text style={styles.textCard}>
                               {room.type.breakfast ? 'With Breakfast ': 'Not Breakfast'}
                            </Text>
                         </Right>
                      </CardItem>
                      <CardItem cardBody>
                         <Image source={foto} style={{ height: 200, width: null, flex: 1 }} />
                      </CardItem>
                      <CardItem>
                         <Left>
                            <Icon type="EvilIcons" name="tag" />
                            <Text style={styles.textCardItem}>{room.status.statusName}</Text>
                         </Left>
                         <Body>
                            <TouchableOpacity
                                style={styles.btnBook}
                                onPress={() => this.doBooking(room)}>
                               <Text style={styles.txtBtn}>Booking</Text>
                            </TouchableOpacity>
                         </Body>
                         <Right>
                            <View>
                               <NumberFormat
                                   value={room.type.roomCost}
                                   displayType={'text'}
                                   thousandSeparator={true}
                                   prefix={'Rp.'} renderText={value => <Text style={styles.textCardChild}>{value}</Text>}/>
                            </View>
                         </Right>
                      </CardItem>
                      <CardItem>
                         <Row>
                            <Col size={1}>
                               <Text style={styles.textdetail}>Detail : </Text>
                            </Col>
                            <Col size={4}>
                               <Text style={styles.textdetail}>{room.type.detail}</Text>
                            </Col>
                         </Row>
                      </CardItem>
                   </Card>
                </View>
            )
         })
      }
   };


   listCardRoom = () => {
      let data = this.props.listRoom;
      if (data.length > 0) {
         return data.map((room) => {
            let foto;
            let fotoRoom;
            try {
               let lstIdxRoom = room.images.length - 1;
               fotoRoom = `data:image/png;base64,${room.images[lstIdxRoom].sourceImage}`;
               foto = room.images.length > 0 ? {uri :fotoRoom} : require('../../assets/room.jpg');
            }catch (e) {
               foto = room.images.length > 0 ? {uri :fotoRoom} : require('../../assets/room.jpg');
            }
            return (
               <View>
                  <Card key={`${room.idRoom}`}>
                     <CardItem>
                        <Left>
                           <Thumbnail source={require("../../assets/hotel-icon.png")} />
                           <Body>
                              <Text style={styles.textCard}>{room.roomCode}</Text>
                              <Text note style={{ fontFamily: "Montserrat-Medium", fontSize: 10 }}>{room.type.typeName}</Text>
                           </Body>
                        </Left>
                        <Right>
                           <Text style={styles.textCard}>
                              {room.type.breakfast ? 'With Breakfast ': 'Not Breakfast'}
                           </Text>
                        </Right>
                     </CardItem>
                     <CardItem cardBody>
                        <Image source={foto} style={{ height: 200, width: null, flex: 1 }} />
                     </CardItem>
                     <CardItem>
                        <Left>
                           <Icon type="EvilIcons" name="tag" />
                           <Text style={styles.textCardItem}>{room.status.statusName}</Text>
                        </Left>
                        <Body>
                           <TouchableOpacity
                               style={styles.btnBook}
                               onPress={() => this.doBooking(room)}>
                              <Text style={styles.txtBtn}>Booking</Text>
                           </TouchableOpacity>
                        </Body>
                        <Right>
                           <View>
                              <NumberFormat
                                  value={room.type.roomCost}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'Rp.'} renderText={value => <Text style={styles.textCardChild}>{value}</Text>}/>
                           </View>
                        </Right>
                     </CardItem>
                     <CardItem>
                        <Row>
                           <Col size={1}>
                              <Text style={styles.textdetail}>Detail : </Text>
                           </Col>
                           <Col size={4}>
                              <Text style={styles.textdetail}>{room.type.detail}</Text>
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
      let {VVIPRoom, VIPRoom, RegulerRoom, AllType, isViewDataSearch} = this.state;
      if (this.state.loading) {
         return (
             <View style={{flex:1,flexDirection:'column', alignItems:'center', justifyContent:"center"}}>
                <View style={{borderRadius: 50}}>
                   <Image style={{height:150, width:150}} source={require("../../assets/loading.gif")}/>
                </View>
             </View>);
      }
      return (
         <StyleProvider style={getTheme(platform)}>
            <ContainerTop>
               <Grid>
                  <Row>
                     <Col>
                        <Card style={{borderRadius:20}}>
                           <Grid>
                              <Row style={{justifyContent:"center",padding:20}} >
                                 <Left>
                                    <Icon iconleft type="FontAwesome" name="money" />
                                 </Left>
                                    <Text style={styles.textCard}> Balance </Text>
                              </Row>
                              <Row style={{justifyContent:"center",paddingBottom:20,paddingTop:0}}>
                                 <View>
                                    <NumberFormat
                                        value={this.props.userActive.saldoUser?this.props.userActive.saldoUser:0}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'Rp.'} renderText={value =>
                                        <Text style={styles.textCardChild}>{value}</Text>
                                        } />
                                 </View>
                              </Row>
                           </Grid>
                        </Card>
                     </Col>
                     <Col>
                        <Card style={{borderRadius:20}}>
                           <Grid>
                              <Row style={{justifyContent:"center",padding:20}} >
                                 <Left>
                                    <Icon iconleft type="FontAwesome" name="user" />
                                 </Left>
                                    <Text style={styles.textCard}>Welcome</Text>
                              </Row>
                              <Row style={{justifyContent:"center",paddingBottom:20,paddingTop:0}}>
                                 <Text style={styles.textCardChild}>{this.props.userActive.fullnameUser}</Text>
                              </Row>
                           </Grid>
                        </Card>
                     </Col>
                  </Row>
                  <Row style={{marginTop:20}}>
                     <TouchableOpacity>
                        <CardSilder autoplay interval={2000}>
                           {this.doRenderListPromo()}
                        </CardSilder>
                     </TouchableOpacity>
                  </Row>
                  <Row style={{ flexDirection: "column", marginTop: 20}}>
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
                                       <Picker.Item label="Capacity" value="capacity" />
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
                  <Row style={{ flexDirection: 'column', marginTop: 20, justifyContent:'center' }}>
                     <Card style={{paddingHorizontal:10, paddingVertical:5, borderRadius: 10}}>
                        <Row style={{ flexDirection: 'row', justifyContent:'center',paddingVertical:5 }}>
                           <TouchableOpacity
                               style={{
                                  borderRadius: 10,
                                  paddingVertical:10,
                                  paddingHorizontal:10,
                                  backgroundColor: '#4d80e4',
                               }}
                               onPress={()=> this.doAllType()}>
                              <Text style={styles.textListRoom}>All Type</Text>
                           </TouchableOpacity>
                           <TouchableOpacity  style={{
                              borderRadius: 10,
                              marginLeft:2,
                              paddingVertical:10,
                              paddingHorizontal:10,
                              backgroundColor: '#2e279d',
                           }}  onPress={()=> this.doFilterVVIPRoom()}>
                              <Text style={styles.textListRoom}>Presidental</Text>
                           </TouchableOpacity>
                           <TouchableOpacity  style={{
                              borderRadius: 10,
                              backgroundColor: '#46b3e6',
                              marginLeft:2,
                              paddingVertical:10,
                              paddingHorizontal:10,
                           }} onPress={()=> this.doFilterVIPRoom()}>
                              <Text style={styles.textListRoom}>Suite</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={{
                              borderRadius: 10,
                              backgroundColor: '#dff6f0',
                              marginLeft:2,
                              paddingVertical:10,
                              paddingHorizontal:10,
                           }} onPress={()=> this.doFilterRegRoom()}>
                              <Text style={styles.textCardItem}>Deluxe</Text>
                           </TouchableOpacity>
                        </Row>
                     </Card>
                  </Row>
                  <Row style={{ flexDirection: 'column', marginTop: 10 }}>
                     {VVIPRoom?this.filterByTypeRoomVVIP():null}
                     {VIPRoom?this.filterByTypeRoomVIP():null}
                     {RegulerRoom?this.filterByTypeRoomReg():null}
                     {AllType?this.listCardRoom():null}
                     {isViewDataSearch?this.doViewDataFromSearch():null}
                  </Row>
               </Grid>
            </ContainerTop>
         </StyleProvider>
      );
   }
}

const styles = StyleSheet.create({
   textCard: {
      fontFamily: "Montserrat-Medium",
      color: "black"
   },
   textdetail: {
      fontFamily: "Montserrat-Medium",
      fontSize: 8
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
   textListRoom: {
      fontFamily: "Montserrat-Medium",
      color: 'white',
      fontSize:12
   },
   textCardChild: {
      fontFamily: "Montserrat-Bold"
   },
   textSearch: {
      fontFamily: "Montserrat-Medium",
      color: "white"
   },
   textCardItem: {
      fontFamily: "Montserrat-Medium",
      color: "black",
      fontSize: 12
   }
});

const mapDispatchToProps = {
   roomSelected: roomSelected,
   setListTrxRoom: getListTrxRoomAction,
   setListRoom: getListRoomAction,
   roomActiveAct: roomActiveAction
};

const mapStateToProps = (state) => {
   return {
      userActive: state.userActive,
      listRoom:state.listRoom,
      roomActive:state.roomActive,
      listTrxRoom : state.listTrxRoom,
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
