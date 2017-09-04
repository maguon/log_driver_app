import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { connect } from 'react-redux'
//74e0ed
class Home extends Component {
    render() {
        return (
            <View>
                <View style={{backgroundColor:'#00cade',flexDirection:'row'}}>
                    <View style={{borderRadius:30,width:60,height:60,backgroundColor:'#d7f4f8'}}>
                        <Text>重载里程</Text>
                        <Text>12345</Text>
                    </View>
                    <View>
                        <Text>本月里程</Text>
                        <Text>123456</Text>
                    </View>
                    <View>
                        <Text>空载里程</Text>
                        <Text>12345</Text>
                    </View>
                </View>
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