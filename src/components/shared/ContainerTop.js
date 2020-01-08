import React from 'react';
import {Platform, StatusBar, StyleSheet, ImageBackground} from "react-native";
import {Container, Content, Drawer} from "native-base";
import Sidebar from "./Sidebar";
import HeaderSegment from "./HeaderSegment";
import FooterSegment from "./FooterSegment";

class ContainerTop extends React.Component {
    openDrawer = () => {
        this.drawer._root.open();
    };

    render() {
        return (
            <Drawer
                ref={(ref) => {
                    this.drawer = ref;
                }}
                content={<Sidebar/>}>
                    <Container>
                        <ImageBackground source={require("../../../assets/bg.png")} style={{width:"100%", height:"100%"}}>
                        <HeaderSegment onOpenDrawer={this.openDrawer}/>
                        <Content padder>
                            {this.props.children}
                        </Content>
                        <FooterSegment/>
                        </ImageBackground>
                    </Container>
            </Drawer>
        )
    }
}

export default ContainerTop;