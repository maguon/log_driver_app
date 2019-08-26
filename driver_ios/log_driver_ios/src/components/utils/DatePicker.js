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
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

const {width} = Dimensions.get('window')
const margin = 15


const showPicker = (props) => {
    console.log('props========'+JSON.stringify(props))
    props.meta.active =true

    return(

        <DateTimePicker
            isVisible={props.meta.active}
            onConfirm={handleDatePicked}
            onCancel={hideDateTimePicker}
            cancelTextIOS={"取消"}
            confirmTextIOS={"确认"}
            cancelTextStyle={{fontSize: 20}}
            confirmTextStyle={{fontSize: 20}}
            titleIOS={"日期选择"}
            mode={"date"}
            locale={"zh-Hans"}
        />
    )

}
const hideDateTimePicker = () => {
    props.meta.active=false
};

const handleDatePicked = date=> {
    props.input.value = moment(date).format('YYYY-MM-DD')
    this.hideDateTimePicker();

};

const DatePicker = props => {
    let {
        input: {onChange, value, ...restProps},
        label = '',
        secureTextEntry = false,
        isRequired = false,
        textStyle = {},
        itemStyle = {},
        last = false,
        meta: {active,error, touched}
    } = props
    console.log('props========'+JSON.stringify(props))
    return (
        <TouchableOpacity style={last ? styles.lastBody : styles.body}
                          onPress={() =>showPicker(props)}>

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
