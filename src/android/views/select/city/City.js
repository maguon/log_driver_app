import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    InteractionManager,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import * as cityAction from './CityAction'
import { Container, Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'
import * as RouterDirection from '../../../../util/RouterDirection'
import globalStyles, { styleColor } from '../../../GlobalStyles'


class City extends Component {
    constructor(props) {
        super(props)
        this._onPress = this._onPress.bind(this)
    }

    static defaultProps = {
        isMultistep: false,
        hasAll: false
    }


    componentDidMount() {
        this.props.getCityListWaiting()
        InteractionManager.runAfterInteractions(this.props.getCityList)
    }

    _onPress(param) {
        if (!this.props.isMultistep) {
            this.props.onSelect(param)
            Actions.pop()
        } else {
            RouterDirection.selectBaseAddr(this.props.parent)({
                isMultistep: true,
                lastStep: true,
                stepNum: 2,
                cityId: param.id,
                onSelect: this.props.onSelect
            })
        }
    }

    render() {
        const { cityList } = this.props.cityReducer.data
        const { getCityList } = this.props.cityReducer
        const { hasAll } = this.props
        if (getCityList.isResultStatus == 1) {
            return (
                <Container>
                    <Spinner color={styleColor} />
                </Container>
            )
        } else {
            return (
                <Container >
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={hasAll ? [{ id: null, city_name: '全部' }, ...cityList] : cityList}
                        renderItem={({ item, index }) => <TouchableOpacity style={styles.item} key={index} onPress={() => this._onPress(item)}>
                            <Text style={globalStyles.midText}>{item.city_name}</Text>
                        </TouchableOpacity>}
                    />
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

const mapStateToProps = (state) => {
    return {
        cityReducer: state.cityReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCityList: () => {
        dispatch(cityAction.getCityList())
    },
    getCityListWaiting: () => {
        dispatch(cityAction.getCityListWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(City)