import React,{Component}  from 'react'
import {
    Text,
    View,
    Modal,
    TouchableHighlight,
    Dimensions,
    InteractionManager, TouchableOpacity, StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button, Icon, } from 'native-base'
import globalStyles, { textColor } from '../utils/GlobalStyles'
import { reduxForm, Field } from 'redux-form'
import DatePicker from '../utils/DatePicker'
import Select from '../modules/Select'
import TextBox from '../utils/TextBox'
import * as actions from '../../actions/index'
import DisposableList from './DisposableList'
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";


const { width } = Dimensions.get('window')
const margin = 15

class DemageResponsibilityListOperation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            endDateTimePickerVisible: false,
            search:{"accidentDateStart":"", "accidentDateEnd":""},
            startValue:'',
            endValue:'',
            damageId:'',
            value:'',
            dateIdStart: moment().format('YYYY-MM-01'),
            dateIdEnd: moment().format('YYYY-MM-DD')
        };

        this.setModalVisible = this.setModalVisible.bind(this)
        this.showDateTimePicker = this.showDateTimePicker.bind(this)
        this.EndDateTimePicker = this.EndDateTimePicker.bind(this)
    }

    showDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: true});
    };
    EndDateTimePicker = () => {
        this.setState({endDateTimePickerVisible: true})
    };

    hideDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: false});
    };
    hideEndDateTimePicker = () => {
        this.setState({endDateTimePickerVisible: false});
    }
    handleDatePicked = date => {
        this.state.dateIdStart = moment(date).format('YYYY-MM-DD')
        this.state.startValue=this.state.dateIdStart
        this.hideDateTimePicker();
    };
    handleEndDatePicked = date => {
        this.state.dateIdEnd = moment(date).format('YYYY-MM-DD')
        this.state.endValue=this.state.dateIdEnd
        this.hideEndDateTimePicker();
    };
    setModalVisible() {
        this.state.search ={"dateIdStart":this.state.dateIdStart, "dateIdEnd":this.state.dateIdEnd}
    }


    render() {
        const {
            cleanCarList, demageResponsibilityListOperationReducer: {status}, changeStatus,
        } = this.props
        return (
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Button transparent onPress={() => changeStatus(true)}>
                    <Icon name='md-search' color='#fff'/>
                </Button>
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={status}
                    onRequestClose={() => changeStatus(!status)}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{backgroundColor: '#fff', borderRadius: 3}}>
                            <Field name='damageId'
                                   label='质损编号：'
                                   component={TextBox}
                                   itemStyle={{width: width - 90, marginLeft: 15}}/>
                            <Field
                                itemStyle={{width: width - 90}}
                                last={true}
                                label='vin：'
                                name='car'
                                component={Select}
                                getList={() => {
                                }}
                                getListWaiting={() => {
                                }}
                                showList={({onSelect}) => {
                                    return Actions.listCennectDynamic({
                                        mapStateToProps: vinMapStateToProps,
                                        mapDispatchToProps: vinMapDispatchToProps,
                                        List: DisposableList,
                                        onSelect: (param) => {
                                            cleanCarList()
                                            onSelect(param)
                                        }
                                    })
                                }}/>



                            {/*<Field name='createdOnStart'*/}
                                   {/*label='起始时间：'*/}
                                   {/*last={true}*/}
                                   {/*component={DatePicker}*/}
                                   {/*itemStyle={{width: width - 90}}/>*/}
                            {/*<Field name='createdOnEnd'*/}
                                   {/*last={true}*/}
                                   {/*label='终止时间：'*/}
                                   {/*component={DatePicker}*/}
                                   {/*itemStyle={{width: width - 90}}*/}
                            {/*/>*/}

                            <TouchableOpacity
                                style={ styles.lastBody}
                                onPress={this.showDateTimePicker}>
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                    cancelTextIOS={"取消"}
                                    confirmTextIOS={"确认"}
                                    cancelTextStyle={{fontSize: 20}}
                                    confirmTextStyle={{fontSize: 20}}
                                    titleIOS={"日期选择"}
                                    mode={"date"}
                                    locale={"zh-Hans"}
                                />
                                <View style={[styles.item, {width: width - 90 }]}>
                                    <Text style={[globalStyles.midText]}>起始时间：{this.state.startValue}</Text>
                                    <Icon name='ios-arrow-down' color='#777' fontSize={15} style={{fontSize: 18, color: '#777'}}/>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={ styles.lastBody}
                                onPress={this.EndDateTimePicker}>
                                <DateTimePicker
                                    isVisible={this.state.endDateTimePickerVisible}
                                    onConfirm={this.handleEndDatePicked}
                                    onCancel={this.hideEndDateTimePicker}
                                    cancelTextIOS={"取消"}
                                    confirmTextIOS={"确认"}
                                    cancelTextStyle={{fontSize: 20}}
                                    confirmTextStyle={{fontSize: 20}}
                                    titleIOS={"日期选择"}
                                    mode={"date"}
                                    locale={"zh-Hans"}
                                />
                                <View style={[styles.item, {width: width - 90 }]}>
                                    <Text style={[globalStyles.midText]}>终止时间：{this.state.endValue}</Text>
                                    <Icon name='ios-arrow-down' color='#777' fontSize={15} style={{fontSize: 18, color: '#777'}}/>
                                </View>
                            </TouchableOpacity>

                            <TouchableHighlight underlayColor={'rgba(0,202,222,0.2)'}
                                                style={{
                                                    alignItems: 'center',
                                                    borderBottomRightRadius: 3,
                                                    borderBottomLeftRadius: 3,
                                                    padding: 20
                                                }}
                                                onPress={() => {
                                                    changeStatus(!status)
                                                    this.props.getDemageResponsibilityListWaiting()
                                                    this.setModalVisible()
                                                    InteractionManager.runAfterInteractions(this.props.getDemageResponsibilityList(this.state.search))
                                                }}>
                                <Text>确定</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const vinMapStateToProps = (state) => {
    return {
        listReducer: {
            Action: state.selectCarReducer.getCarList,
            //MoreAction: state.selectCarReducer.getCarListMore,
            data: {
                list: state.selectCarReducer.data.carList.map(item => {
                    return {
                        id: item.id,
                        value: item.vin
                    }
                })
            }
        }
    }
}

const vinMapDispatchToProps = (dispatch) => ({
    // getListMore: () => {
    //     dispatch(selectCarAction.getCarListMore())
    // }
})



const mapStateToProps = (state) => {
    return {
        demageResponsibilityListOperationReducer: state.demageResponsibilityListOperationReducer,
        initialValues:{
            car:{}
        }
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getDemageResponsibilityList: (param) => {
        // console.log(param)
        dispatch(actions.demageResponsibilityListAction.getDemageResponsibilityList(param))
    },
    getDemageResponsibilityListWaiting: () => {
        dispatch(actions.demageResponsibilityListAction.getDemageResponsibilityListWaiting())
    },
    cleanCarList: () => {
        dispatch(actions.selectCarAction.cleanCarList())
    },
    changeStatus: (status) => {
        dispatch(actions.demageResponsibilityListOperationAction.changeStatus(status))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'demageResponsibilitySearchForm'
    })(DemageResponsibilityListOperation)
)


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
    lastBody: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: margin,
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
