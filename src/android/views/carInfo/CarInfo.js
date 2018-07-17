import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    InteractionManager,
    ActivityIndicator,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import * as carInfoAction from './CarInfoAction'
import moment from 'moment'
import ImageItem from '../../components/share/imageItem/ImageItem'
import { file_host } from '../../../config/Host'
import * as RouterDirection from '../../../util/RouterDirection'
import { Actions } from 'react-native-router-flux'
import { ListItem } from 'native-base'
import globalStyles from '../../GlobalStyles'

const window = Dimensions.get('window')

class CarInfo extends Component {
    constructor(props) {
        super(props)
        this.renderListHeader = this.renderListHeader.bind(this)
    }

    componentDidMount() {
        this.props.getCarInfoWaiting()
        const { user } = this.props.loginReducer.data
        InteractionManager.runAfterInteractions(() => this.props.getCarInfo({
            OptionalParam: { vin: this.props.initParam.vin },
            requiredParam: {
                userId: user.uid,
                carId: this.props.initParam.carId
            }
        }))
    }

    renderListHeader() {
        const { carInfo } = this.props.carInfoReducer.data
        return (
            <View>
                <ListItem>
                    <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>VIN：<Text style={{ fontWeight: '100' }}>{carInfo.vin ? `${carInfo.vin}` : ''}</Text></Text>
                </ListItem>
                <ListItem>
                    <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>品牌：<Text style={{ fontWeight: '100' }}>{carInfo.make_name ? `${carInfo.make_name}` : ''}</Text></Text>
                </ListItem>
                <ListItem>
                    <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>发动机号：<Text style={{ fontWeight: '100' }}>{carInfo.engine_num ? `${carInfo.engine_num}` : ''}</Text></Text>
                </ListItem>
                <ListItem>
                    <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>起始地城市：<Text style={{ fontWeight: '100' }}>{carInfo.route_start ? `${carInfo.route_start}` : ''}</Text></Text>
                </ListItem>
                <ListItem>
                    <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>委托方：<Text style={{ fontWeight: '100' }}>{carInfo.entrust_name ? `${carInfo.entrust_name}` : ''}</Text></Text>
                </ListItem>
                <ListItem>
                    <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>目的地城市：<Text style={{ fontWeight: '100' }}>{carInfo.route_end ? `${carInfo.route_end}` : ''}</Text></Text>
                </ListItem>
                <ListItem>
                    <Text style={[globalStyles.midText, { fontWeight: 'bold' }]}>经销商：<Text style={{ fontWeight: '100' }}>{carInfo.receive_name ? `${carInfo.receive_name}` : ''}</Text></Text>
                </ListItem>
            </View>
        )

    }

    renderImage(item, i, setCarImageIndex) {
        return (
            <TouchableOpacity
                style={{ margin: 5 }}
                onPress={() => {
                    setCarImageIndex({ index: i })
                    Actions.photoViewforCarInfo()
                }} >
                <ImageItem imageUrl={`${file_host}/image/${item.url}`} />
            </TouchableOpacity>
        )
    }

    render() {
        const { carInfo, imageList } = this.props.carInfoReducer.data
        const { getCarInfo } = this.props.carInfoReducer
        const { setCarImageIndex } = this.props
        if (getCarInfo.isResultStatus == 1) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator
                            animating={getCarInfo.isResultStatus == 1}
                            style={{ height: 80 }}
                            size="large"
                        />
                    </View>
                </View>)
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        keyExtractor={(item, index) => index}
                        numColumns={2}
                        data={imageList}
                        renderItem={({ item, index }) => this.renderImage(item, index, setCarImageIndex)}
                        ListHeaderComponent={this.renderListHeader}
                        ListFooterComponent={<View style={{ height: 10 }} />} />
                </View>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return {
        carInfoReducer: state.carInfoReducer,
        loginReducer: state.loginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarInfo: (param) => {
        dispatch(carInfoAction.getCarInfo(param))
    },
    getCarInfoWaiting: () => {
        dispatch(carInfoAction.getCarInfoWaiting())
    },
    setCarImageIndex: param => {
        dispatch(carInfoAction.setCarImageIndex(param))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(CarInfo)