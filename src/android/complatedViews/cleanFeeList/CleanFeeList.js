import React from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    InteractionManager
} from 'react-native'
import { Container ,Spinner} from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../GlobalStyles'



const renderItem = props => {
    const { item } = props
    console.log('item', item)
    return (
        <View style={{ padding: 7.5, margin: 7.5, borderWidth: 0.5, borderColor: '#ddd' }}>
            <View style={{ padding: 7.5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[globalStyles.midText]}>洗车费：{item.actual_price ? `${item.actual_price}` : '0'}元</Text>
                <Text style={[globalStyles.midText]}>拖车费：{item.total_trailer_fee ? `${item.total_trailer_fee}` : '0'}元</Text>
            </View>
            <View style={{ padding: 7.5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[globalStyles.midText]}>提车费：{item.car_parking_fee ? `${item.car_parking_fee}` : '0'}元</Text>
                <Text style={[globalStyles.midText]}>地跑费：{item.total_run_fee ? `${item.total_run_fee}` : '0'}元</Text>
            </View>
            <View style={{ padding: 7.5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[globalStyles.midText]}>带路费：{item.lead_fee ? `${item.lead_fee}` : '0'}元</Text>
                {item.status == 0 && <Text style={[globalStyles.midText]}>状态：驳回</Text>}
                {item.status == 1 && <Text style={[globalStyles.midText]}>状态：未领取</Text>}
                {item.status == 2 && <Text style={[globalStyles.midText]}>状态：已领取</Text>}
            </View>
        </View>
    )
}

const renderEmpty = () => {
    return (
        <View style={styles.listEmptyContainer}>
            <Text style={[globalStyles.largeText, styles.listEmptyText]}>暂无洗车记录</Text>
        </View>
    )
}


const CleanFeeList = props => {
    const { cleanFeeListReducer, cleanFeeListReducer: { data: { cleanFeeList } ,getCleanFeeList:{isResultStatus}} } = props
    console.log('cleanFeeListReducer', cleanFeeListReducer)
    if(isResultStatus==1){
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }else{
        return (
            <Container>
                <FlatList
                    contentContainerStyle={{ padding: 7.5 }}
                    keyExtractor={(item, index) => index}
                    data={cleanFeeList}
                    renderItem={renderItem}
                    ListEmptyComponent={renderEmpty}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cleanFeeListReducer: state.cleanFeeListReducer
    }
}


export default connect(mapStateToProps)(CleanFeeList)


const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#fff',
        padding: 5,
        margin: 5,
        borderWidth: 0.3,
        borderColor: '#ddd'
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 5,
        marginBottom: 5,
        paddingHorizontal: 5,
        borderBottomWidth: 0.3,
        borderColor: '#ddd'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5
    },
    itemWarnColor: {
        color: '#fe7378'
    },
    itemBlockIcon: {
        color: '#bbb',
        fontSize: 16,
        width: 20,
        textAlign: 'center'
    },
    itemBlockMaterialIcon: {
        width: 20,
        textAlign: 'center'
    },
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    },
    itemBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemBlockText: {
        paddingLeft: 5,
    },
    itemBlockTitle: {

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