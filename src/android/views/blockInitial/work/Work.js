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
import { Icon,Container } from 'native-base'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import * as workAction from './WorkAction'
import globalStyles, { styleColor } from '../../../GlobalStyles'

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
        const { user } = this.props.loginReducer.data
        this.props.setGetMileageInfoWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getMileageInfo({
            mileageInfoParam: {
                OptionalParam: {
                    taskStatus: 9,
                    // loadDistance: 5,
                    // noLoadDistance: 5,
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
                    userId: user.uid
                }
            }
        }))
    }

    renderTaskItem(item, key) {
        console.log('item',item)
        return <TouchableOpacity
            key={key}
            onPress={() => Actions.instruct({ initParam: { routeInfo: item } })}>
            <View style={{ marginHorizontal: 10, marginTop: 10, borderColor: '#ccc', borderWidth: 0.5 }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#eff3f5', padding: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='truck' size={20} color={styleColor} />
                        <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold', paddingLeft: 10 }}>{item.city_route_start ? item.city_route_start : ''}</Text>
                        <MaterialCommunityIcons name='ray-start-arrow' size={20} style={{ paddingLeft: 5, color: '#8c989f' }} />
                        <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold', paddingLeft: 5 }}>{item.city_route_end ? item.city_route_end : ''}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {item.reverse_flag == 1 && <Text style={[globalStyles.smallText, { color: '#8e9fa3' }]}>倒板</Text>}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>{item.distance ? `${item.distance}` : '0'}公里</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10,paddingHorizontal:10, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 11 }}>计划时间：{item.task_plan_date ? moment(new Date(item.task_plan_date)).format('YYYY-MM-DD') : ''}</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 11 }}>完成时间：{item.task_end_date ? moment(new Date(item.task_end_date)).format('YYYY-MM-DD HH:mm:ss') : ''}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'flex-end' }}>
                    <View>
                        <Text style={{ fontSize: 11 }}>实际送达：{item.car_count ? `${item.car_count}` : '0'}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    }


    componentDidMount() {
        const { user } = this.props.loginReducer.data
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
                    userId: user.uid
                }
            }
        }))
    }

    render() {
        const { data } = this.props.workReducer
        const { getWorkMileageInfo } = this.props.workReducer
        return (
            <Container>
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
                {getWorkMileageInfo.isResultStatus != 1 && <Container>
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
                        keyExtractor={(item, index) => index}
                        data={data.taskList}
                        renderItem={({ item, index }) => this.renderTaskItem(item, index)} />
                </Container>}

            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        workReducer: state.workReducer,
        loginReducer: state.loginReducer
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
