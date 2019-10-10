import React, {Component} from 'react'
import {
    Text,
    View,
    InteractionManager,
    ActivityIndicator,
    FlatList
} from 'react-native'
import {Button, Container, Content, Icon, ListItem, Spinner, Tab, Tabs} from 'native-base'
import RecordListItem from '../modules/RecordListItem'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontTag from '../utils/FontTag'
import PhotoItem from '../modules/PhotoItem'
import PhotoItemDefault from '../modules/PhotoItemDefault'
import {connect} from 'react-redux'
import * as actions from '../../actions/index'
import drivingLicenseTypeList from '../../config/drivingLicenseType.json'
import moment from 'moment'
import {Actions} from 'react-native-router-flux'
import globalStyles, {styleColor} from '../utils/GlobalStyles'


class DriverInfo extends Component {
    constructor(props) {
        super(props)
        this.renderDriverInfo = this.renderDriverInfo.bind(this)
        this.renderDriverPhoto = this.renderDriverPhoto.bind(this)
        this.renderDriverRecord = this.renderDriverRecord.bind(this)
    }

    componentDidMount() {
        const {user} = this.props.loginReducer.data
        this.props.setGetDriverInfoWaiting()
        this.props.setGetDriverImageWaiting()
        this.props.setGetDriverRecordWaiting()
        InteractionManager.runAfterInteractions(() => this.props.getDriverInfo({
            getDriverId: {
                requiredParam: {
                    userId: user.uid
                }
            }
        }))
        InteractionManager.runAfterInteractions(()=> this.props.getDriverImage({
            getDriverId: {
                requiredParam: {
                    userId: user.uid
                }
            }
        }))
        InteractionManager.runAfterInteractions(()=> this.props.getDriverRecord({
            getDriverId: {
                requiredParam: {
                    userId: user.uid
                }
            }
        }))

    }

    renderDriverInfo() {
        const {getDriverInfo} = this.props.driverInfoReducer
        if (getDriverInfo.isResultStatus == 1) {
            return (
                <View style={{backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator
                        animating={getDriverInfo.isResultStatus == 1}
                        style={{height: 80}}
                        size="large"
                    />
                </View>
            )
        } else {
            const {driverInfo} = this.props.driverInfoReducer.data
            return (
                <Container>
                    <Content>

                        <View style={{
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            backgroundColor: '#f2f6f9',
                            borderBottomWidth: 0.5,
                            borderColor: '#ccc'
                        }}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{width: 40, alignItems: 'center'}}>
                                    <MaterialCommunityIcons name='account' size={25} color={styleColor}
                                                            style={{marginTop: 0}}/>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={[globalStyles.largeText, {
                                        color: styleColor,
                                        fontWeight: 'bold'
                                    }]}>{driverInfo.drive_name ? driverInfo.drive_name : ''}</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                    {driverInfo.gender == 1 &&
                                    <Icon name='md-man' style={{fontSize: 20, color: '#12c3eb'}}/>}
                                    {driverInfo.gender == 0 &&
                                    <Icon name='md-woman' style={{fontSize: 20, color: 'red'}}/>}
                                </View>
                                <View style={{width: 40}}>
                                    {driverInfo.operate_type == 1 &&
                                    <FontTag size={30} title='自' color={styleColor} fontColor='#fff'/>}
                                    {driverInfo.operate_type == 2 &&
                                    <FontTag size={30} title='协' color={styleColor} fontColor='#fff'/>}
                                    {driverInfo.operate_type == 3 &&
                                    <FontTag size={30} title='供' color={styleColor} fontColor='#fff'/>}
                                    {driverInfo.operate_type == 4 &&
                                    <FontTag size={30} title='包' color={styleColor} fontColor='#fff'/>}
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', paddingHorizontal: 40}}>
                                <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesomeIcon name='building-o' size={12} color={'#838485'}/>
                                    <Text
                                        style={[globalStyles.midText, {paddingLeft: 5}]}>{driverInfo.company_name ? driverInfo.company_name : ''}</Text>
                                </View>
                                <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesomeIcon name='mobile-phone' size={16} color={'#838485'}/>
                                    <Text
                                        style={[globalStyles.midText, {paddingLeft: 5}]}>{driverInfo.mobile ? driverInfo.mobile : ''}</Text>
                                </View>
                            </View>
                        </View>


                        <ListItem style={{justifyContent: 'space-between'}}>
                            <Text style={globalStyles.midText}>关联货车</Text>
                            <Text style={globalStyles.midText}>{driverInfo.truck_num ? driverInfo.truck_num : ''}</Text>
                        </ListItem>
                        <ListItem style={{justifyContent: 'space-between'}}>
                            <Text style={globalStyles.midText}>身份证号</Text>
                            <Text style={globalStyles.midText}>{driverInfo.id_number ? driverInfo.id_number : ''}</Text>
                        </ListItem>
                        <ListItem style={{justifyContent: 'space-between'}}>
                            <Text style={globalStyles.midText}>家庭住址</Text>
                            <Text style={globalStyles.midText}>{driverInfo.address ? driverInfo.address : ''}</Text>
                        </ListItem>
                        <ListItem style={{justifyContent: 'space-between'}}>
                            <Text style={globalStyles.midText}>紧急联系人电话</Text>
                            <Text style={globalStyles.midText}>{driverInfo.sib_tel ? driverInfo.sib_tel : ''}</Text>
                        </ListItem>
                        <ListItem style={{justifyContent: 'space-between'}}>
                            <Text style={globalStyles.midText}>驾照类型</Text>
                            <Text
                                style={globalStyles.midText}>{this.props.driverInfoReducer.data.driverInfo.license_type ? drivingLicenseTypeList.find((item) => item.id == this.props.driverInfoReducer.data.driverInfo.license_type).value : ''}
                            </Text>
                        </ListItem>
                        <ListItem style={{justifyContent: 'space-between'}}>
                            <Text style={globalStyles.midText}>驾驶证检证日期</Text>
                            <Text
                                style={globalStyles.midText}>{driverInfo.license_date ? moment(driverInfo.license_date).format('YYYY-MM-DD') : ''}</Text>
                        </ListItem>
                        <ListItem style={{justifyContent: 'space-between'}}>
                            <Text style={globalStyles.midText}>开户行</Text>
                            <Text
                                style={globalStyles.midText}>{driverInfo.bank_name ? `${driverInfo.bank_name}` : ''}</Text>
                        </ListItem>

                        <ListItem style={{justifyContent: 'space-between'}}>
                            <Text style={globalStyles.midText}>账号</Text>
                            <Text
                                style={globalStyles.midText}>{driverInfo.bank_number ? `${driverInfo.bank_number}` : ''}</Text>
                        </ListItem>

                        <ListItem style={{justifyContent: 'space-between'}}>
                            <Text style={globalStyles.midText}>户名</Text>
                            <Text
                                style={globalStyles.midText}>{driverInfo.bank_user_name ? `${driverInfo.bank_user_name}` : ''}</Text>
                        </ListItem>
                        <ListItem style={{justifyContent: 'space-between'}}>
                            <Text style={globalStyles.midText}>备注</Text>
                            <Text style={globalStyles.midText}>{driverInfo.remark ? driverInfo.remark : ''}</Text>
                        </ListItem>

                    </Content>
                </Container>
            )
        }
    }

    renderDriverPhoto() {
        const {getDriverImage} = this.props.driverInfoReducer
        const {communicationSettingReducer: {data: {file_host}}} = this.props


        if (getDriverImage.isResultStatus == 1) {
            return (
                <View style={{backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator
                        animating={getDriverImage.isResultStatus == 1}
                        style={{height: 80}}
                        size="large"
                    />
                </View>
            )
        } else {
            const {driverInfo, driverRecordList} = this.props.driverInfoReducer.data
            //console.log("driverInfo======"+JSON.stringify(driverInfo))
            let imageHead = [(
                <View key={'head1'} style={{flexDirection: 'row'}}>
                    {!driverInfo.drive_image ?
                        <PhotoItemDefault title='身份证正面'
                                          containerSytle={{marginLeft: 10, marginRight: 5, marginTop: 10}}/> :
                        <PhotoItem title='身份证正面' onShowPhoto={() => Actions.singlePhotoView({
                            initParam: {
                                imageUrlList: [`${file_host}/image/${driverInfo.drive_image}`],
                                index: 0
                            }
                        })} uri={driverInfo.drive_image} type={1}
                                   containerSytle={{marginLeft: 10, marginRight: 5, marginTop: 10}}/>}
                    {!driverInfo.driver_image_re ?
                        <PhotoItemDefault title='身份证背面'
                                          containerSytle={{marginLeft: 5, marginRight: 10, marginTop: 10}}/> :
                        <PhotoItem title='身份证背面' onShowPhoto={() => Actions.singlePhotoView({
                            initParam: {
                                imageUrlList: [`${file_host}/image/${driverInfo.driver_image_re}`],
                                index: 0
                            }
                        })} uri={driverInfo.driver_image_re} type={1}
                                   containerSytle={{marginLeft: 5, marginRight: 10, marginTop: 10}}/>}
                </View>
            ), (
                <View key={'head2'} style={{flexDirection: 'row'}}>
                    {!driverInfo.op_license_image ?
                        <PhotoItemDefault title='驾驶证'
                                          containerSytle={{marginLeft: 10, marginRight: 5, marginTop: 10}}/> :
                        <PhotoItem title='驾驶证' onShowPhoto={() => Actions.singlePhotoView({
                            initParam: {
                                imageUrlList: [`${file_host}/image/${driverInfo.op_license_image}`],
                                index: 0
                            }
                        })} uri={driverInfo.op_license_image} type={1}
                                   containerSytle={{marginLeft: 10, marginRight: 5, marginTop: 10}}/>}
                    {!driverInfo.driver_avatar_image ?
                        <PhotoItemDefault title='个人照片'
                                          containerSytle={{marginLeft: 5, marginRight: 10, marginTop: 10}}/> :
                        <PhotoItem title='个人照片' onShowPhoto={() => Actions.singlePhotoView({
                            initParam: {
                                imageUrlList: [`${file_host}/image/${driverInfo.driver_avatar_image}`],
                                index: 0
                            }
                        })} uri={driverInfo.driver_avatar_image} type={1}
                                   containerSytle={{marginLeft: 5, marginRight: 10, marginTop: 10}}/>}
                </View>
            )]
            return (
                <View style={{flex: 1}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={[...imageHead]}
                        renderItem={({item}) => item}
                    />
                </View>
            )
        }
    }

    renderDriverRecord() {
        const {getDriverRecord} = this.props.driverInfoReducer

        if (getDriverRecord.isResultStatus == 1) {
            return (
                <View style={{backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator
                        animating={getDriverRecord.isResultStatus == 1}
                        style={{height: 80}}
                        size="large"
                    />
                </View>
            )
        } else {
            const {driverRecordList} = this.props.driverInfoReducer.data
            return (
                <View style={{flex: 1}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={driverRecordList}
                        renderItem={({item, index}) => <RecordListItem data={item} key={index}/>}
                    />
                </View>
            )
        }
    }

    render() {
        //console.log(this.props.userReducer)
        const {driverInfoReducer: {getDriverInfo, getDriverImage, getDriverRecord}} = this.props
        return (
            <Container style={globalStyles.listBackgroundColor}>
                <Tabs tabBarUnderlineStyle={{backgroundColor: '#fff'}}>
                    <Tab
                        tabStyle={{backgroundColor: '#76b92c'}}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, {color: '#fff'}]}
                        textStyle={[globalStyles.midText, {color: '#ddd'}]}
                        heading="基本信息">
                        {getDriverInfo.isResultStatus == 5 &&
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>基本信息</Text>
                        </View>}
                        {getDriverInfo.isResultStatus != 5 && getDriverInfo.isResultStatus != 1 && this.renderDriverInfo()}
                        {getDriverInfo.isResultStatus == 1 && <Spinner color={styleColor}/>}
                    </Tab>
                    <Tab
                        tabStyle={{backgroundColor: '#76b92c'}}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, {color: '#fff'}]}
                        textStyle={[globalStyles.midText, {color: '#ddd'}]}
                        heading="照片">
                        {getDriverInfo.isResultStatus == 5 &&
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>未上传照片</Text>
                        </View>}
                        {getDriverInfo.isResultStatus == 2 && getDriverImage.isResultStatus == 2 && this.renderDriverPhoto()}
                        {(getDriverInfo.isResultStatus == 1 || getDriverImage.isResultStatus == 1) &&
                        <Spinner color={styleColor}/>}
                    </Tab>
                    <Tab
                        tabStyle={{backgroundColor: '#76b92c'}}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, {color: '#fff'}]}
                        textStyle={[globalStyles.midText, {color: '#ddd'}]}
                        heading="记录">
                        {getDriverInfo.isResultStatus == 5 &&
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>没有记录</Text>
                        </View>}
                        {getDriverInfo.isResultStatus == 2 && getDriverRecord.isResultStatus == 2 && this.renderDriverRecord()}
                        {(getDriverInfo.isResultStatus == 1 || getDriverRecord.isResultStatus == 1) &&
                        <Spinner color={styleColor}/>}
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        driverInfoReducer: state.driverInfoReducer,
        loginReducer: state.loginReducer,
        communicationSettingReducer:state.communicationSettingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getDriverInfo: (param) => {
        dispatch(actions.driverInfoAction.getDriverInfo(param))
    },
    setGetDriverInfoWaiting: () => {
        dispatch(actions.driverInfoAction.setGetDriverInfoWaiting())
    },
    getDriverRecord: (param) => {
        dispatch(actions.driverInfoAction.getDriverRecord(param))
    },
    setGetDriverRecordWaiting: () => {
        dispatch(actions.driverInfoAction.setGetDriverRecordWaiting())
    },
    getDriverImage: (param) => {
        dispatch(actions.driverInfoAction.getDriverImage(param))
    },
    setGetDriverImageWaiting: () => {
        dispatch(actions.driverInfoAction.setGetDriverImageWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DriverInfo)
