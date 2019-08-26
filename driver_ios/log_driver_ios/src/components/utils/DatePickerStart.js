import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Modal
} from 'react-native'
import {Icon} from 'native-base'
import globalStyles from './GlobalStyles'
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

const {width} = Dimensions.get('window')
const margin = 15


class DatePickerTime extends Component {
    constructor(props) {
        super(props)
        // let {
        //     input: {onChange, value, ...restProps},
        //     label = '',
        //     secureTextEntry = false,
        //     isRequired = false,
        //     textStyle = {},
        //     itemStyle = {},
        //     last = false,
        //     meta: {error, touched}
        // } = props
        console.log("props========" + JSON.stringify(props))
        this.state = {
            isDateTimePickerVisible: false,
            dateIdStart: moment().format('YYYY-MM-01'),
        };

        this.showDateTimePicker = this.showDateTimePicker.bind(this)

    }


    showDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: true});
    };

    hideDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: false});
    };

    handleDatePicked = date => {
        this.state.dateIdStart = moment(date).format('YYYY-MM-DD')
        this.props.input.value = this.state.dateIdStart
        console.log('props========'+this.props.input.value)
        this.hideDateTimePicker();
    };

    showDate = (props) => {
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
        console.log('props========'+JSON.stringify(props))
        return (
            <TouchableOpacity
                style={styles.lastBody}
                onPress={this.showDateTimePicker}>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    cancelTextIOS={"取消"}
                    confirmTextIOS={"确认"}
                    cancelTextStyle={{fontSize: 20}}
                    confirmTextStyle={{fontSize: 20}}
                    titleIOS={"日期选择"}
                    mode={"date"}
                    locale={"zh-Hans"}
                />
                {/*<View style={[styles.item, {width: width - 90}]}>*/}
                    {/*<Text style={[globalStyles.midText]}>起始时间：{this.state.dateIdStart}</Text>*/}
                    {/*<Icon name='ios-arrow-down' color='#777' fontSize={15} style={{fontSize: 18, color: '#777'}}/>*/}
                {/*</View>*/}
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

    render() {

        return (
            this.showDate(this.props)
        )
    }
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

export default DatePickerTime
