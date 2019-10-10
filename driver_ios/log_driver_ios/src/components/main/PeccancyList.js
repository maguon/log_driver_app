import React ,{Component}from 'react'
import {Text, TouchableOpacity, FlatList, StyleSheet, View, ActivityIndicator, InteractionManager} from 'react-native'
import {Container, Card, CardItem, Body, Spinner, Icon} from "native-base"
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import moment from 'moment'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "react-native-modal-datetime-picker";

class PeccancyList extends  Component {
    constructor(props){
        super(props)

        this.state = {
            isDateTimePickerVisible: false,
            endDateTimePickerVisible: false,
            dateIdStart: moment().format('YYYY-MM-01'),
            dateIdEnd: moment().format('YYYY-MM-DD')
        }

        this.onSearch = this.onSearch.bind(this)
        this.showDateTimePicker = this.showDateTimePicker.bind(this)
        this.EndDateTimePicker = this.EndDateTimePicker.bind(this)
    }

    componentWillMount() {
        this.onSearch()
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
        console.log("A date has been picked: ", date);
        this.state.dateIdStart = moment(date).format('YYYY-MM-DD')
        console.log("this.state.dateIdStart ", this.state.dateIdStart);
        this.hideDateTimePicker();
    };

    handleEndDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.state.dateIdEnd = moment(date).format('YYYY-MM-DD')
        this.hideEndDateTimePicker();
    };


    onSearch() {

        InteractionManager.runAfterInteractions(() =>

            this.props.getPeccancyList({
                dateIdStart: this.state.dateIdStart,
                dateIdEnd: this.state.dateIdEnd
            }))

    }


render() {
    const {peccancyListReducer: {data: {peccancyList, isComplete}, getPeccancyList}, peccancyListReducer, getPeccancyListMore} = this.props
    if (getPeccancyList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor}/>
            </Container>
        )
    } else {
        return (
            <Container style={{backgroundColor: '#f5f5f5'}}>
                <FlatList
                    contentContainerStyle={{padding: 7.5}}
                    keyExtractor={(item, index) => `${index}`}
                    data={peccancyList}
                    renderItem={renderItem}
                    onEndReachedThreshold={0.2}
                    ListEmptyComponent={renderEmpty}
                    onEndReached={() => {
                        if (getPeccancyList.isResultStatus == 2 && !isComplete) {
                            getPeccancyListMore()
                        }
                    }}
                    ListFooterComponent={peccancyListReducer.getPeccancyListMore.isResultStatus == 1 ? ListFooterComponent :
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
    const { item } = props
    // console.log('item',item)
    return (
        <TouchableOpacity onPress={() => Actions.peccancyInfo({ initParam: { peccancyId: item.id } })}>
            <Card style={{ backgroundColor: '#fff' }}>
                <CardItem header style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>违章扣款编号：{item.id ? `${item.id}` : ''}</Text>
                </CardItem>
                <CardItem style={{ flexDirection: 'column' }}>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' , height:30}}>
                    <Text style={[globalStyles.smallText,{fontWeight:"bold" }]}>货车牌号：{item.truck_num ? `${item.truck_num}` : ''} </Text>
                    <Text style={globalStyles.smallText}>扣分：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.fine_score ? `${item.fine_score}` : '0'}</Text></Text>
                    </Body>
                    <Body footer style={{  flexDirection: 'row', justifyContent: 'space-between' , height:30 }}>
                    <Text style={globalStyles.smallText}>违章时间：{item.start_date ? `${moment(item.start_date).format('YYYY-MM-DD')}` : ''}</Text>
                    {item.handle_date&&<Text style={globalStyles.smallText}>处理时间：{`${moment(item.handle_date).format('YYYY-MM-DD')}` }</Text>}
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' , height:30}}>
                    <Text style={globalStyles.smallText}>个人承担罚款：</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome name="rmb" size={15} color={'#838485'}/>
                        <Text style={{ color: 'red', fontSize:20 , marginLeft:5}}>{item.under_money ? `${item.under_money}` : '0'}</Text>
                    </View>

                    </Body>
                </CardItem>

            </Card>
        </TouchableOpacity>
    )
}


 const renderEmpty = () =>{
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无违章扣款记录</Text>
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
        peccancyListReducer: state.peccancyListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getPeccancyListMore: (param) => {
        dispatch(actions.peccancyListAction.getPeccancyListMore(param))
    },
    getPeccancyList: (param) => {
        dispatch(actions.peccancyListAction.getPeccancyList(param))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(PeccancyList)


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
