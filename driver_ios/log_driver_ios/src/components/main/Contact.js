import React, {Component} from 'react'
import {View, Text} from 'react-native'


class Contact extends Component {
    constructor(props) {
        super(props)

    }

    render() {

        return (
            <View >

                <View style={{width:400, height:100,backgroundColor:"#76b92c"}}>
                    <Text>  Contact
                    </Text>
                </View>
                <View style={{width:400, height:100,backgroundColor:"#76b92c"}}/>
            </View>

        )
    }
}

export default Contact
