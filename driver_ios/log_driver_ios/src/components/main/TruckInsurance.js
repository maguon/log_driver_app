import React from 'react'
import { View, FlatList } from 'react-native'
import { Container } from 'native-base'
import { connect } from 'react-redux'
import InsuranceListItem from '../modules/InsuranceListItem'

const TruckInsurance = props => {
    const { truckInsuranceReducer: { data: { truckInsuranceList } } } = props
    return (
        <Container style={{ backgroundColor: '#edf1f4' }}>
            <FlatList
                style={{ padding: 10 }}
                keyExtractor={(item, index) => `${index}`}
                data={truckInsuranceList}
                ListFooterComponent={<View style={{ height: 20, backgroundColor: '#edf1f4' }} />}
                renderItem={({ item, index }) => <InsuranceListItem insuranceItem={item} key={index} />}
            />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        truckInsuranceReducer: state.truckInsuranceReducer,
    }
}


export default connect(mapStateToProps)(TruckInsurance)
