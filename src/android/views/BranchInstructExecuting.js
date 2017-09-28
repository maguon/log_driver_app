import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ActivityIndicator
} from 'react-native'
import { Icon, Button } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import * as branchInstructExecutingAction from '../../actions/BranchInstructExecutingAction'

class BranchInstructExecuting extends Component {
    constructor(props) {
        super(props)
        this.renderListItem = this.renderListItem.bind(this)
    }

    componentDidMount() {
        this.props.getRouteLoadTaskList({
            requiredParam: {
                dpRouteLoadTaskId: this.props.initParam.loadTaskInfo.id
            }
        })
    }

    renderListItem(item, key) {
        return <View key={key} style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: '#ccc' }}>
            <View style={{ flexDirection: 'row', flex: 7 }}>
                <Icon name='ios-car' style={{ fontSize: 15, color: '#8b959b' }} />
                <Text style={{ color: '#ccc', fontSize: 11, paddingLeft: 10 }}>VIN码：<Text style={{ color: item.exception_status == 1 ? '#d69aa5' : '#8b959b' }}>{item.vin ? item.vin : ''}</Text></Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 2 }}>
                <Text style={{ color: '#8b959b', fontSize: 11 }}>{item.make_name ? item.make_name : ''}</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'flex-end' }}>
                <Text style={{ color: '#00cade', fontSize: 11 }}>{item.car_load_status == 1 && '已装车'}{item.car_load_status == 2 && '已送达'}</Text>
                <Text style={{ color: '#d69aa5', fontSize: 11, paddingLeft: 8 }}>{item.exception_status == 1 && '异常'}</Text>
            </View>
        </View>
    }


    render() {
        console.log(this.props.initParam)
        console.log(this.props.branchInstructExecutingReducer)
        const { loadTaskInfo } = this.props.initParam
        const { routeLoadTaskList } = this.props.branchInstructExecutingReducer.data
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 200, backgroundColor: '#8b959b' }}>
                    <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', margin: 10, padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#00cade' }}>{loadTaskInfo.addr_name ? loadTaskInfo.addr_name : ''} </Text>
                            <Text style={{ paddingHorizontal: 5 }}>--></Text>
                            <Text style={{ color: '#00cade' }}>{loadTaskInfo.city_name ? loadTaskInfo.city_name : ''}</Text>
                            <Text style={{ paddingLeft: 20, color: '#00cade' }}>{loadTaskInfo.short_name ? loadTaskInfo.short_name : ''}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons name='my-location' style={{ fontSize: 15, color: '#d69aa5' }} />
                            <Text style={{ paddingLeft: 10 }}>当前位置</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    padding: 10,
                    backgroundColor: '#eff3f5',
                    justifyContent: 'space-between',
                    borderColor: '#ccc',
                    borderBottomWidth: 0.5,
                    borderTopWidth: 0.5
                }}>
                    <View>
                        <Text style={{ color: '#8b959b' }}>计划运送：{loadTaskInfo.plan_count ? `${loadTaskInfo.plan_count}` : '0'}</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#8b959b' }}>实际送达：<Text style={{ color: '#00cade' }}>{loadTaskInfo.car_count ? `${loadTaskInfo.car_count}` : '0'}</Text></Text>
                    </View>
                    <View>
                        <Text style={{ color: '#8b959b' }}>异常：<Text style={{ color: '#d69aa5' }}>{loadTaskInfo.car_exception_count ? `${loadTaskInfo.car_exception_count}` : '0'}</Text></Text>
                    </View>
                </View>
                <FlatList
                    data={routeLoadTaskList}
                    renderItem={({ item, index }) => this.renderListItem(item, index)} />
                {/* <View style={{ justifyContent: 'flex-end', alignSelf: 'flex-end', paddingTop: 10, paddingRight: 10 }}>
                    <Button small rounded onPress={() => { }} style={{ backgroundColor: '#00cade' }}>
                        <Text style={{ color: '#fff' }}>完成</Text>
                    </Button>
                </View> */}
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        branchInstructExecutingReducer: state.branchInstructExecutingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRouteLoadTaskList: (param) => {
        dispatch(branchInstructExecutingAction.getRouteLoadTaskList(param))
    },
    setGetRouteLoadTaskListWaiting: () => {
        dispatch(branchInstructExecutingAction.setGetRouteLoadTaskListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchInstructExecuting)
