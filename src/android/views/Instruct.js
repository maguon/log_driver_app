import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native'
import { Icon } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { connect } from 'react-redux'
import * as instructAction from '../../actions/InstructAction'
import moment from 'moment'

class Instruct extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getRouteTaskList({ OptionalParam: { dpRouteTaskId: this.props.initParam.routeInfo.id } })
        console.log(this.props.initParam)
    }

    render() {
        console.log(this.props.instructReducer)
        const { routeInfo } = this.props.initParam
        return (
            <View>
                <View style={{ backgroundColor: '#eff3f5', padding: 10, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <View>
                        <Text style={{ fontSize: 11, color: '#8b959b' }}>
                            指令编号：{routeInfo.id ? `${routeInfo.id}` : ''}
                        </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row', backgroundColor: '#eff3f5', paddingTop: 10, alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcons name='truck' size={20} color='#00cade' />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                                <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>{routeInfo.city_route_start ? routeInfo.city_route_start : ''} --> {routeInfo.city_route_end ? routeInfo.city_route_end : ''}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                                <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}><Text style={{ color: '#d69aa5' }}>{routeInfo.distance ? `${routeInfo.distance}` : ''}</Text>公里</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='ios-clock-outline' style={{ fontSize: 15, color: '#8b959b' }} />
                            <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>指定执行时间：2017-09-08</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='ios-person' style={{ fontSize: 15, color: '#8b959b' }} />
                            <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>指定调度：张三丰</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='ios-car' style={{ fontSize: 15, color: '#8b959b' }} />
                            <Text style={{ fontSize: 11, paddingLeft: 5, color: '#8b959b' }}>计划运送：14</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 11, color: '#8b959b' }}>实际运送：<Text style={{ color: '#00cade' }}>16</Text></Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 11, color: '#8b959b' }}>异常：<Text style={{ color: '#d69aa5' }}>1</Text></Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 11, color: '#00cade' }}>完成</Text>
                        </View>
                    </View>
                </View>
                <TouchableNativeFeedback
                    onPress={() => { }}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ccc', padding: 10, alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>大连 --> 沈阳</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 40 }}>
                                    <Text style={{ fontSize: 15, color: '#8b959b', fontWeight: 'bold' }}>经销商一</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'left', flex: 1 }}>计划运送：14</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'right', flex: 1 }}>实际运送：<Text style={{ color: '#00cade' }}>16</Text></Text>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'right', flex: 1 }}>异常：<Text style={{ color: '#d69aa5' }}>1</Text></Text>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <Text style={{ fontSize: 11, color: '#8b959b', textAlign: 'right', flex: 1 }}>已送达</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <EvilIcons name='chevron-right' size={40} color='#8b959b' />
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        instructReducer: state.instructReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRouteTaskList: (param) => {
        dispatch(instructAction.getRouteTaskList(param))
    },
    setGetRouteTaskListWaiting: () => {
        dispatch(instructAction.setGetRouteTaskListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Instruct)
