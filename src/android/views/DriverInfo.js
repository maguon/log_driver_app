import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Button } from 'native-base'
import RecordListItem from '../components/RecordListItem'

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
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>

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
