import React from 'react'
import { View, FlatList } from 'react-native'
import { Container } from 'native-base'
import { connect } from 'react-redux'
import InsuranceListItem from '../modules/InsuranceListItem'

const TrailerInsurance = props => {
    const { trailerInsuranceReducer: { data: { trailerInsuranceList } } } = props
    // console.log('trailerInsuranceList',trailerInsuranceList)
    return (
        <Container style={{ backgroundColor: '#edf1f4' }}>
            <FlatList
                style={{ padding: 10 }}
                keyExtractor={(item, index) => `${index}`}
                data={trailerInsuranceList}
                ListFooterComponent={<View style={{ height: 20, backgroundColor: '#edf1f4' }} />}
                renderItem={({ item, index }) => <InsuranceListItem insuranceItem={item} key={index} />}
            />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        trailerInsuranceReducer: state.trailerInsuranceReducer,
    }
}

export default connect(mapStateToProps)(TrailerInsurance)
