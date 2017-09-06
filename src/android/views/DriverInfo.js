import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Button, Icon } from 'native-base'
import RecordListItem from '../components/RecordListItem'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontTag from '../components/FontTag'

export default class DriverInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0,
        }
        this.renderDriverInfo = this.renderDriverInfo.bind(this)
        this.renderDriverPhoto = this.renderDriverPhoto.bind(this)
        this.renderDriverRecord = this.renderDriverRecord.bind(this)
        this.onPressSegment = this.onPressSegment.bind(this)

    }

    onPressSegment(index) {
        if (this.state.active != index)
            this.setState({ active: index })
    }

    renderDriverInfo() {
        return (
            <View style={{}}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#f2f6f9', borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 40 }}>
                            <MaterialCommunityIcons name='account' size={20} color='#00cade' />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ color: '#00cade', fontWeight: 'bold' }}>王宝泉</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Icon color='#00cade' name='md-man' style={{ fontSize: 20, color: '#00cade' }} />
                            {/* <Icon  name ='md-woman'/> */}
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
                    <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>关联货车：</Text>辽B12345</Text>
                </View>
                <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>入职时间：</Text>2017-08-19</Text>
                </View>
                <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>身份证号：</Text>210210210210210210</Text>
                </View>
                <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>家庭住址：</Text>始源国际2012</Text>
                </View>
                <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>紧急联系人电话：</Text>13887878787</Text>
                </View>
                <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>驾照类型：</Text>A1</Text>
                </View>
                <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>驾驶证检证日期：</Text>2017-09-10</Text>
                </View>
                <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>准运证检证日期：</Text>2017-09-10</Text>
                </View>
                <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold' }}>备注：</Text>
                    <Text style={{ fontSize: 11 }}>一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁一只大蚂蚁</Text>
                </View>
            </View>
        )
    }

    renderDriverPhoto() {
        return (
            <View>

            </View>
        )
    }

    renderDriverRecord() {
        return (
            <View style={{ borderColor: '#ddd', borderBottomWidth: 0.5, paddingHorizontal: 10 }}>
                <RecordListItem />
            </View>
        )
    }

    render() {
        return (<View style={{ flex: 1 }}>
            <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', borderWidth: 1, borderColor: '#00cade' }}>
                <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.active == 0 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(0)}>
                    <Text style={{ color: this.state.active == 0 ? '#fff' : '#00cade' }}>基本信息</Text>
                </Button>
                <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: '#00cade', justifyContent: 'center', backgroundColor: this.state.active == 1 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(1)}>
                    <Text style={{ color: this.state.active == 1 ? '#fff' : '#00cade' }}>照片</Text>
                </Button>
                <Button small style={{ flex: 1, borderRadius: 0, justifyContent: 'center', backgroundColor: this.state.active == 2 ? '#00cade' : '#fff' }} onPress={() => this.onPressSegment(2)}>
                    <Text style={{ color: this.state.active == 2 ? '#fff' : '#00cade' }}>记录</Text>
                </Button>
            </View>
            <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#00cade', flex: 1 }}>
                {this.state.active == 0 && this.renderDriverInfo()}
                {this.state.active == 1 && this.renderDriverPhoto()}
                {this.state.active == 2 && this.renderDriverRecord()}
            </View>
        </View>)
    }
}
