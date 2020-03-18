import React, { Component } from 'react'
import {Container,Spinner, CardItem, Body,Card} from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import * as actions from '../../actions/index'
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import moment from "moment";




class AFine extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getAFineWaiting()
        this.props.getAFine()

    }

    render() {
        const {aFineReducer: {data: {AFine, isComplete}, getAFine}, aFineReducer, getAFineMore} = this.props
        // console.log("getAFine.isResultStatus",getAFine.isResultStatus)
        if (getAFine.isResultStatus == 1) {
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
                        data={AFine}
                        renderItem={renderItem}
                        onEndReachedThreshold={0.2}
                        ListEmptyComponent={renderEmpty}
                        onEndReached={() => {
                            if (getAFine.isResultStatus == 2 && !isComplete) {
                                getAFineMore()
                            }
                        }}
                        ListFooterComponent={aFineReducer.getAFineMore.isResultStatus == 1 ? ListFooterComponent :
                            <View/>}

                    />
                </Container>
            )
        }
    }
}



const renderItem = props => {
    const { item} = props
    console.log('item',item)
    return (
        <TouchableOpacity >
            <Card style={{ backgroundColor: '#fff' }}>

                <CardItem style={{ flexDirection: 'column' }}>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' , height:30}}>
                    <Text style={[globalStyles.midText,{fontWeight:"bold" }]}>编号：{item.id ? `${item.id}` : ''}</Text>
                    <Text style={[globalStyles.midText,{fontWeight:"bold" }]}>暂扣月份：{item.created_on ? `${moment(item.created_on).format('YYYY-MM')}` : ''}</Text>
                    </Body>
                    <Body style={{ flexDirection: 'row', justifyContent: 'space-between' , height:30}}>
                    <Text style={[globalStyles.smallText]}>质损暂扣：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.damage_retain_fee ? `${item.damage_retain_fee}` : '0'}元</Text></Text>
                    <Text style={[globalStyles.smallText]}>质安罚款：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.damage_op_fee ? `${item.damage_op_fee}` : '0'}元</Text> </Text>
                    </Body>

                    <Body footer style={{  flexDirection: 'row', justifyContent: 'space-between' , height:30 }}>
                    <Text style={globalStyles.smallText}>交车暂扣：<Text style={{ color: 'red', fontWeight: 'bold' }}>{item.truck_retain_fee ? `${item.truck_retain_fee}` : '0'}元</Text></Text>
                    </Body>
                </CardItem>

            </Card>
        </TouchableOpacity>
    )
}


const renderEmpty = () =>{
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无现金加油记录</Text>
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
        aFineReducer: state.aFineReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

    getAFine: () => {
        dispatch(actions.aFineAction.getAFine())
    },
    getAFineWaiting: () => {
        dispatch(actions.aFineAction.getAFineWaiting())
    },
    getAFineMore: () => {
        dispatch(actions.aFineAction.getAFineMore())
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(AFine)

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
