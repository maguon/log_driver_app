import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'

export default class BranchInstructExecuting extends Component {
    
    render() {
        console.log(this.props.initParam)
        return (
            <View>
                <Text>
                    BranchInstructExecuting
                </Text>
            </View>
        )
    }
}
