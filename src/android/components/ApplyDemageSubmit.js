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

const ApplyDemageSubmit = props => {
    const { applyDemage, 
        applyDamageReducer: { createDamage: { isResultStatus } } 
    } = props
    if (isResultStatus == 1) {
        return (
            <Spinner color='#fff' />
        )
    } else {
        return (
            <Button transparent onPress={applyDemage}>
                <Text style={styles.text}>下一步</Text>
            </Button>
        )
     }
}

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})


const mapStateToProps = (state) => {
    return {
        applyDamageReducer: state.applyDamageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    applyDemage: () => {
        dispatch(submit('applyDemageForm'))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplyDemageSubmit)
