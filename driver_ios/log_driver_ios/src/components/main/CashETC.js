import React ,{Component}from 'react'
import {Text, TouchableOpacity, FlatList, StyleSheet, View, ActivityIndicator, InteractionManager} from 'react-native'
import {Container, Card, CardItem, Body, Spinner, Icon} from "native-base"
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'
import moment from 'moment'


class CashETC extends  Component {
    constructor(props){
        super(props)

    }

    componentWillMount() {
        this.props.getCashETC()
    }

    render() {
        const {cashETCReducer: {data: {CashETC, isComplete}, getCashETC}, cashETCReducer, getCashETCMore} = this.props
        console.log("getCashETC.isResultStatus",getCashETC.isResultStatus)
        if (getCashETC.isResultStatus == 1) {
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
                        data={CashETC}
                        renderItem={renderItem}
                        onEndReachedThreshold={0.2}
                        ListEmptyComponent={renderEmpty}
                        onEndReached={() => {
                            if (getCashETC.isResultStatus == 2 && !isComplete) {
                                getCashETCMore()
                            }
                        }}
                        ListFooterComponent={cashETCReducer.getCashETCMore.isResultStatus == 1 ? ListFooterComponent :
                            <View/>}

                    />
                </Container>
            )
        }
    }
}



const renderItem = props => {
    const { item } = props
     console.log('item',item)
    return (
        <TouchableOpacity>
            <Card style={{ backgroundColor: '#fff' }}>
                <CardItem header style={{ justifyContent: 'space-between' }}>
                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>现金过路费编号：{item.id ? `${item.id}` : ''}</Text>
                </CardItem>

                <CardItem style={{ flexDirection: 'column' }}>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' , height:30}}>
                    <Text style={[globalStyles.smallText,{fontWeight:"bold" }]}>过路费：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.etc_fee ? `${item.etc_fee}` : '0'}元</Text> </Text>
                    </Body>

                    <Body footer style={{  flexDirection: 'row', justifyContent: 'space-between' , height:30 }}>
                    <Text style={globalStyles.smallText}>打款时间：{item.etc_date ? `${moment(item.etc_date).format('YYYY-MM-DD')}` : ''}</Text>
                    </Body>
                </CardItem>

            </Card>
        </TouchableOpacity>
    )
}


const renderEmpty = () =>{
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无现金ETC记录</Text>
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
        cashETCReducer: state.cashETCReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCashETCMore: () => {
        dispatch(actions.cashETCAction.getCashETCMore())
    },
    getCashETC: () => {
        dispatch(actions.cashETCAction.getCashETC())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CashETC)


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
