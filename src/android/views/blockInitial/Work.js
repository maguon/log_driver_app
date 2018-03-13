import React, { Component } from 'react'
import {
    Text,
    View,
    DatePickerAndroid,
    InteractionManager,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import { Icon } from 'native-base'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
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
        this.renderTaskItem = this.renderTaskItem.bind(this)
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
        const {user} =this.props.userReducer.data
        this.props.setGetMileageInfoWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getMileageInfo({
            mileageInfoParam: {
                OptionalParam: {
                    taskStatus: 10,
                    loadDistance: 5,
                    noLoadDistance: 5,
                    // driveId: this.props.userReducer.user.driverId,
                    dateIdStart: this.state.dateIdStart,
                    dateIdEnd: this.state.dateIdEnd
                }
            },
            taskListParam: {
                OptionalParam: {
                    taskStatus: 10,
                    //driveId: this.props.userReducer.user.driverId,
                    dateIdStart: this.state.dateIdStart,
                    dateIdEnd: this.state.dateIdEnd
                }
            },
            getDriverId: {
                requiredParam: {
                    userId: user.userId
                }
            }
        }))
    }

    renderTaskItem(item, key) {
        return <TouchableOpacity
            key={key}
            onPress={() => Actions.instruct({ initParam: { routeInfo: item } })}>
            <View style={{ marginHorizontal: 10, marginTop: 10, borderColor: '#ccc', borderWidth: 0.5 }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#eff3f5', padding: 10, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='truck' size={20} color='#00cade' />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                        <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>{item.city_route_start ? item.city_route_start : ''}</Text>
                        <MaterialCommunityIcons name='ray-start-arrow' size={20} style={{ paddingLeft: 5, color: '#8c989f' }} />
                        <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold',paddingLeft: 5 }}>{item.city_route_end ? item.city_route_end : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                        <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>{item.distance ? `${item.distance}` : '0'}公里</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 11 }}>完成时间：{item.task_end_date ? moment(new Date(item.task_end_date)).format('YYYY-MM-DD HH:mm:ss') : ''}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 11 }}>实际送达：{item.car_count ? `${item.car_count}` : '0'}</Text>
                    </View>
                    {/* <View>
                    <Text style={{ fontSize: 11 }}>异常：1</Text>
                </View> */}
                </View>
            </View>
        </TouchableOpacity>
    }


    componentDidMount() {
        const {user} =this.props.userReducer.data
        this.props.setGetMileageInfoWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getMileageInfo({
            mileageInfoParam: {
                OptionalParam: {
                    taskStatus: 10,
                    loadDistance: 5,
                    noLoadDistance: 5,
                    //driveId: this.props.userReducer.user.driverId,
                    dateIdStart: this.state.dateIdStart,
                    dateIdEnd: this.state.dateIdEnd
                }
            },
            taskListParam: {
                OptionalParam: {
                    taskStatus: 10,
                    //driveId: this.props.userReducer.user.driverId,
                    dateIdStart: this.state.dateIdStart,
                    dateIdEnd: this.state.dateIdEnd
                }
            },
            getDriverId: {
                requiredParam: {
                    userId: user.userId
                }
            }
        }))
    }

    render() {
        const { data } = this.props.workReducer
        const { getWorkMileageInfo } = this.props.workReducer
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#9AAAB2', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => this.showPicker({ date: new Date(), mode: 'spinner' }, (param) => this.setState({ dateIdStart: param }))}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontSize: 11, color: '#fff' }}>{this.state.dateIdStart}</Text>
                            </View>
                            <View style={{ paddingLeft: 10 }}>
                                <Icon name='md-calendar' style={{ fontSize: 20, color: '#fff' }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 11, color: '#fff' }}>至</Text>
                    </View>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => this.showPicker({ date: new Date(), mode: 'spinner' }, (param) => this.setState({ dateIdEnd: param }))}>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontSize: 11, color: '#fff' }}>{this.state.dateIdEnd}</Text>
                            </View>
                            <View style={{ paddingLeft: 10 }}>
                                <Icon name='md-calendar' style={{ fontSize: 20, color: '#fff' }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.onSearch}>
                        <View style={{ paddingLeft: 10 }}>
                            <Icon name='ios-search' style={{ fontSize: 20, color: '#fff' }} />
                        </View>
                    </TouchableOpacity>
                </View>
                {getWorkMileageInfo.isResultStatus == 1 && <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getWorkMileageInfo.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>}
                {getWorkMileageInfo.isResultStatus != 1 && <View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ fontSize: 11 }}>{data.mileageInfo.distanceCount ? `${data.mileageInfo.distanceCount}` : '0'}</Text>
                            <Text style={{ fontSize: 11 }}>总里程</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ fontSize: 11 }}>{data.mileageInfo.load_distance ? `${data.mileageInfo.load_distance}` : '0'}</Text>
                            <Text style={{ fontSize: 11 }}>重载里程</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ fontSize: 11 }}>{data.mileageInfo.no_load_distance ? `${data.mileageInfo.no_load_distance}` : '0'}</Text>
                            <Text style={{ fontSize: 11 }}>空载里程</Text>
                        </View>
                    </View>
                    <FlatList
                        data={data.taskList}
                        renderItem={({ item, index }) => this.renderTaskItem(item, index)} />
                </View>}
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
