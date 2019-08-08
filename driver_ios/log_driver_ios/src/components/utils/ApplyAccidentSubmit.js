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
    const { applyAccident, applyAccidentReducer: { applyAccident: { isResultStatus } } } = props
    if (isResultStatus == 1) {
        return (
            <Spinner color='#fff' />
        )
    } else {
        return (
            <Button transparent onPress={applyAccident}>
                <Text style={styles.text}>下一步</Text>
            </Button>
        )
     }
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize:12
    }
})


const mapStateToProps = (state) => {
    return {
        applyAccidentReducer: state.applyAccidentReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    applyAccident: () => {
        dispatch(submit('applyAccidentForm'))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplyAccidentSubmit)
