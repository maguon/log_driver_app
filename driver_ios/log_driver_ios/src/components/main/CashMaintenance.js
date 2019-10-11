import React ,{Component}from 'react'
import {Text, TouchableOpacity, FlatList, StyleSheet, View, ActivityIndicator, InteractionManager} from 'react-native'
import {Container, Card, CardItem, Body, Spinner, Icon} from "native-base"
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import moment from 'moment'


class CashMaintenance extends  Component {
    constructor(props){
        super(props)

    }

    componentWillMount() {
        this.props.getCashMaintenance()
    }

    render() {
        const {cashMaintenanceReducer: {data: {CashMaintenance, isComplete}, getCashMaintenance}, cashMaintenanceReducer, getCashMaintenanceMore} = this.props
        console.log("getCashRefueling.isResultStatus",getCashMaintenance.isResultStatus)
        if (getCashMaintenance.isResultStatus == 1) {
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
                        data={CashMaintenance}
                        renderItem={renderItem}
                        onEndReachedThreshold={0.2}
                        ListEmptyComponent={renderEmpty}
                        onEndReached={() => {
                            if (getCashMaintenance.isResultStatus == 2 && !isComplete) {
                                getCashMaintenanceMore()
                            }
                        }}
                        ListFooterComponent={cashMaintenanceReducer.getCashMaintenanceMore.isResultStatus == 1 ? ListFooterComponent :
                            <View/>}

                    />
                </Container>
            )
        }
    }
}



const renderItem = props => {
    const { item } = props
    // console.log('item',item)
    return (
        <TouchableOpacity>
            <Card style={{ backgroundColor: '#fff' }}>
                <CardItem header style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>现金维修编号：{item.id ? `${item.id}` : ''}</Text>
                </CardItem>

                <CardItem style={{ flexDirection: 'column' }}>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' , height:30}}>
                    <Text style={[globalStyles.smallText,{fontWeight:"bold" }]}>维修金额：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.repair_money ? `${item.repair_money}` : '0'}元</Text> </Text>
                    <Text style={globalStyles.smallText}>配件金额：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.parts_money ? `${item.parts_money}` : '0'}元</Text></Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' , height:30}}>
                    <Text style={globalStyles.smallText}>保养金额：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.maintain_money ? `${item.maintain_money}` : '0'}元</Text></Text>
                    </Body>
                    <Body footer style={{  flexDirection: 'row', justifyContent: 'space-between' , height:30 }}>
                    <Text style={globalStyles.smallText}>打款时间：{item.repair_date ? `${moment(item.repair_date).format('YYYY-MM-DD')}` : ''}</Text>
                    </Body>
                </CardItem>

            </Card>
        </TouchableOpacity>
    )
}


const renderEmpty = () =>{
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无现金维修记录</Text>
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
        cashMaintenanceReducer: state.cashMaintenanceReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCashMaintenanceMore: () => {
        dispatch(actions.cashMaintenanceAction.getCashMaintenanceMore())
    },
    getCashMaintenance: () => {
        dispatch(actions.cashMaintenanceAction.getCashMaintenance())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CashMaintenance)


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
