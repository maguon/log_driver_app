import React from 'react'
import { View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const PeccancyToolButton = props => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button transparent onPress={Actions.peccancySearch}>
                <Icon name="ios-search" style={{ fontSize: 20, color: '#fff' }} />
            </Button>
        </View>
    )
}

export default PeccancyToolButton