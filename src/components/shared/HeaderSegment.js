import React from 'react';
import {Button, Header, Icon, Left, Right} from "native-base";

class HeaderSegment extends React.Component {
    openDrawer = () => {
        this.props.onOpenDrawer();
    };

    render() {
        return (
            <Header transparent>
                <Left>
                    <Button
                        transparent
                        onPress={this.openDrawer}
                    >
                        <Icon type='AntDesign' name="menuunfold"/>
                    </Button>
                </Left>
                <Right/>
            </Header>
        )
    }
}

export default HeaderSegment;