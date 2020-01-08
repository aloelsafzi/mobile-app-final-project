import React from 'react';
import {TouchableOpacity} from "react-native";
import {Icon, Text} from "native-base";

const CircleButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}
                          style={{
                              borderWidth: 1,
                              borderColor: 'rgba(0,0,0,0.2)',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 100,
                              height: 100,
                              backgroundColor: '#fff',
                              borderRadius: 50,
                              margin: 5
                          }}
        >
            <Icon name={props.iconName} size={props.size} color={props.color}/>
            <Text>{props.text}</Text>
        </TouchableOpacity>
    )
};

export default CircleButton;