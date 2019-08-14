import React from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import globalStyles from '../utils/GlobalStyles'

const ReceiveForCleanRel = props => {
    // console.log('props', props)
    const { receiveForCleanRelReducer: { data: { receive } } } = props
    return (
        <Container>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>大车洗车费</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{receive.big_clean_fee ? `${receive.big_clean_fee}` : '0'}元</Text>
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>小车洗车费</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{receive.clean_fee ? `${receive.clean_fee}` : '0'}元</Text>
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>拖车费</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{receive.trailer_fee ? `${receive.trailer_fee}` : '0'}元</Text>
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>地跑费</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{receive.run_fee ? `${receive.run_fee}` : '0'}元</Text>
            </View>
            <View style={[styles.listItemBorderBottom, styles.listItemPadding, styles.listItemBody]}>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>带路费</Text>
                <Text style={[globalStyles.midText, styles.listItemPadding]}>{receive.lead_fee ? `${receive.lead_fee}` : '0'}元</Text>
            </View>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        receiveForCleanRelReducer: state.receiveForCleanRelReducer
    }
}

export default connect(mapStateToProps)(ReceiveForCleanRel)


const styles = StyleSheet.create({
    listItemHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    listItemHeaderNo: {
        color: '#766978',
        fontWeight: '300'
    },
    listItemHeaderDate: {
        color: '#a098a1'
    },
    listItemPadding: {
        padding: 7.5
    },
    listItemBorderBottom: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#dfdfdf'
    },
    listItemBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fontColor: {
        color: '#bd417c'
    }
})
