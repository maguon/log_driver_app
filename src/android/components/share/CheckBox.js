import React, { Component } from 'react'
import {
    Text,
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    InteractionManager,
    Dimensions
} from 'react-native'
import { Button, Icon } from 'native-base'
import { validate } from '../../../util/Validator'
import globalStyles from '../../GlobalStyles'
// const styles = StyleSheet.create({
//     containerSytle: {
//         borderBottomWidth: 0.5,
//         borderColor: '#dddddd',
//         paddingVertical: 10,
//         paddingRight: 10,
//         justifyContent: 'space-between',
//     },
//     labelStyle: {
//         fontSize: 12,
//         fontWeight: 'bold'
//     },
//     textStyle: {
//         fontSize: 12
//     }
// })
const { width } = Dimensions.get('window')
const margin = 15

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


    renderItem() {
        return this.props.itemList.map((item, i) => {
            return (
                <TouchableOpacity
                    key={i}
                    onPress={() => this.onCheck(item)}>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ddd' }}>
                        <Text style={{ textAlign: 'center', paddingVertical: 10 }}>{item.value}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    onCheck(item) {
        this.validate(item)
        this.props.onCheck(item)
        this.setState({ modalVisible: false })
    }

    render() {
        const { input: { onChange, value, ...restProps },
        label = '',
        last = false,
        secureTextEntry = false,
        isRequired = false,
        textStyle = {},
        getList,
        showList,
        getListWaiting,
        meta: { error, touched } } = this.props
        return (
            <View>

                <TouchableOpacity style={styles.body} onPress={() => this.setState({ modalVisible: true })}>
                    <View style={styles.item}>
                        <Text style={[globalStyles.midText, textStyle, {}]} >{isRequired && <Text style={styles.errText}>*</Text>}{label}{value.value}</Text>
                        <Icon name='ios-arrow-down-outline' color='#777' fontSize={15} style={{ fontSize: 18, color: '#777' }} />
                    </View>
                    {touched && (error && <View style={styles.errView}>
                        <Text style={[globalStyles.smallText, styles.errText]}>{`*${error}`}</Text>
                    </View>)}
                </TouchableOpacity>
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => console.log('close')}
                >
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this.setState({ modalVisible: false })} >
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
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}