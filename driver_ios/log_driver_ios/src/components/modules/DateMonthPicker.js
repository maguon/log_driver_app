import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import { Icon, Modal } from 'native-base'
import globalStyles from '../utils/GlobalStyles'
import Picker from 'react-native-picker'
import moment from 'moment'
const { width } = Dimensions.get('window')
const margin = 15

const DateMonthPicker = props => {

    let { input: { onChange, value },
        label = '',
        isRequired = false,
        textStyle = {},
        itemStyle = {},
        bodyStyle = {},
        meta: { error, touched } } = props
    const now = new Date()
    let newValue
    if (value) {
        newValue = value.split('-')
    }
    // console.log('value', value)
    return (

        <TouchableOpacity  onPress={() => {

            Picker.init({
                pickerData: [
                    Array.from({ length: 2000 }, (v, i) => `${(i + 1900)}`),
                    Array.from({ length: 12 }, (v, i) => {
                        if (i < 9) {
                            return `0${(i + 1)}`
                        } else {
                            return `${(i + 1)}`
                        }
                    })
                ],
                selectedValue: [newValue ? newValue[0] : `${now.getFullYear()}`,
                    newValue ? newValue[1] : `${now.getMonth() < 9 ? `0${(now.getMonth() + 1)}` : (now.getMonth() + 1)}`],
                pickerCancelBtnText: "关闭",
                pickerTitleText: "选择年月",
                pickerConfirmBtnText: "选择",
                pickerToolBarBg:[232,232,232,1],
                pickerBg:[255,255,255,1],
                onPickerConfirm: data => {
                    onChange(`${data[0]}-${data[1]}`)
                },
            })
            Picker.show()
        }}>
            <View>
                <Text  style={{color: '#76b92c'}}>{isRequired && <Text style={[styles.errText]}>*</Text>}{label}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[globalStyles.midText, textStyle]}>{value}</Text>
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

export default DateMonthPicker
