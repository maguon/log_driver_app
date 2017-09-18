import React, { Component } from 'react'
import {
    Text,
    View,
    Modal,
    TouchableHighlight,
    StyleSheet
} from 'react-native'
import { Button, Icon } from 'native-base'
import { validate } from '../../../util/Validator'
const styles = StyleSheet.create({
    containerSytle: {
        borderBottomWidth: 0.5,
        borderColor: '#dddddd',
        paddingVertical: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
    },
    labelStyle: {
        fontSize: 12
    },
    textStyle: {
        fontSize: 12
    }
})


export default class CheckBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
        this.renderItem = this.renderItem.bind(this)
        this.onCheck = this.onCheck.bind(this)
        this.validate = this.validate.bind(this)
    }

    static defaultProps = {
        title: '性别：',
        value: '男',
        listTitle: 'list标题',
        itemList: [{ id: 0, value: '男' }, { id: 1, value: '女' }],
        onCheck: (item) => { console.log(item) },
        verifications: [],
        containerSytle: styles.containerSytle,
        labelStyle: styles.labelStyle,
        textStyle: styles.textStyle,
        onRequire: (param) => { }
    }


    componentWillMount() {
        this.validate(this.props.value)
    }

    validate(value) {
        if (this.props.isRequire) {
            const warnMessageList = validate(value, this.props.verifications)
            this.setState({ warnMessageList })
            const flag = !(warnMessageList.length > 0)
            this.props.onRequire((value!=this.props.defaultValue )&& flag)
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


    renderItem() {
        return this.props.itemList.map((item, i) => {
            return (
                <TouchableHighlight
                    key={i}
                    underlayColor='rgba(0,0,0,0.1)'
                    onPress={() => this.onCheck(item)}>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ddd' }}>
                        <Text style={{ textAlign: 'center', paddingVertical: 10 }}>{item.value}</Text>
                    </View>
                </TouchableHighlight>
            )
        })
    }

    onCheck(item) {
        this.validate(item)
        this.props.onCheck(item)
        this.setState({ modalVisible: false })
    }

    render() {
        return (
            <View>
                <TouchableHighlight
                    underlayColor='rgba(0,0,0,0.1)'
                    onPress={() => this.setState({ modalVisible: true })}>
                    <View style={this.props.containerSytle}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ width: 10, textAlign: 'right', color: 'red' }}>{this.props.isRequire && '*'}</Text>
                                <Text style={this.props.labelStyle}>{this.props.title} </Text>
                                <Text style={this.props.textStyle}>{this.props.value}</Text>
                            </View>
                            <Icon
                                name='md-arrow-dropdown'
                                style={{ fontSize: 18, color: '#7a7a7a' }} />
                        </View>
                    </View>
                </TouchableHighlight>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { }}
                >
                    <View style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flex: 1
                    }}>
                        <View style={{
                            backgroundColor: '#fff',
                            alignSelf: 'stretch',
                            justifyContent: 'center',
                            borderWidth: 0.5,
                            borderColor: '#ccc',
                        }}>
                            <View style={{ borderBottomWidth: 1, borderColor: '#00cade' }}>
                                <Text style={{ paddingVertical: 10, color: '#00cade', textAlign: 'center' }}>{this.props.listTitle}</Text>
                            </View>
                            {this.renderItem()}
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}