import React, {Component} from 'react'
import {
    Text,
    View,
    InteractionManager,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native'
import {Icon, Container} from 'native-base'
import moment from 'moment'
import {Actions} from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {connect} from 'react-redux'
import * as actions from '../../actions/index'
import globalStyles, {styleColor} from '../utils/GlobalStyles'
import DateTimePicker from "react-native-modal-datetime-picker"

const window = Dimensions.get('window')

class Work extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDateTimePickerVisible: false,
            endDateTimePickerVisible:false,
            dateIdStart: moment().format('YYYY-MM-01'),
            dateIdEnd: moment().format('YYYY-MM-DD')
        }
        // this.showPicker = this.showPicker.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.renderTaskItem = this.renderTaskItem.bind(this)
        this.showDateTimePicker=this.showDateTimePicker.bind(this)
        this.EndDateTimePicker=this.EndDateTimePicker.bind(this)
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    EndDateTimePicker = () => {
        this.setState({ endDateTimePickerVisible: true })
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    hideEndDateTimePicker = () => {
        this.setState({endDateTimePickerVisible: false});
    }
    handleDatePicked = date => {
        // console.log("A date has been picked: ", date);

       this.state.dateIdStart=moment(date).format('YYYY-MM-DD')
        // console.log("this.state.dateIdStart ", this.state.dateIdStart);
        this.hideDateTimePicker();
    };

    handleEndDatePicked = date => {
        // console.log("A date has been picked: ", date);
        this.state.dateIdEnd=moment(date).format('YYYY-MM-DD')
        this.hideEndDateTimePicker();
    };


    onSearch() {
        const {user} = this.props.loginReducer.data
        this.props.setGetMileageInfoWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getMileageInfo({
            mileageInfoParam: {
                OptionalParam: {
                    taskStatus: 9,
                    dateIdStart: this.state.dateIdStart,
                    dateIdEnd: this.state.dateIdEnd
                }
            },
            taskListParam: {
                OptionalParam: {
                    taskStatus: 10,
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
        // console.log('item',item)
        return <TouchableOpacity
            key={key}
            onPress={() => Actions.instruct({initParam: {routeInfo: item}})}>
            <View style={{marginHorizontal: 10, marginTop: 10, borderColor: '#ccc', borderWidth: 0.5}}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#eff3f5',
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialCommunityIcons name='truck' size={20} color={styleColor}/>
                        <Text style={{
                            fontSize: 15,
                            color: '#8b959b',
                            fontWeight: 'bold',
                            paddingLeft: 10
                        }}>{item.city_route_start ? item.city_route_start : ''}</Text>
                        <MaterialCommunityIcons name='transfer-right' size={20}
                                                style={{paddingLeft: 5, color: '#8c989f'}}/>
                        <Text style={{
                            fontSize: 15,
                            color: '#8b959b',
                            fontWeight: 'bold',
                            paddingLeft: 5
                        }}>{item.city_route_end ? item.city_route_end : ''}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {item.reverse_flag == 1 && <Text style={[globalStyles.smallText, {color: '#8e9fa3'}]}>倒板</Text>}
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 15,
                            color: '#8b959b',
                            fontWeight: 'bold'
                        }}>{item.distance ? `${item.distance}` : '0'}公里</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    paddingTop: 10,
                    paddingHorizontal: 10,
                    justifyContent: 'space-between'
                }}>
                    <View>
                        <Text
                            style={{fontSize: 11}}>计划时间：{item.task_plan_date ? moment(new Date(item.task_plan_date)).format('YYYY-MM-DD') : ''}</Text>
                    </View>
                    <View>
                        <Text
                            style={{fontSize: 11}}>完成时间：{item.task_end_date ? moment(new Date(item.task_end_date)).format('YYYY-MM-DD HH:mm:ss') : ''}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', padding: 10, justifyContent: 'flex-end'}}>
                    <View>
                        <Text style={{fontSize: 11}}>实际送达：{item.car_count ? `${item.car_count}` : '0'}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    }


    componentDidMount() {
        const {user} = this.props.loginReducer.data
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
        const {data} = this.props.workReducer
        const {getWorkMileageInfo} = this.props.workReducer

        let sum=0
        if(data.mileageInfo.load_distance && data.mileageInfo.distanceCount){
           sum=data.mileageInfo.load_distance / data.mileageInfo.distanceCount
        }

        return (
            <Container style={{backgroundColor: '#fff'}}>
                <View style={[styles.borderShadow,{flexDirection: 'column', backgroundColor: '#f2f5f7',borderWidth: 1,borderColor: '#dbdbdb'}]}>
                    <View style={{alignItems: 'center'}}>
                        <View style={{
                            flexDirection: 'row', marginTop: 10, height: 40,
                            borderRadius: 5, backgroundColor: '#fff', alignItems: 'center', width: window.width * 0.9
                        }}>
                            <TouchableOpacity
                                style={{flex: 1}}
                                onPress={this.showDateTimePicker}>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                    cancelTextIOS={"取消"}
                                    confirmTextIOS={"确认"}
                                    cancelTextStyle={{fontSize:20}}
                                    confirmTextStyle={{fontSize:20}}
                                    titleIOS={"日期选择"}
                                    mode={"date"}
                                    locale={"zh-Hans"}

                                />
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 1,
                                    justifyContent: 'center'
                                }}>
                                    <View>
                                        <Text style={{fontSize: 14}}>{this.state.dateIdStart}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{paddingHorizontal: 10}}>
                                <Text style={{fontSize: 14}}>至</Text>
                            </View>
                            <TouchableOpacity
                                style={{flex: 1}}
                                onPress={this.EndDateTimePicker}>
                                <DateTimePicker
                                    isVisible={this.state.endDateTimePickerVisible}
                                    onConfirm={this.handleEndDatePicked}
                                    onCancel={this.hideEndDateTimePicker}
                                    cancelTextIOS={"取消"}
                                    confirmTextIOS={"确认"}
                                    cancelTextStyle={{fontSize:20}}
                                    confirmTextStyle={{fontSize:20}}
                                    titleIOS={"日期选择"}
                                    mode={"date"}
                                    locale={"zh-Hans"}
                                />
                                <View style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <View>
                                        <Text style={{fontSize: 14}}>{this.state.dateIdEnd}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.onSearch}>
                                <View style={{paddingRight: 10, justifyContent: 'center'}}>
                                    <Icon name='ios-search' style={{fontSize: 25}}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection: 'column',alignItems: 'center'}}>
                        <View style={{paddingVertical: 10}}>
                            <Text style={{fontSize: 18,  width: window.width * 0.9}}>总里程
                                <Text style={{fontSize: 20, color: styleColor}}>
                                    {data.mileageInfo.distanceCount ? `${data.mileageInfo.distanceCount}` : '0'}
                                </Text>
                                公里
                            </Text>
                        </View>

                        <View style={{alignItems: 'center'}}>
                            <View style={{
                                height: 8,
                                width: window.width * 0.9,
                                borderRadius: 20,
                                backgroundColor: '#e7e7e7'
                            }}>

                                <View style={{
                                    height: 8,
                                    width: window.width *0.9*sum,
                                    borderRadius: 20,
                                    backgroundColor: styleColor
                                }}>

                                </View>
                            </View>
                        </View>

                        <View style={{alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',width: window.width * 0.9}}>
                            <View style={{alignItems: 'flex-start'}}>
                                <MaterialCommunityIcons name='triangle' size={10} color={styleColor} ></MaterialCommunityIcons>
                            <View style={{ paddingVertical: 10}}>
                                <Text
                                    style={[globalStyles.smallText]}>重载里程：{data.mileageInfo.load_distance ? `${data.mileageInfo.load_distance}` : '0'}公里</Text>
                            </View>
                            </View>
                            <View style={{alignItems: 'flex-end'}}>
                                <MaterialCommunityIcons name='triangle' size={10} color={styleColor} ></MaterialCommunityIcons>

                            <View style={{ paddingVertical: 10}}>
                                <Text
                                    style={[globalStyles.smallText]}>空载里程：{data.mileageInfo.no_load_distance ? `${data.mileageInfo.no_load_distance}` : '0'}公里</Text>
                            </View>
                            </View>
                            </View>
                        </View>

                    </View>
                </View>
                {getWorkMileageInfo.isResultStatus == 1 &&
                <View style={{backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator
                        animating={getWorkMileageInfo.isResultStatus == 1}
                        style={{height: 80}}
                        size="large"
                    />
                </View>}
                {getWorkMileageInfo.isResultStatus != 1 && <Container>

                    <FlatList
                        keyExtractor={(item, index) => `${index}`}
                        data={data.taskList}
                        renderItem={({item, index}) => this.renderTaskItem(item, index)}/>
                </Container>}

            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        workReducer: state.workReducer,
        loginReducer: state.loginReducer,
        communicationSettingReducer:state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMileageInfo: (param) => {
        dispatch(actions.workAction.getMileageInfo(param))
    },
    setGetMileageInfoWaiting: () => {
        dispatch(actions.workAction.setGetMileageInfoWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Work)

const styles = StyleSheet.create({
    borderShadow:{
        shadowOffset:{ width:5, height:5 },
        shadowColor:'black',
        shadowOpacity:0.2,
        shadowRadius:2,
    },
})
