import React from 'react'
import {  FlatList, View } from 'react-native'
import { Container} from 'native-base'
import { connect } from 'react-redux'
import RepairRecordListItem from '../modules/RepairRecordListItem'

const TrailerRepairList = props => {
    const { trailerRepairListReducer: { data: { trailerRepairList } } } = props
    console.log('trailerRepairList', trailerRepairList)
    return (
        <Container style={{ backgroundColor: '#edf1f4' }}>
            <FlatList
                style={{ padding: 10 }}
                keyExtractor={(item, index) => `${index}`}
                data={trailerRepairList}
                renderItem={({ item, index }) => <RepairRecordListItem key={index} repairItem={item} />}
                ListFooterComponent={<View style={{ height: 20, backgroundColor: '#edf1f4' }} />}
            />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        trailerRepairListReducer: state.trailerRepairListReducer
    }
}

export default connect(mapStateToProps)(TrailerRepairList)

