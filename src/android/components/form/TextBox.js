import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native'
import { Icon, Input } from 'native-base'
import { validate } from '../../../util/Validator'

const styles = StyleSheet.create({
    containerSytle: {
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        paddingVertical: 5,
        paddingRight: 10,
        borderColor: '#dddddd'
    },
    labelStyle: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    messageSytle: {
        color: 'red',
        fontSize: 10
    },
    inputStyle: {
        flex: 1,
        fontSize: 12,
        color: '#757575',
        padding: 0
    }
})

export default class TextBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            warnMessageList: []
        }
        this.changeValue = this.changeValue.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        this.validate(this.props.value)
    }

    validate(value) {
        if (this.props.isRequire) {
            const warnMessageList = validate(value, this.props.verifications)
            this.setState({ warnMessageList })
            const flag = !(warnMessageList.length > 0)
            this.props.onRequire(!!value && flag)
        } else {
            if (value === '') {
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

    changeValue(value) {
        this.validate(value)
        this.props.onValueChange(value)

    }

    static defaultProps = {
        verifications: [],
        containerSytle: styles.containerSytle,
        labelStyle: styles.labelStyle,
        inputStyle: styles.inputStyle,
        messageSytle: styles.messageSytle,
        onRequire: (param) => { }
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
            <View style={this.props.containerSytle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ color: 'red', width: 10, textAlign: 'right' }}>{this.props.isRequire && '*'}</Text>
                    <Text style={this.props.labelStyle}>{this.props.title}</Text>
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder={this.props.placeholder}
                        placeholderTextColor='#ddd'
                        value={this.props.value}
                        onChangeText={(value) => { this.changeValue(value) }}
                        style={this.props.inputStyle}
                        disableFullscreenUI={false}
                    />
                </View>
                {this.renderValidateMessage()}
            </View>

        )
    }
}
