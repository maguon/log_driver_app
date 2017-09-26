import React, { Component } from 'react'
import {
    Text,
    View,
    DatePickerAndroid,
    TouchableHighlight
} from 'react-native'
import { Icon } from 'native-base'
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import * as workAction from '../../../actions/WorkAction'

class Work extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateIdStart: moment().format('YYYY-MM-01'),
            dateIdEnd: moment().format('YYYY-MM-DD')
        }
        this.showPicker = this.showPicker.bind(this)
        this.onSearch = this.onSearch.bind(this)
    }

    async showPicker(options, getDate) {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open(options)
            if (action !== DatePickerAndroid.dismissedAction) {
                getDate(moment(new Date(year, month, day)).format('YYYY-MM-DD'))
            }
        } catch ({ code, message }) {
            console.warn(`Error in example : `, message)
        }
    }

    onSearch() {
        console.log('onsearch')
    }


    componentDidMount() {
        this.props.setGetMileageInfoWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getMileageInfo({
            OptionalParam: {
                truckId: this.props.initParam.truckId
            }
        }))
    }

    render() {
        return (
            <View >
                <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#b8c6cd', alignItems: 'center' }}>
                    <TouchableHighlight
                        style={{ flex: 1 }}
                        underlayColor='rgba(0,0,0,0)'
                        onPress={() => this.showPicker({ date: new Date(), mode: 'spinner' }, (param) => this.setState({ dateIdStart: param }))}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontSize: 11, color: '#fff' }}>{this.state.dateIdStart}</Text>
                            </View>
                            <View style={{ paddingLeft: 10 }}>
                                <Icon name='md-calendar' style={{ fontSize: 20, color: '#fff' }} />
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 11, color: '#fff' }}>至</Text>
                    </View>
                    <TouchableHighlight
                        style={{ flex: 1 }}
                        underlayColor='rgba(0,0,0,0)'
                        onPress={() => this.showPicker({ date: new Date(), mode: 'spinner' }, (param) => this.setState({ dateIdEnd: param }))}>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontSize: 11, color: '#fff' }}>{this.state.dateIdEnd}</Text>
                            </View>
                            <View style={{ paddingLeft: 10 }}>
                                <Icon name='md-calendar' style={{ fontSize: 20, color: '#fff' }} />
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor='rgba(0,0,0,0)'
                        onPress={this.onSearch}>
                        <View style={{ paddingLeft: 10 }}>
                            <Icon name='ios-search' style={{ fontSize: 20, color: '#fff' }} />
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomColor: 'red', borderBottomWidth: 3, paddingVertical: 10 }}>
                        <Text style={{ color: 'red' }}>12345</Text>
                        <Text style={{ color: 'red' }}>总里程</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                        <Text>12345</Text>
                        <Text>重载里程</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                        <Text>12345</Text>
                        <Text>空载里程</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, marginTop: 10, borderColor: '#ccc', borderWidth: 0.5 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#eff3f5', padding: 10, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='truck' size={20} color='#00cade' />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                            <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>大连 --> 沈阳</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                            <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>235公里</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 11 }}>完成时间：201708-01</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 11 }}>实际送达：14</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 11 }}>异常：1</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        workReducer: state.workReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMileageInfo: (param) => {
        dispatch(workAction.getMileageInfo(param))
    },
    setGetMileageInfoWaiting: () => {
        dispatch(workAction.setGetMileageInfoWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Work)
