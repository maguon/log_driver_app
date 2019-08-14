import React from 'react'
import { View, Text, FlatList} from 'react-native'
import { Container, Spinner } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import moment from 'moment'

const NotSettleList = props => {
    const { notSettleListReducer: { data: { notSettleList }, getNotSettleList } } = props
    if (getNotSettleList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    }
    else {
        return (
            <Container>
                <FlatList
                    contentContainerStyle={{ padding: 7.5 }}
                    keyExtractor={(item, index) => `${index}`}
                    data={notSettleList}
                    renderItem={({ item }) => {
                        const { vin = '', make_name = '', route_end = '', route_start = '', dp_route_task_id = '', e_short_name = '', r_short_name = '', arrive_date } = item
                        return (
                            <View style={{ margin: 7.5, borderWidth: 0.5, borderColor: '#ddd' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, borderBottomColor: '#ddd', padding: 10 }}>
                                    <Text style={[globalStyles.largeText, globalStyles.styleColor]}>VIN:{vin}</Text>
                                    <Text style={globalStyles.midText}>{make_name}</Text>
                                </View>
                                <View style={{ padding: 5 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                                        <Text style={[globalStyles.midText]}>{route_start} - {route_end}</Text>
                                        <Text style={globalStyles.midText}>调度编号：{dp_route_task_id}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                                        <Text style={[globalStyles.midText]}>委托方：{e_short_name}</Text>
                                        <Text style={globalStyles.midText}>经销商：{r_short_name}</Text>
                                    </View>
                                    <View style={{ padding: 5 }}>
                                        <Text style={[globalStyles.midText]}>{arrive_date ? moment(`${arrive_date}`).format('YYYYMMDD HH-mm-ss') : ''}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }} />
            </Container>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        notSettleListReducer: state.notSettleListReducer
    }
}


export default connect(mapStateToProps)(NotSettleList)
