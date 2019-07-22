//***
import React, { Component } from 'react'
import {
    Text,
    View,
} from 'react-native'
import globalStyles from '../utils/GlobalStyles'


//任务进度UI
export default class StepIndicator extends Component {
    constructor(props) {
        super(props)
        this.renderBeforeItem = this.renderBeforeItem.bind(this)
        this.renderAfterItem = this.renderAfterItem.bind(this)
    }

    static defaultProps = {
        stepList: [{ step: '1', title: '基本信息' }, { step: '2', title: '上传照片' },, { step: '3', title: '保险' }],
        current: 0
    }
    //完成的任务
    renderBeforeItem(param) {
        return (
            <View style={{ paddingVertical: 10, paddingHorizontal: 5,justifyContent:'center',alignItems:'center',flexDirection:'column' ,marginTop:10}}>
                <View style={{ backgroundColor: '#68ac26', height: 25, width: 25, borderWidth: 2, borderRadius: 12, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontSize: 14,color: '#fff' }}>{param.step}</Text>
                </View>
                <View style={{  justifyContent: 'center',marginTop:10 }}>
                    <Text style={[globalStyles.smallText ,{color:'#68ac26'}]}>{param.title}</Text>
                </View>
            </View>
        )
    }
    //未完成任务
    renderAfterItem(param) {
        return (
            <View style={{ paddingVertical: 10, paddingHorizontal: 5,justifyContent:'center',alignItems:'center',flexDirection:'column' ,marginTop:10}}>
                <View style={{ backgroundColor: '#d0d0d0', height: 25, width: 25, borderWidth: 2, borderRadius:12, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#fff' }}>{param.step}</Text>
                </View>
                <View style={{  justifyContent: 'center',marginTop:10 }}>
                    <Text style={ globalStyles.smallText}>{param.title}</Text>
                </View>
            </View>
        )
    }
    //当前任务
    renderCurrentItem(param) {
        return (
            <View style={{ paddingVertical: 10, paddingHorizontal: 5,justifyContent:'center' ,alignItems:'center',flexDirection:'column',marginTop:10}}>
                <View style={{ backgroundColor: '#ff9aa9', height: 25, width: 25, borderWidth: 2, borderRadius: 12, borderColor: '#ff9aa9', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#fff'}}>{param.step}</Text>
                </View>
                <View style={{  justifyContent: 'center',marginTop:10 }}>
                    <Text style={ [globalStyles.smallText,{color:'#ff9aa9'}]}>{param.title}</Text>
                </View>
            </View>
        )
    }

    renderItem() {
        //map 方法遍历数组
        return this.props.stepList.map((stepItem, i) => {
            let item
            if (i < this.props.current) item = this.renderBeforeItem(stepItem)
            if (i == this.props.current) item = this.renderCurrentItem(stepItem)
            if (i > this.props.current) item = this.renderAfterItem(stepItem)
            return (
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {item}
                    {this.props.stepList.length > (i + 1) && <View style={{ height:3, width: 40, backgroundColor: '#d0d0d0',marginTop:-15}} />}
                </View>

            )
        })
    }
//渲染
    render() {
        return (
            <View style={{ backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {this.props.stepList.length > 0 && this.renderItem()}
            </View>
        )
    }
}
