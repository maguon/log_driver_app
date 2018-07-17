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

const BaseAddrList = props => {
    const { baseAddrListReducer: { data: { baseAddrList }, getBaseAddrList }, onSelect } = props
    if (getBaseAddrList.isResultStatus == 1) {
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
                    data={baseAddrList}
                    renderItem={({ item, index }) => {
                        console.log('item',item)
                        return (
                            <TouchableOpacity style={styles.item} onPress={() => {
                                onSelect(item)
                                Actions.pop()
                            }}>
                                <View>
                                    <Text style={globalStyles.midText}>{`${item.id}`}</Text>
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
        baseAddrListReducer: state.baseAddrListReducer
    }
}

export default connect(mapStateToProps)(BaseAddrList)



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

