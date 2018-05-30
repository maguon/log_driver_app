import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, Input, Label, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import * as searchCarAction from './SearchCarAction'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { Actions } from 'react-native-router-flux'

const renderListItem = props => {
    const { item: { vin, id }, item, onSelect } = props
    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() => {
                onSelect({ id, value: vin, item })
                Actions.pop()
            }}>
            <Text style={globalStyles.midText}>{vin ? `${vin}` : ''}</Text>
        </TouchableOpacity>
    )
}

class SearchCar extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        hasAll: false
    }

    componentWillUnmount() {
        this.props.cleanCarList()
    }

    render() {
        const { onSelect,
            searchCarValues,
            hasAll,
            searchCarReducer: { data: { carList }, getCarList } } = this.props
        if (getCarList.isResultStatus == 1) {
            return (
                <Container>
                    <Spinner color={styleColor} />
                </Container>
            )
        }
        else {
            let list = (!searchCarValues || searchCarValues.vin.length < 6) && hasAll ? [{ id: null, vin: '全部' }, ...carList] : carList
            return (
                <Container>
                    <FlatList
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                        data={list}
                        renderItem={(param) => renderListItem({ onSelect, ...param })} />
                </Container>
            )
        }
    }

}

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

const mapStateToProps = (state) => ({
    searchCarReducer: state.searchCarReducer,
    searchCarValues: getFormValues('searchCarForm')(state)
})

const mapDispatchToProps = (dispatch) => ({
    cleanCarList: () => {
        dispatch(searchCarAction.cleanCarList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchCar)