import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image
} from 'react-native'
import { Icon, Input } from 'native-base'
import { validate } from '../../../util/Validator'
import FontTag from '../../components/tag/FontTag'

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

export default class TagTextBox extends Component {
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
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
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
                    <View style={{ flexDirection: 'row' }}>
                        {this.props.isDisable &&
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={{ color: '#ccc', fontSize: 10 }}>已停用</Text>
                            </View>}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingLeft: 10 }}>
                            {this.props.companyType == 1 && <FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' />}
                            {this.props.companyType == 2 && <FontTag size={26} title='协' color='#73de8a' fontColor='#fff' />}
                            {this.props.companyType == 3 && <FontTag size={26} title='供' color='#efbb7a' fontColor='#fff' />}
                            {this.props.companyType == 4 && <FontTag size={26} title='包' color='#e08ddd' fontColor='#fff' />}
                        </View>
                    </View>
                </View>
                {this.renderValidateMessage()}
                {this.props.leftTag == 0 && <Image
                    style={{ width: 20, height: 20, position: 'absolute', top: 0, left: 0 }}
                    source={{ uri: 'truck_head' }}
                />}
                {this.props.leftTag == 1 && <Image
                    style={{ width: 20, height: 20, position: 'absolute', top: 0, left: 0 }}
                    source={{ uri: 'truck_tail' }}
                />}
            </View>
        )
    }
}
