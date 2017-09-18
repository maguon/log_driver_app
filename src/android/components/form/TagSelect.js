import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    DatePickerAndroid
} from 'react-native'
import FontTag from '../../components/tag/FontTag'
import { Icon } from 'native-base'
import { validate } from '../../../util/Validator'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
    containerSytle: {
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        flex: 1,
        borderColor: '#dddddd',
        paddingRight: 10
    },
    labelStyle: {
        fontSize: 12,
    },
    textStyle: {
        fontSize: 12,
    },
    messageSytle: {
        color: 'red',
        fontSize: 10
    }
})

const baseStyles = {
    iconSytle: {
        fontSize: 18,
        color: '#7a7a7a',
         paddingLeft: 10
    }
}

export default class TagSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            warnMessageList: []
        }
        this.changeValue = this.changeValue.bind(this)
        this.showList = this.showList.bind(this)
        this.renderEnable = this.renderEnable.bind(this)
        this.renderDisable = this.renderDisable.bind(this)
        this.validate=this.validate.bind(this)
    }

    componentWillMount() {
       this.validate(this.props.value)
    }

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.value===this.state.value){
            return false
        }
        return true
    }


    changeValue(value) {
        this.validate(value)
        this.props.onValueChange(value)
    }

    validate(value) {
        if (this.props.isRequire) {
            const warnMessageList = validate(value, this.props.verifications)
            this.setState({ warnMessageList })
            const flag = !(warnMessageList.length > 0)
            this.props.onRequire(value && flag)
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

    showList() {
        this.props.showList({ onSelect: this.changeValue })
    }

    static defaultProps = {
        verifications: [],
        containerSytle: styles.containerSytle,
        labelStyle: styles.labelStyle,
        textStyle: styles.textStyle,
        iconSytle: baseStyles.iconSytle,
        messageSytle: styles.messageSytle,
        onRequire: (param) => { },
        isEnable: true,
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

    renderEnable() {
        return (
            <TouchableHighlight
                underlayColor='rgba(0,0,0,0.1)'
                onPress={this.showList}>
                <View style={this.props.containerSytle}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ width: 10, textAlign: 'right', color: 'red' }}>{this.props.isRequire && '*'}</Text>
                            <Text style={this.props.labelStyle}>{this.props.title} </Text>
                            <Text style={this.props.textStyle}>{this.props.value}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {this.props.isCheck&&<FontTag size={16} title='检' color='#f87775' fontColor='#fff' />}
                            <Icon
                                name='ios-arrow-forward'
                                style={this.props.iconSytle} />
                        </View>
                    </View>
                    {this.renderValidateMessage()}
                </View>
            </TouchableHighlight>
        )
    }

    renderDisable() {
        return (
            <View style={[this.props.containerSytle, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: 10, textAlign: 'right', color: 'red' }}>{this.props.isRequire && '*'}</Text>
                        <Text style={this.props.labelStyle}>{this.props.title}</Text>
                        <Text style={this.props.textStyle}>{this.props.value}</Text>
                    </View>
                    <Icon
                        name='ios-arrow-forward'
                        style={this.props.iconSytle} />
                </View>
                {this.renderValidateMessage()}
            </View>
        )
    }

    render() {
        return (
            <View>
                {this.props.isEnable ? this.renderEnable() : this.renderDisable()}
            </View>

        )
    }
}



