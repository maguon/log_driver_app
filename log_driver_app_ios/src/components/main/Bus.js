import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {Actions} from 'react-native-router-flux'

class Bus extends Component {
    constructor(props) {
        super(props)

    }

    render() {

        return (
            <View>
                <Text onPress={()=>Actions.pop()}> 我是Bus </Text>
            </View>
        )
    }
}

export default Bus
