import React from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Button } from 'native-base'
import gobalStyles from '../GlobalStyles'
import { connect } from 'react-redux'
import * as homeAction from '../views/blockInitial/home/HomeAction'

const HomeOperation = props => {
    const { getMileageInfo, getMileageInfoWaiting } = props
    return (
        <Button transparent onPress={() => {
            getMileageInfoWaiting()
            getMileageInfo()
        }}>
            <Text style={[gobalStyles.smallText, styles.text]} >刷新</Text>
        </Button>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getMileageInfo: () => {
        dispatch(homeAction.getMileageInfo())
    },
    getMileageInfoWaiting: () => {
        dispatch(homeAction.getMileageInfoWaiting())
    }
})

export default connect(null, mapDispatchToProps)(HomeOperation)

const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
