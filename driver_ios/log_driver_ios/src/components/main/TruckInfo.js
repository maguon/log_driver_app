import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import { Container, Tabs, Tab, Spinner } from 'native-base'
import { connect } from 'react-redux'

import globalStyles, { styleColor } from '../utils/GlobalStyles'
import TruckDetail from './TruckDetail'
import TruckImage from './TruckImage'
import TruckInsurance from './TruckInsurance'
import TruckRepairList from './TruckRepairList'
import * as actions from '../../actions/index'



class TruckInfo extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getTruckInfoWaiting()
        this.props.getTruckRepairListWaiting()
        this.props.getTruckInsuranceWaiting()
        this.props.getTruckImageWaiting()
        this.props.getTruckInfo([
            actions.truckRepairListAction.getTruckRepairList,
            actions.truckInsuranceAction.getTruckInsurance,
            actions.truckImageAction.getTruckImage
        ])
    }

    render() {
        const { truckDetailReducer: { getTruckInfo },
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
                        {getTruckInfo.isResultStatus != 5 && getTruckInfo.isResultStatus != 1 && <TruckDetail />}
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
        truckDetailReducer: state.truckDetailReducer,
        truckImageReducer: state.truckImageReducer,
        truckRepairListReducer: state.truckRepairListReducer,
        truckInsuranceReducer: state.truckInsuranceReducer,
        loginReducer: state.loginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTruckInfo: (param) => {
        dispatch(actions.truckDetailAction.getTruckInfo(param))
    },
    getTruckInfoWaiting: () => {
        dispatch(actions.truckDetailAction.getTruckInfoWaiting())
    },
    getTruckRepairListWaiting: () => {
        dispatch(actions.truckRepairListAction.getTruckRepairListWaiting())
    },
    getTruckInsuranceWaiting: () => {
        dispatch(actions.truckInsuranceAction.getTruckInsuranceWaiting())
    },
    getTruckImageWaiting: () => {
        dispatch(actions.truckImageAction.getTruckImageWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TruckInfo)
