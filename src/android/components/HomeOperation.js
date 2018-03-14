import React, { Component } from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button, Icon } from 'native-base'
import gobalStyles from '../GlobalStyles'

const HomeOperation = props => {
    const { parent } = props
    return (
        <Button transparent onPress={() => Actions.refresh({ isRefresh: true })}>
            <Text style={[gobalStyles.smallText,{ color: '#fff' }]} >刷新</Text>
        </Button>
    )
}

export default HomeOperation

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
