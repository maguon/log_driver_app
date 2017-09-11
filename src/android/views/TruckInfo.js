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
import PhotoItemDefault from '../components/camera/PhotoItemDefault'
import { connect } from 'react-redux'
import * as truckInfoAction from '../../actions/TruckInfoAction'
import moment from 'moment'

class TruckInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0
        }
        this.renderTruckInfo = this.renderTruckInfo.bind(this)
        this.renderTruckPhoto = this.renderTruckPhoto.bind(this)
        this.renderTruckRecord = this.renderTruckRecord.bind(this)
        this.renderTruckInsure = this.renderTruckInsure.bind(this)
        this.onPressSegment = this.onPressSegment.bind(this)
    }

    static defaultProps = {
        initParam: {
            truckId: 190,//227
            truckName: '辽B12319'//'辽M12321'
        }
    }

    onPressSegment(index) {
        if (this.state.active != index) {
            if (index == 0) {
                this.props.setGetTruckInfoWaiting()
                this.setState({ active: 0 })
                InteractionManager.runAfterInteractions(() => this.props.getTruckInfo({ OptionalParam: { truckId: this.props.initParam.truckId } }))
            }
            if (index == 1) {
                this.props.setGetTruckImageWaiting()
                this.setState({ active: 1 })
                InteractionManager.runAfterInteractions(() => this.props.getTruckImage({
                    OptionalParam: { truckId: this.props.initParam.truckId },
                    requiredParam: { userId: this.props.userReducer.user.userId, truckNum: this.props.initParam.truckName }
                }))
            }
            if (index == 2) {
                this.props.setGetTruckInsuranceWaiting()
                this.setState({ active: 2 })
                InteractionManager.runAfterInteractions(() => this.props.getTruckInsurance({ OptionalParam: { truckId: this.props.initParam.truckId, active: 1 } }))
            }
            if (index == 3) {
                this.props.setGetTruckRecordWaiting()
                this.setState({ active: 3 })
                InteractionManager.runAfterInteractions(() => this.props.getTruckRecord({ requiredParam: { userId: this.props.userReducer.user.userId, truckNum: this.props.initParam.truckName } }))
            }
        }
    }

    componentDidMount() {
        this.props.setGetTruckInfoWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getTruckInfo({
            OptionalParam: {
                truckId: this.props.initParam.truckId
            }
        }))
    }

    renderTruckInfo() {
        const { getTruckInfo } = this.props.truckInfoReducer
        if (getTruckInfo.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getTruckInfo.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            const { truckInfo } = this.props.truckInfoReducer.data
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
                                        <Text style={{ color: '#00cade', fontWeight: 'bold' }}>{truckInfo.truck_num ? truckInfo.truck_num : ''}</Text>
                                    </View>
                                    <View style={{ width: 40 }}>
                                        {truckInfo.operate_type == 1 && <FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' />}
                                        {truckInfo.operate_type == 2 && <FontTag size={26} title='协' color='#73de8a' fontColor='#fff' />}
                                        {truckInfo.operate_type == 3 && <FontTag size={26} title='供' color='#efbb7a' fontColor='#fff' />}
                                        {truckInfo.operate_type == 4 && <FontTag size={26} title='包' color='#e08ddd' fontColor='#fff' />}
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', paddingHorizontal: 40 }}>
                                    <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesomeIcon name='building-o' size={11} />
                                        <Text style={{ paddingLeft: 5 }}>{truckInfo.company_name ? truckInfo.company_name : ''}</Text>
                                    </View>
                                    <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                                        {truckInfo.truck_tel && <FontAwesomeIcon name='mobile-phone' size={16} />}
                                        {truckInfo.truck_tel && <Text style={{ paddingLeft: 5 }}>{truckInfo.truck_tel}</Text>}
                                    </View>
                                </View>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>主驾司机：</Text>{truckInfo.drive_name ? truckInfo.drive_name : ''}</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>副驾司机：</Text>{truckInfo.vice_drive_name ? truckInfo.vice_drive_name : ''}</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>关联挂车：</Text>{truckInfo.trail_num ? truckInfo.trail_num : ''}</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>品牌：</Text>{truckInfo.brand_name ? truckInfo.brand_name : ''}</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>识别代码：</Text>{truckInfo.the_code ? truckInfo.the_code : ''}</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>挂车货位：</Text>{truckInfo.trail_number ? truckInfo.trail_number : ''}</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>车辆状态：</Text>{truckInfo.repair_status ? '正常' : '维修'}</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>行驶证检证日期：</Text>{truckInfo.driving_date ? moment(truckInfo.driving_date).format('YYYY-MM-DD') : ''}</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>营运证检证日期：</Text>{truckInfo.license_date ? moment(truckInfo.license_date).format('YYYY-MM-DD') : ''}</Text>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <Text style={{ fontSize: 11, fontWeight: 'bold' }}>备注：</Text>
                                <Text style={{ fontSize: 11 }}>{truckInfo.remark ? truckInfo.remark : ''}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }

    renderTruckPhoto() {
        const { getTruckImage } = this.props.truckInfoReducer
        if (getTruckImage.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getTruckImage.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            const { truckInfo, truckImageList } = this.props.truckInfoReducer.data
            let imageHead = (
                <View key={'head'} style={{ flexDirection: 'row' }}>
                    {!truckInfo.driving_image ? <PhotoItemDefault title='行驶证' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} /> : <PhotoItem title='行驶证' uri={truckInfo.driving_image} type={1} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />}
                    {!truckInfo.license_image ? <PhotoItemDefault title='营运证' containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} /> : <PhotoItem title='营运证' uri={truckInfo.license_image} type={1} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />}
                </View>
            )
            let imageBody = []
            for (let i = 0; i < truckImageList.length; i += 2) {
                const viewItem = (<View key={i} style={{ flexDirection: 'row' }}>
                    <PhotoItem onShowPhoto={() => { }} uri={truckImageList[i].url} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                    {truckImageList.length != (i + 1) && <PhotoItem onShowPhoto={() => { }} uri={truckImageList[i + 1].url} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />}
                </View>)
                imageBody.push(viewItem)
            }

            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={[imageHead, ...imageBody]}
                        renderItem={({ item }) => item}
                    />
                </View>
            )
        }
    }

    renderTruckInsure() {
        const { getTruckInsurance } = this.props.truckInfoReducer
        if (getTruckInsurance.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#edf1f4', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getTruckInsurance.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            const { truckInsuranceList } = this.props.truckInfoReducer.data
            return (
                <View style={{ backgroundColor: '#edf1f4', flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={truckInsuranceList}
                        ListFooterComponent={<View style={{ height: 10, backgroundColor: '#edf1f4' }} />}
                        renderItem={({ item, index }) => <InsuranceListItem data={item} key={index} />}
                    />
                </View>
            )
        }
    }

    renderTruckRecord() {
        const { getTruckRecord } = this.props.truckInfoReducer
        if (getTruckRecord.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getTruckRecord.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            const { truckRecordList } = this.props.truckInfoReducer.data
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={truckRecordList}
                        renderItem={({ item, index }) => <RecordListItem data={item} key={index} />}
                    />
                </View>
            )
        }
    }

    render() {
        // console.log(this.props.truckInfoReducer)
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
        truckInfoReducer: state.truckInfoReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTruckInfo: (param) => {
        dispatch(truckInfoAction.getTruckInfo(param))
    },
    setGetTruckInfoWaiting: () => {
        dispatch(truckInfoAction.setGetTruckInfoWaiting())
    },
    getTruckRecord: (param) => {
        dispatch(truckInfoAction.getTruckRecord(param))
    },
    setGetTruckRecordWaiting: () => {
        dispatch(truckInfoAction.setGetTruckRecordWaiting())
    },
    getTruckInsurance: (param) => {
        dispatch(truckInfoAction.getTruckInsurance(param))
    },
    setGetTruckInsuranceWaiting: () => {
        dispatch(truckInfoAction.setGetTruckInsuranceWaiting())
    },
    getTruckImage: (param) => {
        dispatch(truckInfoAction.getTruckImage(param))
    },
    setGetTruckImageWaiting: () => {
        dispatch(truckInfoAction.setGetTruckImageWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TruckInfo)