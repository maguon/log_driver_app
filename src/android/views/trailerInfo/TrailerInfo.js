import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    ScrollView,
    ActivityIndicator,
    InteractionManager
} from 'react-native'
import { Button, Icon } from 'native-base'
import RecordListItem from '../../components/RecordListItem'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontTag from '../../components/FontTag'
import InsuranceListItem from '../../components/InsuranceListItem'
import PhotoItem from '../../components/camera/PhotoItem'
import PhotoItemDefault from '../../components/camera/PhotoItemDefault'
import { connect } from 'react-redux'
import * as trailerInfoAction from './TrailerInfoAction'
import moment from 'moment'
import RepairRecordListItem from '../../components/RepairRecordListItem'
import { Actions } from 'react-native-router-flux'
import { file_host } from '../../../config/Host'
import { styleColor } from '../../GlobalStyles'

class TrailerInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 0,
        }
        this.renderTrailerInfo = this.renderTrailerInfo.bind(this)
        this.renderTrailerPhoto = this.renderTrailerPhoto.bind(this)
        this.renderTrailerRecord = this.renderTrailerRecord.bind(this)
        this.renderTrailerInsure = this.renderTrailerInsure.bind(this)
        this.onPressSegment = this.onPressSegment.bind(this)
    }

    static defaultProps = {
        initParam: {
            trailerId: 230,//227
            trailerName: '辽B1236挂'//'辽M12321'
        }
    }

    componentDidMount() {
        const { user } = this.props.userReducer.data
        this.props.setGetTrailerInfoWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getTrailerInfo({
            // OptionalParam: {
            //     truckId: this.props.initParam.trailerId
            // },
            getDriverId: {
                requiredParam: {
                    userId: user.userId
                }
            }
        }))
    }

    onPressSegment(index) {
        const { user } = this.props.userReducer.data
        if (this.state.active != index) {
            if (index == 0) {
                this.props.setGetTrailerInfoWaiting()
                this.setState({ active: 0 })
                InteractionManager.runAfterInteractions(() => this.props.getTrailerInfo({
                    getDriverId: {
                        requiredParam: {
                            userId: user.userId
                        }
                    }
                }))
            }
            if (index == 1) {
                this.props.setGetTrailerImageWaiting()
                this.setState({ active: 1 })
                InteractionManager.runAfterInteractions(() => this.props.getTrailerImage({
                    getDriverId: {
                        requiredParam: {
                            userId: user.userId
                        }
                    }
                }))
            }
            if (index == 2) {
                this.props.setGetTrailerInsuranceWaiting()
                this.setState({ active: 2 })
                InteractionManager.runAfterInteractions(() => this.props.getTrailerInsurance({
                    getDriverId: {
                        requiredParam: {
                            userId: user.userId
                        }
                    }
                }))
            }
            if (index == 3) {
                this.props.setGetTrailerRepairWaiting()
                this.setState({ active: 3 })
                InteractionManager.runAfterInteractions(() => this.props.getTrailerRepairList({
                    getDriverId: {
                        requiredParam: {
                            userId: user.userId
                        }
                    }
                }))
            }
        }
    }

    renderTrailerInfo() {
        const { getTrailerInfo } = this.props.trailerInfoReducer
        if (getTrailerInfo.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getTrailerInfo.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else if (getTrailerInfo.isResultStatus == 6) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>未绑定车头</Text>
                </View>
            )
        } else {
            const { trailerInfo } = this.props.trailerInfoReducer.data
            return (
                <View style={{}}>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#f2f6f9', borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 40 }}>
                                <MaterialCommunityIcons name='truck-trailer' size={20} color={styleColor} />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ color: styleColor, fontWeight: 'bold' }}>{trailerInfo.truck_num ? trailerInfo.truck_num : ''}</Text>
                            </View>
                            <View style={{ width: 40 }}>
                                {trailerInfo.operate_type == 1 && <FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' />}
                                {trailerInfo.operate_type == 2 && <FontTag size={26} title='协' color='#73de8a' fontColor='#fff' />}
                                {trailerInfo.operate_type == 3 && <FontTag size={26} title='供' color='#efbb7a' fontColor='#fff' />}
                                {trailerInfo.operate_type == 4 && <FontTag size={26} title='包' color='#e08ddd' fontColor='#fff' />}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 40 }}>
                            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon name='building-o' size={11} />
                                <Text style={{ paddingLeft: 5 }}>{trailerInfo.company_name ? trailerInfo.company_name : ''}</Text>
                            </View>
                            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>关联车头：</Text>{trailerInfo.first_num ? trailerInfo.first_num : ''}</Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>识别代码：</Text>{trailerInfo.the_code ? trailerInfo.the_code : ''}</Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>挂车货位：</Text>{trailerInfo.number ? trailerInfo.number : ''}</Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>车辆状态：</Text>{trailerInfo.repair_status ? '正常' : '维修'}</Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>行驶证检证日期：</Text>{trailerInfo.driving_date ? moment(trailerInfo.driving_date).format('YYYY-MM-DD') : ''}</Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>营运证检证日期：</Text>{trailerInfo.license_date ? moment(trailerInfo.license_date).format('YYYY-MM-DD') : ''}</Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>备注：</Text>
                        <Text style={{ fontSize: 11 }}>{trailerInfo.remark ? trailerInfo.remark : ''}</Text>
                    </View>
                </View>
            )
        }
    }

    renderTrailerPhoto() {
        const { getTrailerImage } = this.props.trailerInfoReducer
        if (getTrailerImage.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getTrailerImage.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else if (getTrailerImage.isResultStatus == 6) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>未绑定车头</Text>
                </View>
            )
        } else {
            const { trailerInfo, trailerImageList } = this.props.trailerInfoReducer.data
            const trailerImageUrlList = trailerImageList.map(item => `${file_host}/image/${item.url}`)
            let imageHead = (
                <View key={'head'} style={{ flexDirection: 'row' }}>
                    {!trailerInfo.driving_image ?
                        <PhotoItemDefault title='行驶证' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} /> :
                        <PhotoItem title='行驶证' onShowPhoto={() => Actions.singlePhotoView({ initParam: { imageUrlList: [`${file_host}/image/${trailerInfo.driving_image}`], index: 0 } })} uri={trailerInfo.driving_image} type={1} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />}
                    {!trailerInfo.license_image ?
                        <PhotoItemDefault title='营运证' containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} /> :
                        <PhotoItem title='营运证' onShowPhoto={() => Actions.singlePhotoView({ initParam: { imageUrlList: [`${file_host}/image/${trailerInfo.license_image}`], index: 0 } })} uri={trailerInfo.license_image} type={1} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />}
                </View>
            )
            let imageBody = []
            for (let i = 0; i < trailerImageList.length; i += 2) {
                const viewItem = (<View key={i} style={{ flexDirection: 'row' }}>
                    <PhotoItem onShowPhoto={() => Actions.singlePhotoView({ initParam: { imageUrlList: trailerImageUrlList, index: i } })} uri={trailerImageList[i].url} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />
                    {trailerImageList.length != (i + 1) && <PhotoItem onShowPhoto={() => Actions.singlePhotoView({ initParam: { imageUrlList: trailerImageUrlList, index: i + 1 } })} uri={trailerImageList[i + 1].url} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />}
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

    renderTrailerInsure() {
        const { getTrailerInsurance } = this.props.trailerInfoReducer
        if (getTrailerInsurance.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#edf1f4', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getTrailerInsurance.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else if (getTrailerInsurance.isResultStatus == 6) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>未绑定车头</Text>
                </View>
            )
        } else {
            const { trailerInsuranceList } = this.props.trailerInfoReducer.data
            return (
                <View style={{ backgroundColor: '#edf1f4', flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={trailerInsuranceList}
                        ListFooterComponent={<View style={{ height: 10, backgroundColor: '#edf1f4' }} />}
                        renderItem={({ item, index }) => <InsuranceListItem data={item} key={index} />}
                    />
                </View>
            )
        }
    }

    renderTrailerRecord() {
        const { getTrailerRepairList } = this.props.trailerInfoReducer
        if (getTrailerRepairList.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getTrailerRepairList.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else if (getTrailerRepairList.isResultStatus == 6) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>未绑定车头</Text>
                </View>
            )
        } else {
            const { trailerRepairList } = this.props.trailerInfoReducer.data
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={trailerRepairList}
                        renderItem={({ item, index }) => <RepairRecordListItem repairItem={item} key={index} />}
                    />
                </View>
            )
        }
    }

    render() {
        //console.log(this.props.trailerInfoReducer)
        return (<View style={{ flex: 1 }}>
            <View style={{ marginHorizontal: 10, marginVertical: 10, flexDirection: 'row', borderWidth: 1, borderColor: styleColor }}>
                <Button small style={{ flex: 2, borderRadius: 0, borderRightWidth: 1, borderColor: styleColor, justifyContent: 'center', backgroundColor: this.state.active == 0 ? styleColor : '#fff' }} onPress={() => this.onPressSegment(0)}>
                    <Text style={{ color: this.state.active == 0 ? '#fff' : styleColor }}>基本信息</Text>
                </Button>
                <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: styleColor, justifyContent: 'center', backgroundColor: this.state.active == 1 ? styleColor : '#fff' }} onPress={() => this.onPressSegment(1)}>
                    <Text style={{ color: this.state.active == 1 ? '#fff' : styleColor }}>照片</Text>
                </Button>
                <Button small style={{ flex: 1, borderRadius: 0, borderRightWidth: 1, borderColor: styleColor, justifyContent: 'center', backgroundColor: this.state.active == 2 ? styleColor : '#fff' }} onPress={() => this.onPressSegment(2)}>
                    <Text style={{ color: this.state.active == 2 ? '#fff' : styleColor }}>车保</Text>
                </Button>
                <Button small style={{ flex: 2, borderRadius: 0, justifyContent: 'center', backgroundColor: this.state.active == 3 ? styleColor : '#fff' }} onPress={() => this.onPressSegment(3)}>
                    <Text style={{ color: this.state.active == 3 ? '#fff' : styleColor }}>维修记录</Text>
                </Button>
            </View>
            <View style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: styleColor, flex: 1 }}>
                {this.state.active == 0 && this.renderTrailerInfo()}
                {this.state.active == 1 && this.renderTrailerPhoto()}
                {this.state.active == 2 && this.renderTrailerInsure()}
                {this.state.active == 3 && this.renderTrailerRecord()}
            </View>
        </View>)
    }
}


const mapStateToProps = (state) => {
    return {
        trailerInfoReducer: state.trailerInfoReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTrailerInfo: (param) => {
        dispatch(trailerInfoAction.getTrailerInfo(param))
    },
    setGetTrailerInfoWaiting: () => {
        dispatch(trailerInfoAction.setGetTrailerInfoWaiting())
    },
    // getTrailerRecord: (param) => {
    //     dispatch(trailerInfoAction.getTrailerRecord(param))
    // },
    // setGetTrailerRecordWaiting: () => {
    //     dispatch(trailerInfoAction.setGetTrailerRecordWaiting())
    // },
    getTrailerRepairList: (param) => {
        dispatch(trailerInfoAction.getTrailerRepairList(param))
    },
    setGetTrailerRepairWaiting: () => {
        dispatch(trailerInfoAction.setGetTrailerRepairWaiting())
    },
    getTrailerInsurance: (param) => {
        dispatch(trailerInfoAction.getTrailerInsurance(param))
    },
    setGetTrailerInsuranceWaiting: () => {
        dispatch(trailerInfoAction.setGetTrailerInsuranceWaiting())
    },
    getTrailerImage: (param) => {
        dispatch(trailerInfoAction.getTrailerImage(param))
    },
    setGetTrailerImageWaiting: () => {
        dispatch(trailerInfoAction.setGetTrailerImageWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TrailerInfo)