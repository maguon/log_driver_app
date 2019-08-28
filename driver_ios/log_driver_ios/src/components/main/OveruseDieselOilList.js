import React,{Component} from 'react'
import {Text, FlatList, StyleSheet, View, ActivityIndicator, InteractionManager, TouchableOpacity} from 'react-native'
import {Container, Card, CardItem, Body, Spinner, Icon} from "native-base"
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import moment from 'moment'
import DateTimePicker from "react-native-modal-datetime-picker";


class OveruseDieselOilList extends Component{
    constructor(props){
        super(props)

        this.state = {
            isDateTimePickerVisible: false,
            endDateTimePickerVisible: false,
            dateIdStart: moment().format('YYYY-MM'),
            dateIdEnd: moment().format('YYYY-MM')
        }

        this.onSearch = this.onSearch.bind(this)
        this.showDateTimePicker = this.showDateTimePicker.bind(this)
        this.EndDateTimePicker = this.EndDateTimePicker.bind(this)
    }


    showDateTimePicker = (date) => {

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
        console.log("A date has been picked: ", date);
        this.state.dateIdStart = moment(date).format('YYYY-MM')
        console.log("this.state.dateIdStart ", this.state.dateIdStart);
        this.hideDateTimePicker();
    };

    handleEndDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.state.dateIdEnd = moment(date).format('YYYY-MM')
        this.hideEndDateTimePicker();
    };


    onSearch() {

        InteractionManager.runAfterInteractions(() =>
            this.props.getOveruseDieselOilList({
                dateIdStart: this.state.dateIdStart,
                dateIdEnd: this.state.dateIdEnd
            }))
    }

  render(){
    const { overuseDieselOilListReducer: { data: { overuseDieselOilList, isComplete }, getOveruseDieselOilList },
        getDpRouteTaskWaiting, getDpRouteTask, overuseDieselOilListReducer, getOveruseDieselOilListMore } = this.props
    if (getOveruseDieselOilList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container style={{backgroundColor: '#f5f5f5'}}>
                <FlatList
                    contentContainerStyle={{padding: 7.5}}
                    keyExtractor={(item, index) => `${index}`}
                    data={overuseDieselOilList}
                    renderItem={({item}) => renderItem({item, getDpRouteTaskWaiting, getDpRouteTask})}
                    onEndReachedThreshold={0.2}
                    ListEmptyComponent={renderEmpty}
                    onEndReached={() => {
                        if (getOveruseDieselOilList.isResultStatus == 2 && !isComplete) {
                            getOveruseDieselOilListMore()
                        }
                    }}
                    ListFooterComponent={overuseDieselOilListReducer.getOveruseDieselOilListMore.isResultStatus == 1 ? ListFooterComponent :
                        <View/>}

                    ListHeaderComponent={<Header dateIdStart={this.state.dateIdStart}
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
    const {showDateTimePicker, isDateTimePickerVisible, handleDatePicked, hideDateTimePicker,
        dateIdStart, EndDateTimePicker, endDateTimePickerVisible
        , handleEndDatePicked, hideEndDateTimePicker, dateIdEnd, onSearch
    } = props
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

                    <TouchableOpacity
                        onPress={onSearch}>
                        <View style={{paddingRight: 10, justifyContent: 'center'}}>
                            <Icon name='ios-search' style={{fontSize: 18}}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const renderItem = props => {
    const { item} = props
    return (
        <View >
            <Card style={{ backgroundColor: '#fff' }}>
                <CardItem header style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>超油结算编号：{item.id ? `${item.id}` : ''}</Text>
                </CardItem>
                <CardItem style={{ flexDirection: 'column' }}>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>计划用油量：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.plan_oil ? `${item.plan_oil}` : '0'}</Text>  L</Text>
                        <Text style={globalStyles.smallText}>计划尿素量：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.plan_urea ? `${item.plan_urea}` : '0'}</Text></Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>实际用油量：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.actual_oil ? `${item.actual_oil}` : '0'}</Text>  L</Text>
                        <Text style={globalStyles.smallText}>实际尿素：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.actual_urea ? `${item.actual_urea}` : '0'}</Text></Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={globalStyles.smallText}>超量油：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.exceed_oil ? `${item.exceed_oil}` : '0'}</Text>  L</Text>
                        <Text style={globalStyles.smallText}>超量尿素：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.exceed_urea ? `${item.exceed_urea}` : '0'}</Text></Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between',alignSelf:'flex-end' }}>
                        <Text style={globalStyles.smallText}>核油日期：{item.oil_date ? `${moment(item.oil_date).format('YYYY-MM-DD')}` : ''}</Text>
                    </Body>
                </CardItem>
            </Card>
        </View>
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无超油扣款记录</Text>
        </View>
    )
}

const ListFooterComponent = () => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}



const mapStateToProps = (state) => {
    return {
        overuseDieselOilListReducer: state.overuseDieselOilListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getOveruseDieselOilListMore: () => {
        dispatch(actions.overuseDieselOilListAction.getOveruseDieselOilListMore())
    },
    getOveruseDieselOilList: (param) => {
        dispatch(actions.overuseDieselOilListAction.getOveruseDieselOilList(param))
    },
    getDpRouteTaskWaiting: () => {
        dispatch(actions.overuseDieselOilInfoAction.getDpRouteTaskWaiting())
    },
    getDpRouteTask: (param) => {
        dispatch(actions.overuseDieselOilInfoAction.getDpRouteTask(param))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(OveruseDieselOilList)

const styles = StyleSheet.create({
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    },
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    footerText: {
        paddingLeft: 10
    }
})

