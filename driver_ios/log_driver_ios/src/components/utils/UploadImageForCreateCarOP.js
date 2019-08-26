import React from 'react'
import { Text } from 'react-native'
import { Button} from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles from './GlobalStyles'

const UploadImageForCreateCarOP = () => {
    return (
        <Button transparent onPress={() => Actions.pop({ popNum: 2 })}>
            <Text style={[globalStyles.midText, { color: '#fff' }]}>完成</Text>
        </Button>
    )
}

export default UploadImageForCreateCarOP
