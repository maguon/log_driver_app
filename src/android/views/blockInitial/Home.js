import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'

class Home extends Component {
    render() {
        return (
            <View>
                <Text>
                    {this.props.homeReducer.data.title}
                </Text>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        homeReducer: state.homeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Home)