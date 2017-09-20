import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableNativeFeedback
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
        this.props.getCityRouteList()
    }

    onSelect(param) {
        Actions.pop()
        this.props.onSelect(param)
    }

    render() {
        console.log(this.props)
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.props.cityRouteListReducer.data.cityRouteList}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableNativeFeedback
                                key={index}
                                onPress={() => this.onSelect(item.id)}
                                background={TouchableNativeFeedback.SelectableBackground()}>
                                <View style={{ padding: 10, borderBottomWidth: 0.5, borderColor: '#ddd', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View>
                                        <Text style={{ fontSize: 11 }}>{item.id}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 11, color: '#00cade' }}>{item.route_start ? item.route_start : ''}</Text>
                                        <Text style={{ fontSize: 11, paddingHorizontal: 10 }}>--></Text>
                                        <Text style={{ fontSize: 11, color: '#00cade' }}>{item.route_end ? item.route_end : ''}</Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>)
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
