import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Container, Tabs, Tab, Spinner } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../GlobalStyles'
//new
import TruckInfo from './truckInfo/TruckInfo'
import TruckImage from './truckImage/TruckImage'
import TruckInsurance from './truckInsurance/TruckInsurance'
import TruckRepairList from './truckRepairList/TruckRepairList'
import * as truckInfoAction from './truckInfo/truckInfoAction'
import * as truckRepairListAction from './truckRepairList/truckRepairListAction'
import * as truckInsuranceAction from './truckInsurance/truckInsuranceAction'
import * as truckImageAction from './truckImage/truckImageAction'


class Truck extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getTruckInfoWaiting()
        this.props.getTruckRepairListWaiting()
        this.props.getTruckInsuranceWaiting()
        this.props.getTruckImageWaiting()
        this.props.getTruckInfo([
            truckRepairListAction.getTruckRepairList,
            truckInsuranceAction.getTruckInsurance,
            truckImageAction.getTruckImage
        ])
    }

    render() {
        const { truckInfoReducer: { getTruckInfo },
            truckImageReducer: { getTruckImage },
            truckRepairListReducer: { getTruckRepairList },
            truckInsuranceReducer: { getTruckInsurance } } = this.props
        return (
            <Container style={globalStyles.listBackgroundColor}>
                <Tabs>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#ddd' }]}
                        heading="信息">
                        {getTruckInfo.isResultStatus == 5 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>未绑定车头</Text>
                        </View>}
                        {getTruckInfo.isResultStatus != 5 && getTruckInfo.isResultStatus != 1 && <TruckInfo />}
                        {getTruckInfo.isResultStatus == 1 && <Spinner color={styleColor} />}
                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#ddd' }]}
                        heading="照片">
                        {getTruckInfo.isResultStatus == 5 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>未绑定车头</Text>
                        </View>}
                        {getTruckInfo.isResultStatus == 2 && getTruckImage.isResultStatus == 2 && <TruckImage />}
                        {(getTruckInfo.isResultStatus == 1 || getTruckImage.isResultStatus == 1) && <Spinner color={styleColor} />}
                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#ddd' }]}
                        heading="车保">
                        {getTruckInfo.isResultStatus == 5 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>未绑定车头</Text>
                        </View>}
                        {getTruckInfo.isResultStatus == 2 && getTruckInsurance.isResultStatus == 2 && <TruckInsurance />}
                        {(getTruckInfo.isResultStatus == 1 || getTruckInsurance.isResultStatus == 1) && <Spinner color={styleColor} />}
                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#ddd' }]}
                        heading="维修">
                        {getTruckInfo.isResultStatus == 5 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>未绑定车头</Text>
                        </View>}
                        {getTruckInfo.isResultStatus == 2 && getTruckRepairList.isResultStatus == 2 && <TruckRepairList />}
                        {(getTruckInfo.isResultStatus == 1 || getTruckRepairList.isResultStatus == 1) && <Spinner color={styleColor} />}
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        truckInfoReducer: state.truckInfoReducer,
        truckImageReducer: state.truckImageReducer,
        truckRepairListReducer: state.truckRepairListReducer,
        truckInsuranceReducer: state.truckInsuranceReducer,
        loginReducer: state.loginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTruckInfo: (param) => {
        dispatch(truckInfoAction.getTruckInfo(param))
    },
    getTruckInfoWaiting: () => {
        dispatch(truckInfoAction.getTruckInfoWaiting())
    },
    getTruckRepairListWaiting: () => {
        dispatch(truckRepairListAction.getTruckRepairListWaiting())
    },
    getTruckInsuranceWaiting: () => {
        dispatch(truckInsuranceAction.getTruckInsuranceWaiting())
    },
    getTruckImageWaiting: () => {
        dispatch(truckImageAction.getTruckImageWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Truck)