import React from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Button, Spinner } from 'native-base'
import gobalStyles, { styleColor } from '../GlobalStyles'
import { connect } from 'react-redux'
import * as homeAction from '../views/blockInitial/home/HomeAction'

const HomeOperation = props => {
    const { getMileageInfo, getMileageInfoWaiting, homeReducer } = props
    if (homeReducer.getHomeMileageInfo.isResultStatus == 1) {
        return (
            <Spinner color= 'rgba(255,255,255,0.5)' />
        )
    } else {
        return (
            <Button transparent onPress={() => {
                getMileageInfoWaiting()
                getMileageInfo()
            }}>
                <Text style={[gobalStyles.smallText, styles.text]} >刷新</Text>
            </Button>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        homeReducer: state.homeReducer
    }
}


const mapDispatchToProps = (dispatch) => ({
    getMileageInfo: () => {
        dispatch(homeAction.getMileageInfo())
    },
    getMileageInfoWaiting: () => {
        dispatch(homeAction.getMileageInfoWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeOperation)

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
