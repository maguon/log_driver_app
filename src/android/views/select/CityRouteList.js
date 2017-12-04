import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import * as CityRouteListAction from '../../../actions/CityRouteListAction'
import { Actions } from 'react-native-router-flux'

class CityRouteList extends Component {
    constructor(props) {
        super(props)
        this.onSelect = this.onSelect.bind(this)
    }

    componentDidMount() {
        this.props.getCityRouteList({
            getDriverId: {
                userId: this.props.userReducer.data.user.userId
            }
        })
    }

    onSelect(param) {
        Actions.pop()
        this.props.onSelect(param)
    }

    render() {
       // console.log(this.props)
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.cityRouteListReducer.data.cityRouteList}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => this.onSelect(item.id)}>
                                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ddd', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ fontSize: 11 }}>{`${item.id}`}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 11, color: '#00cade' }}>{item.city_route_start ? item.city_route_start : ''}</Text>
                                        <Text style={{ fontSize: 11, paddingHorizontal: 10 }}>--></Text>
                                        <Text style={{ fontSize: 11, color: '#00cade' }}>{item.city_route_end ? item.city_route_end : ''}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>)
                    }
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cityRouteListReducer: state.cityRouteListReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCityRouteList: (param) => {
        dispatch(CityRouteListAction.getCityRouteList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CityRouteList)
