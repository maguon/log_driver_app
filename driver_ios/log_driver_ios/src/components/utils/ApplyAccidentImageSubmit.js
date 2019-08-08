import React from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button} from 'native-base'

const ApplyAccidentSubmit = () => {
    return (
        <Button transparent onPress={()=>Actions.pop({popNum:2})}>
            <Text style={styles.text}>完成</Text>
        </Button>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontSize:12
    }
})

export default ApplyAccidentSubmit
