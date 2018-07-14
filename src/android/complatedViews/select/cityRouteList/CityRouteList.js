import React from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { Container, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../../GlobalStyles'

const CityRouteList = props => {
    const { cityRouteListReducer: { data: { cityRouteList }, getCityRouteList }, onSelect } = props
    if (getCityRouteList.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <FlatList
                    keyExtractor={(item, index) => index}
                    data={cityRouteList}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.item} onPress={() => {
                                onSelect(item)
                                Actions.pop()
                            }}>
                                <View>
                                    <Text style={globalStyles.midText}>{`${item.id}`}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>{item.city_route_start ? item.city_route_start : ''}</Text>
                                    <Text style={[globalStyles.midText, globalStyles.styleColor, { paddingHorizontal: 10 }]}>--></Text>
                                    <Text style={[globalStyles.midText, globalStyles.styleColor]}>{item.city_route_end ? item.city_route_end : ''}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </Container>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        cityRouteListReducer: state.cityRouteListReducer
    }
}

export default connect(mapStateToProps)(CityRouteList)



const styles = StyleSheet.create({
    item: {
        marginHorizontal: 15,
        paddingVertical: 15,
        borderColor: '#ddd',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

