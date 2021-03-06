import React from 'react'
import { Actions } from 'react-native-router-flux'
import { Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const HomeLeftButton = props => {
    const { parent } = props
    return (
        <Button transparent onPress={Actions.driverQRCode}>
            <MaterialCommunityIcons name='qrcode' size={20} color='#fff' />
        </Button>
    )
}

export default HomeLeftButton

