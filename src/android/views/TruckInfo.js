import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    FlatList,
    InteractionManager,
    ActivityIndicator
} from 'react-native'
import { Button, Icon } from 'native-base'
import RecordListItem from '../components/RecordListItem'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontTag from '../components/FontTag'
import InsuranceListItem from '../components/InsuranceListItem'
import PhotoItem from '../components/camera/PhotoItem'
import * as truckInfoAction from '../../actions/TruckInfoAction'

class TruckInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 2,
            insuranceList: [],
            loading: true
        }
        this.renderTruckInfo = this.renderTruckInfo.bind(this)
        this.renderTruckPhoto = this.renderTruckPhoto.bind(this)
        this.renderTruckRecord = this.renderTruckRecord.bind(this)
        this.renderTruckInsure = this.renderTruckInsure.bind(this)
        this.onPressSegment = this.onPressSegment.bind(this)
    }

    static defaultProps = {
        initParam: {
            truckId: 172
        }
    }

    onPressSegment(index) {
        if (this.state.active != index) {
            this.setState({ active: index, insuranceList: [], loading: true })
            InteractionManager.runAfterInteractions(() => this.setState({ loading: false }))
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => this.setState({
            insuranceList: [{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }, { key: '6' }, { key: '7' }, { key: '8' }, { key: '9' }, { key: '10' }, { key: '11' }, { key: '12' }, { key: '13' }, { key: '14' }
                , { key: '15' }, { key: '16' }, { key: '17' }, { key: '18' }, { key: '19' }, { key: '20' }, { key: '21' }, { key: '22' }, { key: '23' }, { key: '24' }, { key: '25' }],
            loading: false
        }))
    }

    renderTruckInfo() {
        if (this.state.loading) {
            return (
                <View style={{ backgroundColor: '#edf1f4', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={this.state.loading}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <View style={{ flex: 1 }}>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#f2f6f9', borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: 40 }}>
                                        <MaterialCommunityIcons name='truck' size={20} color='#00cade' />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Text style={{ color: '#00cade', fontWeight: 'bold' }}>辽B12345</Text>
                                    </View>
                                    <View style={{ width: 40 }}>
                                        <FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' />
                                        {/* <FontTag size={30} title='协' color='#73de8a' fontColor='#fff' />
                    <FontTag size={30} title='供' color='#efbb7a' fontColor='#fff' />
                    <FontTag size={30} title='包' color='#e08ddd' fontColor='#fff' /> */}
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', paddingHorizontal: 40 }}>
                                    <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesomeIcon name='building-o' size={11} />
                                        <Text style={{ paddingLeft: 5 }}>安吉物流</Text>
                                    </View>
                                    <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesomeIcon name='mobile-phone' size={16} />
                                        <Text style={{ paddingLeft: 5 }}>13887878787</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>主驾司机：</Text>王宝泉</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>副驾司机：</Text>王宝泉</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>关联挂车：</Text>辽B12345</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>品牌：</Text>东风</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>识别代码：</Text>123456789012345678</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>挂车货位：</Text>14</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>车辆状态：</Text>正常</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>行驶证检证日期：</Text>2017-09-10</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>营运证检证日期：</Text>2017-09-10</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>备注：</Text>
                                <Text style={{ fontSize: 11 }}>一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }

    renderTruckPhoto() {
        return (
            <View>
                <PhotoItem />
            </View>
        )
    }

    renderTruckInsure() {
        if (this.state.loading) {
            return (
                <View style={{ backgroundColor: '#edf1f4', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={this.state.loading}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            return (
                <View style={{ backgroundColor: '#edf1f4', flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.insuranceList}
                        ListFooterComponent={<View style={{ height: 10, backgroundColor: '#edf1f4' }} />}
                        renderItem={({ item }) => <InsuranceListItem />}
                    />
                </View>
            )
        }
    }

    renderTruckRecord() {
        return (
            <View style={{ borderColor: '#ddd', borderBottomWidth: 0.5, paddingHorizontal: 10 }}>
                <RecordListItem />
            </View>
        )
    }

    render() {
        return (<View style={{ flex: 1 }}>
            <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', borderWidth: 1, borderColor: '#00cade' }}>
                <Button small style={{ flex: 2, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.active == 0 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(0)}>
                    <Text style={{ color: this.state.active == 0 ? '#fff' : '#00cade' }}>基本信息</Text>
                </Button>
                <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.active == 1 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(1)}>
                    <Text style={{ color: this.state.active == 1 ? '#fff' : '#00cade' }}>照片</Text>
                </Button>
                <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.active == 2 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(2)}>
                    <Text style={{ color: this.state.active == 2 ? '#fff' : '#00cade' }}>车保</Text>
                </Button>
                <Button small style={{ flex: 1, borderRadius: 0, justifyContent: 'center', backgroundColor: this.state.active == 3 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(3)}>
                    <Text style={{ color: this.state.active == 3 ? '#fff' : '#00cade' }}>记录</Text>
                </Button>
            </View>
            <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#00cade', flex: 1 }}>
                {this.state.active == 0 && this.renderTruckInfo()}
                {this.state.active == 1 && this.renderTruckPhoto()}
                {this.state.active == 2 && this.renderTruckInsure()}
                {this.state.active == 3 && this.renderTruckRecord()}
            </View>
        </View>)
    }
}

const mapStateToProps = (state) => {
    return {
        truckInfoReducer: state.truckInfoReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(TruckInfo)