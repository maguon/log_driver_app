import React from 'react'
import {  FlatList, View } from 'react-native'
import { Container, Spinner } from 'native-base'
import { connect } from 'react-redux'
import RepairRecordListItem from '../modules/RepairRecordListItem'
import  { styleColor } from '../utils/GlobalStyles'


const TruckRepairList = props => {
    const { truckRepairListReducer: { data: { truckRepairList }, getTruckRepairList } } = props
    if (getTruckRepairList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container style={{ backgroundColor: '#edf1f4' }}>
                <FlatList
                    style={{padding:10}}
                    keyExtractor={(item, index) => `${index}`}
                    data={truckRepairList}
                    renderItem={({ item, index }) => <RepairRecordListItem key={index} repairItem={item} />}
                    ListFooterComponent={<View style={{ height: 20, backgroundColor: '#edf1f4' }} />}
                />
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        truckRepairListReducer: state.truckRepairListReducer
    }
}

export default connect(mapStateToProps)(TruckRepairList)

