import React, {Component} from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    Linking, Alert,

} from 'react-native'
import {Icon, Button} from 'native-base'
import {connect} from 'react-redux'
import {MapView, Marker} from 'react-native-amap3d'
import globalStyles, {styleColor} from '../utils/GlobalStyles'
import * as routerDirection from '../../util/RouterDirection'
import * as actions from '../../actions/index'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


class BranchInstruct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
        this.renderListItem = this.renderListItem.bind(this)
    }

    componentDidMount() {
        // console.log('this.props',this.props)
        this.props.setGetRouteLoadTaskListWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getRouteLoadTaskList({
            requiredParam: {
                dpRouteLoadTaskId: this.props.initParam.routeLoadInfo.id
            },
            OptionalParam: {
                receiveId: this.props.initParam.routeLoadInfo.receive_id,
            },
            dpRouteTaskId: this.props.initParam.routeLoadInfo.dp_route_task_id
        }))
    }

    renderListItem(item, key) {
        return <View key={key} style={{
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            borderBottomWidth: 0.5,
            borderColor: '#ccc'
        }}>
            <View style={{flexDirection: 'row', flex: 7}}>
                <Icon name='ios-car' style={{fontSize: 15, color: '#8b959b'}}/>
                <Text style={[globalStyles.smallText, {color: '#ccc', paddingLeft: 10}]}>VIN码：<Text
                    style={{color: item.exception_status == 1 ? '#d69aa5' : '#8b959b'}}>{item.vin ? item.vin : ''}</Text></Text>
            </View>
            <View style={{flexDirection: 'row', flex: 2}}>
                <Text style={[globalStyles.smallText, {color: '#8b959b'}]}>{item.make_name ? item.make_name : ''}</Text>
            </View>
            <View style={{flexDirection: 'row', flex: 2, justifyContent: 'flex-end'}}>
                <Text
                    style={[globalStyles.smallText, {color: styleColor}]}>{item.car_load_status == 1 && '已装车'}{item.car_load_status == 2 && '已送达'}</Text>
                {/* <Text style={{ color: '#d69aa5', fontSize: 11, paddingLeft: 8 }}>{item.exception_status == 1 && '异常'}</Text> */}
            </View>
        </View>
    }


    render() {
        const {routeLoadInfo} = this.props.initParam
        const {routeLoadTaskList, cleanCar, loadTaskInfo, contactList} = this.props.branchInstructReducer.data
        const {getRouteLoadTaskList} = this.props.branchInstructReducer
        console.log('this.props', this.props)
        const {getCleanFeeListWaiting, getCleanFeeList, parent} = this.props
        // console.log('this.props.branchInstructReducer',this.props.branchInstructReducer)
        // console.log('routeLoadInfo',routeLoadInfo)
        if (getRouteLoadTaskList.isResultStatus == 1) {
            return (
                <View style={{backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator
                        animating={getRouteLoadTaskList.isResultStatus == 1}
                        style={{height: 80}}
                        size="large"
                    />
                </View>
            )
        } else {
            return (
                <View style={{flex: 1,backgroundColor:'#fff'}}>
                    <View style={{height: 200, backgroundColor: '#8b959b'}}>
                        {this.props.branchInstructReducer.data.loadTaskInfo.lat && this.props.branchInstructReducer.data.loadTaskInfo.lng &&
                        <MapView
                            locationEnabled
                            zoomLevel={14}
                            coordinate={this.props.branchInstructReducer.data.loadTaskInfo.lat && this.props.branchInstructReducer.data.loadTaskInfo.lng ? {
                                latitude: this.props.branchInstructReducer.data.loadTaskInfo.lat,
                                longitude: this.props.branchInstructReducer.data.loadTaskInfo.lng
                            } : {latitude: 38.92, longitude: 121.60}}
                            showsZoomControls={false}
                            rotateEnabled={true}
                            showsCompass={true}
                            style={{flex: 1}}
                        >
                            <Marker
                                image='flag'
                                title=''
                                coordinate={this.props.branchInstructReducer.data.loadTaskInfo.lat && this.props.branchInstructReducer.data.loadTaskInfo.lng ? {
                                    latitude: this.props.branchInstructReducer.data.loadTaskInfo.lat,
                                    longitude: this.props.branchInstructReducer.data.loadTaskInfo.lng
                                } : {latitude: 38.92, longitude: 121.60}}
                            />
                        </MapView>}
                        {(!this.props.branchInstructReducer.data.loadTaskInfo.lat || !this.props.branchInstructReducer.data.loadTaskInfo.lng) &&
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#fff'}}>未设置目的地经纬度</Text>
                        </View>}
                        <View style={{
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            flexDirection: 'row',
                            padding: 5,
                            top: 0,
                            left: 0,
                            justifyContent: 'space-between',
                            position: 'absolute'
                        }}>
                            <Text style={[globalStyles.midText, {color: styleColor, fontWeight: 'bold'}]}>
                                {routeLoadInfo.addr_name ? routeLoadInfo.addr_name : ''}{routeLoadInfo.load_task_type == 2 &&
                            <Text style={{color: 'red'}}>(转)</Text>} -->
                                {routeLoadInfo.transfer_flag == 0 && routeLoadInfo.city_name ? ` ${routeLoadInfo.city_name}` : ''}{routeLoadInfo.transfer_flag == 0 && ' - '}{routeLoadInfo.transfer_flag == 0 && routeLoadInfo.short_name ? routeLoadInfo.short_name : ''}
                                {routeLoadInfo.transfer_flag == 1 && routeLoadInfo.transfer_city_name ? ` ${routeLoadInfo.transfer_city_name}` : ''}{routeLoadInfo.transfer_flag == 1 && ' - '}{routeLoadInfo.transfer_flag == 1 && routeLoadInfo.transfer_addr_name ? routeLoadInfo.transfer_addr_name : ''}
                                {routeLoadInfo.transfer_flag == 1 && <Text style={{color: 'red'}}>(转)</Text>}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        padding: 15,
                        backgroundColor: '#f2f5f7',
                        justifyContent: 'space-between',
                        borderColor: '#ccc',
                        borderTopWidth: 0.5,
                        alignItems: 'center'
                    }}>
                        <View style={{flex: 3.5}}>
                            <Text
                                style={[globalStyles.largeText, {color: styleColor}]}>前往：{loadTaskInfo.short_name ? loadTaskInfo.short_name : ''}{routeLoadInfo.make_name ? `(${routeLoadInfo.make_name})` : ''}</Text>
                            <Text
                                style={[globalStyles.smallText, {color: '#8b959b', paddingTop: 5}]}>
                                <MaterialIcons name='place' size={15}/>
                                {loadTaskInfo.address ? loadTaskInfo.address : ''}</Text>
                        </View>
                        <View style={{flex: 0.5}}>
                            <Button small style={{
                                width: 30,
                                height: 30,
                                alignSelf: 'center',
                                backgroundColor: styleColor,
                                justifyContent: 'center'
                            }} onPress={() => {
                                if (contactList.length > 0) {
                                    this.setState({modalVisible: true})
                                } else {
                                    // Toast.show({text: '该经销商暂无联系人'})
                                    Alert.alert(
                                        '',
                                        '该经销商暂无联系人',
                                        [
                                            {text: '确定', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                        ],
                                        {cancelable: false}
                                    )
                                }
                            }}>
                                <MaterialIcons name='local-phone' style={{color: '#fff'}} size={20}/>
                            </Button>
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
                            <Text
                                style={[globalStyles.midText, {color: '#8b959b'}]}>计划运送：{routeLoadInfo.plan_count ? `${routeLoadInfo.plan_count}` : '0'}</Text>
                        </View>
                        <View>
                            <Text style={[globalStyles.midText, {color: '#8b959b'}]}>实际送达：<Text
                                style={{color: styleColor}}>{routeLoadInfo.car_count ? `${routeLoadInfo.car_count}` : '0'}</Text></Text>
                        </View>

                    </View>
                    {cleanCar.cleanRelStatus && <View style={{
                        flexDirection: 'row',
                        padding: 15,
                        backgroundColor: '#eff3f5',
                        justifyContent: 'flex-end',
                        borderColor: '#ccc',
                        borderBottomWidth: 0.5
                    }}>
                        <Button small style={{backgroundColor: styleColor}}
                                onPress={() => {
                                    getCleanFeeListWaiting()
                                    routerDirection.cleanFeeList(parent)()
                                    InteractionManager.runAfterInteractions(() =>
                                        getCleanFeeList({
                                            dpRouteTaskId: routeLoadInfo.dp_route_task_id,
                                            dpRouteLoadTaskId: routeLoadInfo.id
                                        }))
                                }}>
                            <Text style={[globalStyles.midText, {color: '#fff'}]}>查看洗车费</Text>
                        </Button>
                    </View>}
                    <FlatList
                        keyExtractor={(item, index) => `${index}`}
                        data={routeLoadTaskList}
                        renderItem={({item, index}) => this.renderListItem(item, index)}/>
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.setState({modalVisible: false})}
                    >
                        <TouchableOpacity
                            onPress={() => this.setState({modalVisible: false})}
                            style={{
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
                                <View style={{borderBottomWidth: 1, borderColor: styleColor}}>
                                    <Text style={[globalStyles.midText, {
                                        paddingVertical: 10,
                                        color: styleColor,
                                        textAlign: 'center'
                                    }]}>联系人</Text>
                                </View>
                                <FlatList
                                    keyExtractor={(item, index) => index}
                                    data={contactList}
                                    renderItem={({item, index}) => {
                                        return (
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                paddingHorizontal: 15,
                                                alignItems: 'center',
                                                borderBottomWidth: 0.5,
                                                borderColor: '#ccc'
                                            }}>
                                                {/* <Icon name='ios-person' style={{ flex: 1, fontSize: 20, color: '#ccc' }} /> */}
                                                <Text style={[globalStyles.midText, {
                                                    paddingVertical: 15,
                                                    flex: 4
                                                }]}>{item.contacts_name ? `${item.contacts_name}` : ''} {item.position ? `(${item.position})` : ''}</Text>
                                                <Text style={[globalStyles.midText, {
                                                    paddingVertical: 15,
                                                    flex: 3,
                                                    textAlign: 'center'
                                                }]}>{item.tel}</Text>
                                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                                    <TouchableOpacity style={{
                                                        width: 30,
                                                        height: 30,
                                                        backgroundColor: styleColor,
                                                        borderRadius: 15,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}
                                                                      onPress={() => {
                                                                          if (item.tel) {
                                                                              const url = `tel:${item.tel}`
                                                                              Linking.canOpenURL(url).then(supported => {
                                                                                  if (!supported) {
                                                                                      console.log('Can\'t handle url: ' + url);
                                                                                  } else {
                                                                                      this.setState({modalVisible: false})
                                                                                      return Linking.openURL(url);
                                                                                  }
                                                                              }).catch(err => console.log('An error occurred', err));
                                                                          }
                                                                      }}>
                                                        <Icon name='ios-call' style={{fontSize: 20, color: '#fff'}}/>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    }}/>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        branchInstructReducer: state.branchInstructReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRouteLoadTaskList: (param) => {
        dispatch(actions.branchInstructAction.getRouteLoadTaskList(param))
    },
    setGetRouteLoadTaskListWaiting: () => {
        dispatch(actions.branchInstructAction.setGetRouteLoadTaskListWaiting())
    },
    getCleanFeeList: req => {
        dispatch(actions.cleanFeeListAction.getCleanFeeList(req))
    },
    getCleanFeeListWaiting: () => {
        dispatch(actions.cleanFeeListAction.getCleanFeeListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BranchInstruct)
