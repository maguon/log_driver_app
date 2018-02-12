import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button, Spinner } from 'native-base'
import { submit } from 'redux-form'

const ApplyAccidentSubmit = props => {
    return (
        <Button transparent onPress={()=>Actions.pop({popNum:2})}>
            <Text style={styles.text}>完成</Text>
        </Button>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})

export default ApplyAccidentSubmit