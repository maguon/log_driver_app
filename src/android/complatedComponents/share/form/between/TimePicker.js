import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TimePickerAndroid,
    Dimensions
} from 'react-native'
import { Icon } from 'native-base'
import globalStyles from '../../../../GlobalStyles'

const { width } = Dimensions.get('window')
const margin = 15

const showPicker = async (onChange) => {
    try {
        const { action, hour, minute } = await TimePickerAndroid.open({
            is24Hour: true, // 会显示为'2 PM'
        })
        if (action !== TimePickerAndroid.dismissedAction) {
            onChange(`${hour}:${minute}`)
        }
    } catch ({ code, message }) {
        console.warn('Cannot open time picker', message)
    }
}

const TimePicker = props => {
    let { input: { onChange, value },
        label = '',
        isRequired = false,
        textStyle = {},
        itemStyle = {},
        bodyStyle = {},
        meta: { error, touched } } = props
    return (
        <TouchableOpacity style={[styles.body, bodyStyle]} onPress={() => showPicker(onChange)}>
            <View style={[styles.item, itemStyle]}>
                <Text style={[globalStyles.midText, textStyle]} >{isRequired && <Text style={styles.errText}>*</Text>}{label}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[globalStyles.midText, textStyle]}>{value}</Text>
                    <Icon name='ios-calendar' color='#777' fontSize={15} style={{ fontSize: 18, color: '#bbb', paddingLeft: 15 }} />
                </View>
            </View>
            {touched && (error && <View style={styles.errView}>
                <Text style={[globalStyles.smallText, styles.errText]}>{`*${error}`}</Text>
            </View>)}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    errText: {
        color: 'red'
    },
    body: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: margin,
        paddingVertical: margin,
        paddingRight: margin,
        borderBottomWidth: 0.3,
        borderColor: '#ccc'
    },
    item: {
        width: width - margin * 2,
        borderBottomWidth: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    errView: {
        marginTop: margin
    }
})

export default TimePicker
