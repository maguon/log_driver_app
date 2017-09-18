import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    DatePickerAndroid
} from 'react-native'

import { Icon } from 'native-base'
import { validate } from '../../../util/Validator'
import moment from 'moment'

const styles = StyleSheet.create({
    containerSytle: {
        borderBottomWidth: 0.5,
        // paddingHorizontal: 10,
        borderColor: '#dddddd',
        paddingVertical: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        //alignItems: 'center'
    },
    labelStyle: {
        fontSize: 12,
        //flex: 4,
        //textAlign: 'right'
    },
    textStyle: {
        fontSize: 12,
        //flex: 12
    },
    messageSytle: {
        color: 'red',
        fontSize: 10
    }
})

const baseStyles = {
    iconSytle: {
        fontSize: 18,
        //flex: 1,
        //textAlign: 'right',
        color: '#7a7a7a'
    }
}

export default class DateTimePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            warnMessageList: []
        }
        this.changeDateTime = this.changeDateTime.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentWillMount() {
        this.validate(this.props.value)
    }

    changeDateTime(value) {
        this.validate(value)
        this.props.onValueChange(value)

    }

    validate(value) {
        if (this.props.isRequire) {
            const warnMessageList = validate(value, this.props.verifications)
            this.setState({ warnMessageList })
            const flag = !(warnMessageList.length > 0)
            this.props.onRequire((value != this.props.defaultValue) && flag)
        } else {
            if (value == this.props.defaultValue) {
                this.setState({ warnMessageList: [] })
                this.props.onRequire(true)
            }
            else {
                const warnMessageList = validate(value, this.props.verifications)
                this.setState({ warnMessageList })
                this.props.onRequire(!(warnMessageList.length > 0))
            }
        }
    }

    static defaultProps = {
        verifications: [],
        containerSytle: styles.containerSytle,
        labelStyle: styles.labelStyle,
        textStyle: styles.textStyle,
        iconSytle: baseStyles.iconSytle,
        messageSytle: styles.messageSytle,
        onRequire: (param) => { }
    }

    async showPicker(options) {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open(options)
            if (action !== DatePickerAndroid.dismissedAction) {
                this.changeDateTime(moment(new Date(year, month, day)).format('YYYY-MM-DD'))
            }
        } catch ({ code, message }) {
            console.warn(`Error in example : `, message)
        }
    }

    renderValidateMessage() {
        let warnMessage
        if (this.state.warnMessageList.length > 0) {
            warnMessage = this.state.warnMessageList.reduce((acc, val) => {
                return `${acc}${val}  `
            }, '')
            warnMessage = (<View style={{ alignSelf: 'flex-start', paddingLeft: 10 }}>
                <Text style={this.props.messageSytle}>{warnMessage}</Text>
            </View>)
        }
        return warnMessage
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor='rgba(0,0,0,0.1)'
                onPress={() => this.showPicker({ date: new Date(), mode: 'spinner' })}>
                <View style={this.props.containerSytle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: 10, textAlign: 'right', color: 'red' }}>{this.props.isRequire && '*'}</Text>
                            <Text style={this.props.labelStyle}>{this.props.title} </Text>
                            <Text style={this.props.textStyle}>{this.props.value}</Text>
                        </View>
                        <Icon
                            name='md-calendar'
                            style={this.props.iconSytle} />
                    </View>
                    {this.renderValidateMessage()}
                </View>
            </TouchableHighlight>
        )
    }
}



