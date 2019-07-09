import React from 'react'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const LeftButton = () => {
    return (
        <Button transparent onPress={Actions.pop}>
            <Icon name='arrow-back' style={{color:'white'}} size={20}/>
        </Button>
    )
}

export default LeftButton
