import React, {Component} from 'react'
import {
    Text,
    View,
    FlatList,
    ActivityIndicator,
    InteractionManager, TouchableOpacity
} from 'react-native'
import {Container, Icon, Spinner} from 'native-base'
import {connect} from 'react-redux'
import moment from 'moment'
import fuelFillingTypeList from '../../config/fuelFillingType'
import globalStyles, {styleColor} from '../utils/GlobalStyles'
import * as actions from '../../actions/index'
import DateTimePicker from "react-native-modal-datetime-picker";
import {Actions} from "react-native-router-flux";


class FuelFillingRecord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDateTimePickerVisible: false,
            endDateTimePickerVisible: false,
            dateIdStart: moment().format('YYYY-MM-01'),
            dateIdEnd: moment().format('YYYY-MM-DD')
        }

        this.renderListItem = this.renderListItem.bind(this)
        this.renderFooter = this.renderFooter.bind(this)

        this.onSearch = this.onSearch.bind(this)
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
        this.hideDateTimePicker();
    };

    handleEndDatePicked = date => {
        this.state.dateIdEnd = moment(date).format('YYYY-MM-DD')
        this.hideEndDateTimePicker();
    };

    componentWillMount() {
        this.onSearch()
    }

    componentDidMount() {
        this.props.getFuelFillingRecordWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getFuelFillingRecord())
    }

    renderListItem(item, index) {
        return (
            <View key={index} style={{
                backgroundColor: '#fff',
                marginHorizontal: 10,
                marginTop: 10,
                borderWidth: 0.5,
                borderColor: '#ccc',
                padding: 10
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 10,
                    borderColor: '#ccc',
                    borderBottomWidth: 0.5,
                    alignItems: 'flex-end'
                }}>
                    <Text
                        style={globalStyles.smallText}>{item.date_id ? moment(`${item.date_id}`).format('YYYY-MM-DD') : ''}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={[globalStyles.smallText, {borderColor: '#ccc', fontWeight: 'bold'}]}>加油量：</Text>
                        <Text style={[globalStyles.smallText, {
                            color: '#fa7377',
                            paddingLeft: 3
                        }]}>{item.oil ? item.oil : '0'}</Text>
                        <Text style={[globalStyles.smallText, {paddingLeft: 3}]}>升</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={[globalStyles.smallText, {borderColor: '#ccc', fontWeight: 'bold'}]}>加尿素量：</Text>
                        <Text style={[globalStyles.smallText, {
                            color: '#fa7377',
                            paddingLeft: 3
                        }]}>{item.urea ? item.urea : '0'}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[globalStyles.smallText, {fontWeight: 'bold'}]}>加油地：
                        <Text style={[globalStyles.smallText, {fontWeight: '100'}]}>
                            {item.oil_address ? item.oil_address : ''}
                            <Text style={[globalStyles.smallText, {
                                color: styleColor,
                                paddingLeft: 3
                            }]}>{item.oil_address_type ? `(${fuelFillingTypeList.find(typeItem => typeItem.id == item.oil_address_type).value})` : ''}</Text>
                        </Text></Text>
                </View>
            </View>
        )
    }

    renderFooter() {
        if (this.props.fuelFillingRecordReducer.getFuelFillingRecordMore.isResultStatus == 1) {
            return (
                <View>
                    <ActivityIndicator
                        animating={this.props.fuelFillingRecordReducer.getFuelFillingRecordMore.isResultStatus == 1}
                        style={{height: 40}}
                        color={styleColor}
                        size="small"
                    />
                </View>
            )
        } else {
            return <View style={{height: 10}}/>
        }

    }

    onSearch() {

        InteractionManager.runAfterInteractions(() =>
        this.props.getFuelFillingRecord({
                    dateIdStart: this.state.dateIdStart,
                    dateIdEnd: this.state.dateIdEnd
        }))
    }

    render() {
        const {form: {fuelFillingSearch}, fuelFillingRecordReducer: {getFuelFillingRecord}} = this.props
        if (getFuelFillingRecord.isResultStatus == 1) {
            return (
                <Container style={{backgroundColor: '#edf1f4'}}>
                    <Spinner color={styleColor}/>
                </Container>
            )
        } else {
            return (
                <Container style={{backgroundColor: '#edf1f4'}}>
                    <FlatList
                        ref='fuelFillingFlatList'
                        keyExtractor={(item, index) => `${index}`}
                        data={this.props.fuelFillingRecordReducer.data.fuelFillingRecordList}
                        renderItem={({item, index}) => {
                            return this.renderListItem(item, index)
                        }}
                        onEndReachedThreshold={1}
                        onEndReached={this.props.getFuelFillingRecordMore}
                        ListFooterComponent={this.renderFooter()}
                        ListHeaderComponent={<Header fuelFillingRecordReducer={this.props.fuelFillingRecordReducer}
                                                     fuelFillingSearch={fuelFillingSearch}
                                                     dateIdStart={this.state.dateIdStart}
                                                     showDateTimePicker={this.showDateTimePicker}
                                                     isDateTimePickerVisible={this.state.isDateTimePickerVisible}
                                                     handleDatePicked={this.handleDatePicked}
                                                     hideDateTimePicker={this.hideDateTimePicker}
                                                     EndDateTimePicker={this.EndDateTimePicker}
                                                     endDateTimePickerVisible={this.state.endDateTimePickerVisible}
                                                     handleEndDatePicked={this.handleEndDatePicked}
                                                     hideEndDateTimePicker={this.hideEndDateTimePicker}
                                                     dateIdEnd={this.state.dateIdEnd}
                                                     onSearch={this.onSearch}
                        />}
                    />
                </Container>
            )
        }
    }
}


const Header = props => {
    const {
        fuelFillingRecordReducer: {data: {total: {oilDateStart, oilDateEnd, oil_money, urea_money}}}, fuelFillingRecordReducer,
        showDateTimePicker, isDateTimePickerVisible, handleDatePicked, hideDateTimePicker, dateIdStart, EndDateTimePicker, endDateTimePickerVisible
        , handleEndDatePicked, hideEndDateTimePicker, dateIdEnd, onSearch
    } = props
    console.log('props', props)
    return (
        <View>
            <View style={{
                backgroundColor: '#f1f8f9',
                borderWidth: 0.5,
                borderColor: '#fff',
                marginHorizontal: 10,
                padding: 10,
                marginBottom: 10
            }}>
                <View style={{flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#ccc', paddingBottom: 10}}>

                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={showDateTimePicker}>
                        <DateTimePicker
                            isVisible={isDateTimePickerVisible}
                            onConfirm={handleDatePicked}
                            onCancel={hideDateTimePicker}
                            cancelTextIOS={"取消"}
                            confirmTextIOS={"确认"}
                            cancelTextStyle={{fontSize: 20}}
                            confirmTextStyle={{fontSize: 20}}
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
                                <Text style={[globalStyles.smallText, globalStyles.styleColor]}>{dateIdStart}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/*<Text style={[globalStyles.smallText, globalStyles.styleColor]}>{oilDateStart}</Text>*/}

                    <View style={{paddingHorizontal: 20}}>
                        <Text style={[globalStyles.smallText]}>至</Text>
                    </View>

                    <TouchableOpacity
                        style={{flex: 1}}
                        onPress={EndDateTimePicker}>
                        <DateTimePicker
                            isVisible={endDateTimePickerVisible}
                            onConfirm={handleEndDatePicked}
                            onCancel={hideEndDateTimePicker}
                            cancelTextIOS={"取消"}
                            confirmTextIOS={"确认"}
                            cancelTextStyle={{fontSize: 20}}
                            confirmTextStyle={{fontSize: 20}}
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
                                <Text style={[globalStyles.smallText, globalStyles.styleColor]}>{dateIdEnd}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/*<Text style={[globalStyles.smallText, globalStyles.styleColor]}>{oilDateEnd}</Text>*/}
                    <TouchableOpacity
                        onPress={onSearch}>
                        <View style={{paddingRight: 10, justifyContent: 'center'}}>
                            <Icon name='ios-search' style={{fontSize: 18}}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{paddingTop: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={globalStyles.smallText}>加油总额：</Text>
                            <Text style={[globalStyles.smallText, {paddingLeft: 3}]}>¥</Text>
                            <Text style={[globalStyles.smallText, {
                                color: '#fa7377',
                                paddingLeft: 3
                            }]}>{oil_money ? oil_money : '0'}</Text>
                            <Text style={[globalStyles.smallText, {paddingLeft: 3}]}>元</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <Text style={globalStyles.smallText}>加尿素总额：</Text>
                            <Text style={[globalStyles.smallText, {paddingLeft: 3}]}>¥</Text>
                            <Text style={[globalStyles.smallText, {
                                color: '#fa7377',
                                paddingLeft: 3
                            }]}>{urea_money ? urea_money : '0'}</Text>
                            <Text style={[globalStyles.smallText, {paddingLeft: 3}]}>元</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        fuelFillingRecordReducer: state.fuelFillingRecordReducer,
        form: state.form
    }
}

const mapDispatchToProps = (dispatch) => ({
    getFuelFillingRecord: (param) => {
        dispatch(actions.fuelFillingRecordAction.getFuelFillingRecord(param))
    },
    getFuelFillingRecordWaiting: () => {
        dispatch(actions.fuelFillingRecordAction.getFuelFillingRecordWaiting())
    },
    getFuelFillingRecordMore: () => {
        dispatch(actions.fuelFillingRecordAction.getFuelFillingRecordMore())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(FuelFillingRecord)
