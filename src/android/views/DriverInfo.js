import React, { Component } from 'react'
import {
    Text,
    View,
    InteractionManager,
    ActivityIndicator,
    FlatList
} from 'react-native'
import { Button, Icon } from 'native-base'
import RecordListItem from '../components/RecordListItem'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontTag from '../components/FontTag'
import PhotoItem from '../components/camera/PhotoItem'
import { connect } from 'react-redux'
import * as driverInfoAction from '../../actions/DriverInfoAction'
import drivingLicenseTypeList from '../../config/drivingLicenseType.json'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import { file_host } from '../../config/Host'

class DriverInfo extends Component {
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

    componentDidMount() {
        const { user } = this.props.userReducer.data
        this.props.setGetDriverInfoWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getDriverInfo({
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
                this.props.setGetDriverInfoWaiting()
                this.setState({ active: 0 })
                InteractionManager.runAfterInteractions(() => this.props.getDriverInfo({
                    getDriverId: {
                        requiredParam: {
                            userId: user.userId
                        }
                    }
                }))
            } else if (index == 1) {
                this.props.setGetDriverImageWaiting()
                this.setState({ active: 1 })
                InteractionManager.runAfterInteractions(() => this.props.getDriverImage({
                    getDriverId: {
                        requiredParam: {
                            userId: user.userId
                        }
                    }
                }))
            } else if (index == 2) {
                this.props.setGetDriverRecordWaiting()
                this.setState({ active: 2 })
                InteractionManager.runAfterInteractions(() => this.props.getDriverRecord({
                    getDriverId: {
                        requiredParam: {
                            userId: user.userId
                        }
                    }
                }))
            }
        }
    }

    renderDriverInfo() {
        const { getDriverInfo } = this.props.driverInfoReducer
        if (getDriverInfo.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getDriverInfo.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            const { driverInfo } = this.props.driverInfoReducer.data
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: '#f2f6f9', borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 40 }}>
                                <MaterialCommunityIcons name='account' size={20} color='#00cade' />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text style={{ color: '#00cade', fontWeight: 'bold' }}>{driverInfo.drive_name ? driverInfo.drive_name : ''}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                {driverInfo.gender == 1 && <Icon color='#00cade' name='md-man' style={{ fontSize: 20, color: '#00cade' }} />}
                                {driverInfo.gender == 0 && <Icon name='md-woman' style={{ fontSize: 20, color: 'red' }} />}
                            </View>
                            <View style={{ width: 40 }}>
                                {driverInfo.operate_type == 1 && <FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' />}
                                {driverInfo.operate_type == 2 && <FontTag size={26} title='协' color='#73de8a' fontColor='#fff' />}
                                {driverInfo.operate_type == 3 && <FontTag size={26} title='供' color='#efbb7a' fontColor='#fff' />}
                                {driverInfo.operate_type == 4 && <FontTag size={26} title='包' color='#e08ddd' fontColor='#fff' />}
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 40 }}>
                            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon name='building-o' size={11} />
                                <Text style={{ paddingLeft: 5 }}>{driverInfo.company_name ? driverInfo.company_name : ''}</Text>
                            </View>
                            <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon name='mobile-phone' size={16} />
                                <Text style={{ paddingLeft: 5 }}>{driverInfo.tel ? driverInfo.tel : ''}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>关联货车：</Text>{driverInfo.truck_num ? driverInfo.truck_num : ''}</Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>身份证号：</Text>{driverInfo.id_number ? driverInfo.id_number : ''}</Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>家庭住址：</Text>{driverInfo.address ? driverInfo.address : ''}</Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>紧急联系人电话：</Text>{driverInfo.sib_tel ? driverInfo.sib_tel : ''}</Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>驾照类型：</Text>{this.props.driverInfoReducer.data.driverInfo.license_type ? drivingLicenseTypeList.find((item) => item.id == this.props.driverInfoReducer.data.driverInfo.license_type).value : ''}</Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 11 }}><Text style={{ fontWeight: 'bold' }}>驾驶证检证日期：</Text>{driverInfo.license_date ? moment(driverInfo.license_date).format('YYYY-MM-DD') : ''}</Text>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderColor: '#ccc', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <Text style={{ fontSize: 11, fontWeight: 'bold' }}>备注：</Text>
                        <Text style={{ fontSize: 11 }}>{driverInfo.remark ? driverInfo.remark : ''}</Text>
                    </View>
                </View>
            )
        }
    }

    renderDriverPhoto() {
        const { getDriverImage } = this.props.driverInfoReducer
        if (getDriverImage.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getDriverImage.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            const { driverInfo, driverRecordList } = this.props.driverInfoReducer.data
            let imageHead = [(
                <View key={'head1'} style={{ flexDirection: 'row' }}>
                    {!driverInfo.drive_image ?
                        <PhotoItemDefault title='身份证正面' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} /> :
                        <PhotoItem title='身份证正面' onShowPhoto={() => Actions.singlePhotoView({ initParam: { imageUrlList: [`${file_host}/image/${driverInfo.drive_image}`], index: 0 } })} uri={driverInfo.drive_image} type={1} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />}
                    {!driverInfo.driver_image_re ?
                        <PhotoItemDefault title='身份证背面' containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} /> :
                        <PhotoItem title='身份证背面' onShowPhoto={() => Actions.singlePhotoView({ initParam: { imageUrlList: [`${file_host}/image/${driverInfo.driver_image_re}`], index: 0 } })} uri={driverInfo.driver_image_re} type={1} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />}
                </View>
            ), (
                <View key={'head2'} style={{ flexDirection: 'row' }}>
                    {!driverInfo.op_license_image ?
                        <PhotoItemDefault title='驾驶证' containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} /> :
                        <PhotoItem title='驾驶证' onShowPhoto={() => Actions.singlePhotoView({ initParam: { imageUrlList: [`${file_host}/image/${driverInfo.op_license_image}`], index: 0 } })} uri={driverInfo.op_license_image} type={1} containerSytle={{ marginLeft: 10, marginRight: 5, marginTop: 10 }} />}
                    {!driverInfo.driver_avatar_image ?
                        <PhotoItemDefault title='个人照片' containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} /> :
                        <PhotoItem title='个人照片' onShowPhoto={() => Actions.singlePhotoView({ initParam: { imageUrlList: [`${file_host}/image/${driverInfo.driver_avatar_image}`], index: 0 } })} uri={driverInfo.driver_avatar_image} type={1} containerSytle={{ marginLeft: 5, marginRight: 10, marginTop: 10 }} />}
                </View>
            )]
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={[...imageHead]}
                        renderItem={({ item }) => item}
                    />
                </View>
            )
        }
    }

    renderDriverRecord() {
        const { getDriverRecord } = this.props.driverInfoReducer
        if (getDriverRecord.isResultStatus == 1) {
            return (
                <View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator
                        animating={getDriverRecord.isResultStatus == 1}
                        style={{ height: 80 }}
                        size="large"
                    />
                </View>
            )
        } else {
            const { driverRecordList } = this.props.driverInfoReducer.data
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={driverRecordList}
                        renderItem={({ item, index }) => <RecordListItem data={item} key={index} />}
                    />
                </View>
            )
        }
    }

    render() {
        //console.log(this.props.userReducer)
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

const mapStateToProps = (state) => {
    return {
        driverInfoReducer: state.driverInfoReducer,
        userReducer: state.userReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDriverInfo: (param) => {
        dispatch(driverInfoAction.getDriverInfo(param))
    },
    setGetDriverInfoWaiting: () => {
        dispatch(driverInfoAction.setGetDriverInfoWaiting())
    },
    getDriverRecord: (param) => {
        dispatch(driverInfoAction.getDriverRecord(param))
    },
    setGetDriverRecordWaiting: () => {
        dispatch(driverInfoAction.setGetDriverRecordWaiting())
    },
    getDriverImage: (param) => {
        dispatch(driverInfoAction.getDriverImage(param))
    },
    setGetDriverImageWaiting: () => {
        dispatch(driverInfoAction.setGetDriverImageWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DriverInfo)
