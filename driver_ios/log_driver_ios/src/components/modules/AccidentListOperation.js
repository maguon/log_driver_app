import React, {Component} from 'react'
import {
    Text,
    View,
    Modal,
    TouchableHighlight,
    Dimensions,
    InteractionManager, TouchableOpacity, StyleSheet
} from 'react-native'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import {Button, Icon,} from 'native-base'
import {reduxForm, Field} from 'redux-form'
import * as actions from '../../actions/index'
import globalStyles from '../utils/GlobalStyles'
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";

const {width} = Dimensions.get('window')
const margin = 15


class AccidentListOperation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            isDateTimePickerVisible: false,
            endDateTimePickerVisible: false,
            search:'',
            startValue:'',
            endValue:'',
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

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
       this.state.search ={"accidentDateStart":this.state.dateIdStart, "accidentDateEnd":this.state.dateIdEnd}
    }


    render() {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Button transparent onPress={() => this.setModalVisible(true)}>
                    <Icon name='md-search' color='#fff'/>
                </Button>
                <Button transparent onPress={Actions.applyAccident}>
                    <Icon name='md-add' color='#fff'/>
                </Button>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{backgroundColor: '#fff', borderRadius: 3}}>
                            {/*<Field name='accidentDateStart'*/}
                                   {/*component={DatePickerStart}*/}
                                   {/*label='起始时间：'*/}
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


                            {/*<Field name='accidentDateEnd'*/}
                                   {/*last={true}*/}
                                   {/*label='终止时间：'*/}
                                   {/*component={DatePickerEnd}*/}
                                   {/*itemStyle={{width: width - 90}}*/}
                            {/*/>*/}
                            <TouchableHighlight underlayColor={'rgba(0,202,222,0.2)'}
                                                style={{
                                                    alignItems: 'center',
                                                    borderBottomRightRadius: 3,
                                                    borderBottomLeftRadius: 3,
                                                    padding: 20
                                                }}
                                                onPress={() => {
                                                    this.setModalVisible(!this.state.modalVisible)
                                                    InteractionManager.runAfterInteractions(this.props.getAccidentList(this.state.search))

                                                }}>
                                <Text style={globalStyles.midText}>确定</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}



const mapDispatchToProps = (dispatch) => ({
    getAccidentList: (param) => {
        dispatch(actions.accidentListAction.getAccidentList(param))
    },
    getAccidentListWaiting: () => {
        dispatch(actions.accidentListAction.getAccidentListWaiting())
    }
})

export default connect(null, mapDispatchToProps)(
    reduxForm({
        form: 'accidentSearchForm'
    })(AccidentListOperation)
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
