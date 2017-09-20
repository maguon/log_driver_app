import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import * as CityRouteListAction from '../../../actions/CityRouteListAction'

class CityRouteList extends Component {

    componentDidMount() {
        this.props.getCityRouteList()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.cityRouteListReducer.data.cityRouteList}
                    renderItem={({ item }) => {
                        return (<View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ddd', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontSize: 11 }}>{item.id}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <Text style={{ fontSize: 11, color: '#00cade' }}>{item.route_start ? item.route_start : ''}</Text>
                                <Text style={{ fontSize: 11, paddingHorizontal: 10 }}>--></Text>
                                <Text style={{ fontSize: 11, color: '#00cade' }}>{item.route_end ? item.route_end : ''}</Text>
                            </View>
                        </View>)
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
    getCityRouteList: () => {
        dispatch(CityRouteListAction.getCityRouteList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CityRouteList)
