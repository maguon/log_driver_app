import React from 'react'
import { View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const OveruseDieselOilToolButton = props => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button transparent onPress={Actions.overuseDieselOilSearch}>
                <Icon name="ios-search" style={{ fontSize: 20, color: '#fff' }} />
            </Button>
        </View>
    )
}

export default OveruseDieselOilToolButton