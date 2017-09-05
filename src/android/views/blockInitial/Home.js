import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    Button,
    TouchableNativeFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'native-base'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

class Home extends Component {
    render() {
        return (
            <View>
                <View style={{ backgroundColor: '#00cade', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ borderRadius: 40, width: 80, height: 80, backgroundColor: '#d7f4f8', borderWidth: 4, borderColor: '#74e0ed', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#00cade', fontSize: 11 }}>重载里程</Text>
                            <Text style={{ color: '#00cade' }}>12345</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ borderRadius: 50, width: 100, height: 100, backgroundColor: '#d7f4f8', borderWidth: 4, borderColor: '#74e0ed', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#00cade', fontSize: 11 }}>本月里程</Text>
                            <Text style={{ color: '#00cade' }}>123456</Text>
                            <Text style={{ color: '#00cade', fontSize: 11 }}>公里</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ borderRadius: 40, width: 80, height: 80, backgroundColor: '#d7f4f8', borderWidth: 4, borderColor: '#74e0ed', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#00cade', fontSize: 11 }}>空载里程</Text>
                            <Text style={{ color: '#00cade' }}>12345</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', backgroundColor: '#b0bfc6', paddingVertical: 5, paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name='ios-pin' style={{ color: '#dce2e7' }} size={20} />
                            <Text style={{ color: '#fff', paddingLeft: 10, fontSize: 11 }}>大连—>沈阳</Text>
                        </View>
                        <View>
                            <Text style={{ color: '#fff', fontSize: 11 }}>在途</Text>
                        </View>
                    </View>
                    <View style={{ height: 150, backgroundColor: 'red' }}>
                    </View>
                </View>
                <View style={{ marginVertical: 10, marginHorizontal: 10, borderWidth: 1, borderColor: '#e1e2e6' }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#edf1f4', paddingVertical: 5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialCommunityIcon name='truck' style={{ color: '#00cade', paddingHorizontal: 5 }} size={20} />
                            <Text style={{ color: '#8e9fa3', fontWeight: 'bold' }}>大连—>沈阳</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ color: '#8e9fa3', paddingRight: 90, fontSize: 11 }}>在途</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', color: '#8e9fa3', paddingHorizontal: 5, paddingVertical: 5, backgroundColor: '#fff', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#8e9fa3', fontSize: 11 }}>指定时间：2017-09-18</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#8e9fa3', paddingRight: 90, fontSize: 11 }}>指定转载：14</Text>
                        </View>
                    </View>
                    <View style={{
                        position: 'absolute',
                        right: 10, top: 10
                    }}>
                        <TouchableNativeFeedback onPress={() => { }}
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{
                                borderRadius: 15,
                                width: 30,
                                height: 30,
                                backgroundColor: '#00cade',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: '#fff', fontSize: 11 }}>完成</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={{
                        position: 'absolute',
                        right: 50, top: 10
                    }}>
                        <TouchableNativeFeedback onPress={() => { }}
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={{
                                borderRadius: 15,
                                width: 30,
                                height: 30,
                                backgroundColor: '#00cade',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: '#fff', fontSize: 11 }}>完成</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                {/* <FlatList 
                data={}/> */}
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