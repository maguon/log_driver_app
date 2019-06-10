import React from 'react'
import { View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

const FuelFillingRecordToolButton = props => {
    const { fuelFillingRecordReducer: { data: { total: { oilDateStart,oilDateEnd } } } } = props
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button transparent onPress={() => Actions.fuelFillingSearch({
                initParam: {oilDateStart,oilDateEnd }
            })}>
                <Icon name="ios-search" style={{ fontSize: 20, color: '#fff' }} />
            </Button>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        fuelFillingRecordReducer: state.fuelFillingRecordReducer
    }
}

export default connect(mapStateToProps)(FuelFillingRecordToolButton)