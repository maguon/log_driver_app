import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    Button,
    TouchableNativeFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as homeAction from '../../../actions/HomeAction'
import moment from 'moment'

class Home extends Component {
    constructor(props) {
        super(props)
        this.renderTaskItem = this.renderTaskItem.bind(this)
    }

    componentDidMount() {
        this.props.getMileageInfo({
            mileageInfoParam: {
                OptionalParam: {
                    taskStatus: 9,
                    loadDistance: 5,
                    noLoadDistance: 5,
                    driveId: this.props.userReducer.user.driverId,
                    dateIdStart: moment().format('YYYY-MM-01'),
                    dateIdEnd: moment().format('YYYY-MM-DD')
                }
            },
            taskListParam: {
                OptionalParam: {
                    taskStatusArr: '1,2,3,4,9',
                    driveId: this.props.userReducer.user.driverId,
                    dateIdStart: moment().format('YYYY-MM-01'),
                    dateIdEnd: moment().format('YYYY-MM-DD')
                }
            }
        })
    }


    renderTaskItem() {
        return <View style={{ marginVertical: 10, marginHorizontal: 10, borderWidth: 1, borderColor: '#e1e2e6' }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#edf1f4', paddingVertical: 5, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcon name='truck' style={{ color: '#00cade', paddingHorizontal: 5 }} size={20} />
                    <Text style={{ color: '#8e9fa3', fontWeight: 'bold' }}>大连—>沈阳</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Text style={{ color: '#8e9fa3', paddingRight: 90, fontSize: 11 }}>在途</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 5, backgroundColor: '#fff', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#8e9fa3', fontSize: 11 }}>指定时间：2017-09-18</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#8e9fa3', paddingRight: 90, fontSize: 11 }}>指定转载：14</Text>
                </View>
            </View>
            <View style={{
                position: 'absolute',
                right: 10, top: 10
            }}>
                <TouchableNativeFeedback onPress={() => { }}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{
                        borderRadius: 15,
                        width: 30,
                        height: 30,
                        backgroundColor: '#00cade',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: '#fff', fontSize: 11 }}>完成</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
            <View style={{
                position: 'absolute',
                right: 50, top: 10
            }}>
                <TouchableNativeFeedback onPress={() => { }}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{
                        borderRadius: 15,
                        width: 30,
                        height: 30,
                        backgroundColor: '#00cade',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: '#fff', fontSize: 11 }}>完成</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
    }

    render() {
        const { taskList, mileageInfo } = this.props.homeReducer.data
        return (
            <View style={{flex:1}}>
                <View style={{ backgroundColor: '#00cade', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ borderRadius: 40, width: 80, height: 80, backgroundColor: '#d7f4f8', borderWidth: 4, borderColor: '#74e0ed', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#00cade', fontSize: 11 }}>重载里程</Text>
                            <Text style={{ color: '#00cade' }}>{mileageInfo.load_distance ? `${mileageInfo.load_distance}` : '0'}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ borderRadius: 50, width: 100, height: 100, backgroundColor: '#d7f4f8', borderWidth: 4, borderColor: '#74e0ed', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#00cade', fontSize: 11 }}>本月里程</Text>
                            <Text style={{ color: '#00cade' }}>{mileageInfo.distanceCount ? `${mileageInfo.distanceCount}` : '0'}</Text>
                            <Text style={{ color: '#00cade', fontSize: 11 }}>公里</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ borderRadius: 40, width: 80, height: 80, backgroundColor: '#d7f4f8', borderWidth: 4, borderColor: '#74e0ed', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#00cade', fontSize: 11 }}>空载里程</Text>
                            <Text style={{ color: '#00cade' }}>{mileageInfo.no_load_distance ? `${mileageInfo.no_load_distance}` : '0'}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', backgroundColor: '#b0bfc6', paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='ios-pin' style={{ color: '#dce2e7' }} size={20} />
                            <Text style={{ color: '#fff', paddingLeft: 10, fontSize: 11 }}>大连—>沈阳</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#fff', fontSize: 11 }}>在途</Text>
                        </View>
                    </View>
                    <View style={{ height: 150, backgroundColor: 'red' }}>
                    </View>
                </View>
                <FlatList
                    data={taskList} 
                    renderItem={({item,index})=>this.renderTaskItem()}
                    />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        homeReducer: state.homeReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMileageInfo: (param) => {
        dispatch(homeAction.getMileageInfo(param))
    },
    setGetMileageInfoWaiting: () => {
        dispatch(homeAction.setGetMileageInfoWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)