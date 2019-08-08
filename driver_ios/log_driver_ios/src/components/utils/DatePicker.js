import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Modal
} from 'react-native'
import { Icon} from 'native-base'

import globalStyles from './GlobalStyles'
import TimeChange from './TimeChange'

const {width} = Dimensions.get('window')
const margin = 15


const showPicker = async (options, onChange) => {
    console.log("options========"+JSON.stringify(options))
    console.log("onChange========"+onChange)
    // try {
    //     const { action, year, month, day } = await DatePickerAndroid.open(options)
    //     if (action !== DatePickerAndroid.dismissedAction) {
    //         onChange(`${year}-${month + 1}-${day}`)
    //     }
    // } catch ({ code, message }) {
    //     console.warn(`Error in example : `, message)
    // }

        return (
            <TimeChange
                options={options}
                onChange={onChange}
            />
        )

}

const DatePicker = props => {
    let {
        input: {onChange, value, ...restProps},
        label = '',
        secureTextEntry = false,
        isRequired = false,
        textStyle = {},
        itemStyle = {},
        last = false,
        meta: {error, touched}
    } = props
    return (
        <TouchableOpacity style={last ? styles.lastBody : styles.body}
                          onPress={() =>showPicker({ date: new Date(), mode: 'spinner' }, onChange)}>
            <View style={[styles.item, itemStyle]}>
                <Text style={[globalStyles.midText, textStyle, {}]}>{isRequired &&
                <Text style={styles.errText}>*</Text>}{label}{value}</Text>
                <Icon name='ios-arrow-down' color='#777' fontSize={15} style={{fontSize: 18, color: '#777'}}/>
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
    lastBody: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: margin,
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

export default DatePicker
