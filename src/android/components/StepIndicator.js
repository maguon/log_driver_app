import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Button, Icon } from 'native-base'

export default class StepIndicator extends Component {
    constructor(props) {
        super(props)
        this.renderBeforeItem = this.renderBeforeItem.bind(this)
        this.renderAfterItem = this.renderAfterItem.bind(this)
    }

    static defaultProps = {
        stepList: [{ step: '1', title: '基本信息' }, { step: '2', title: '上传照片' },, { step: '3', title: '保险' }],
        current: 1
    }

    renderBeforeItem(param) {
        return (
            <View style={{  paddingVertical: 10, paddingHorizontal: 7,justifyContent:'center',alignItems:'center',flexDirection:'row' }}>
                <View style={{ backgroundColor: '#ff9aa9', height: 20, width: 20, borderWidth: 2, borderRadius: 10, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#fff' }}>{param.step}</Text>
                </View>
                <View style={{  justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12 }}>{param.title}</Text>
                </View>
            </View>
        )
    }

    renderAfterItem(param) {
        return (
            <View style={{ paddingVertical: 10, paddingHorizontal: 7,justifyContent:'center',alignItems:'center',flexDirection:'row' }}>
                <View style={{ backgroundColor: '#adadad', height: 20, width: 20, borderWidth: 2, borderRadius: 10, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#fff' }}>{param.step}</Text>
                </View>
                <View style={{  justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12 }}>{param.title}</Text>
                </View>
            </View>
        )
    }

    renderCurrentItem(param) {
        return (
            <View style={{  paddingVertical: 10, paddingHorizontal: 7,justifyContent:'center' ,alignItems:'center',flexDirection:'row'}}>
                <View style={{ backgroundColor: '#fff', height: 20, width: 20, borderWidth: 2, borderRadius: 10, borderColor: '#ff9aa9', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#ff9aa9' }}>{param.step}</Text>
                </View>
                <View style={{  justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12 }}>{param.title}</Text>
                </View>
            </View>
        )
    }

    renderItem() {
        return this.props.stepList.map((stepItem, i) => {
            let item
            if (i < this.props.current) item = this.renderBeforeItem(stepItem)
            if (i == this.props.current) item = this.renderCurrentItem(stepItem)
            if (i > this.props.current) item = this.renderAfterItem(stepItem)
            return (
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {item}
                    {this.props.stepList.length > (i + 1) && <View style={{ height: 1, width: 10, backgroundColor: '#adadad' }} />}
                </View>

            )
        })
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {this.props.stepList.length > 0 && this.renderItem()}
            </View>
        )
    }
}