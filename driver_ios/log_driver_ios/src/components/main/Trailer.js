import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Tabs, Tab, Spinner } from 'native-base'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import * as actions from '../../actions/index'
import TrailerInfo from './TrailerInfo'
import TrailerInsurance from './TrailerInsurance'
import TrailerRepairList from './TrailerRepairList'
import TrailerImage from './TrailerImage'

class Trailer extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getTrailerInfoWaiting()
        this.props.getTrailerRepairListWaiting()
        this.props.getTrailerImageWaiting()
        this.props.getTrailerInsuranceWaiting()
        this.props.getTrailerInfo([
            actions.trailerInsuranceAction.getTrailerInsurance,
            actions.trailerRepairListAction.getTrailerRepairList,
            actions.trailerImageAction.getTrailerImage
        ])
    }

    render() {
        const { trailerInfoReducer: { getTrailerInfo },
            trailerInsuranceReducer: { getTrailerInsurance },
            trailerImageReducer: { getTrailerImage },
            trailerRepairListReducer: { getTrailerRepairList } } = this.props
        return (
            <Container style={globalStyles.listBackgroundColor}>
                <Tabs tabBarUnderlineStyle={{backgroundColor: '#fff'}}>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#ddd' }]}
                        heading="信息">
                        {getTrailerInfo.isResultStatus == 5 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>未绑定车头</Text>
                        </View>}
                        {getTrailerInfo.isResultStatus != 5 && getTrailerInfo.isResultStatus != 1 && <TrailerInfo />}
                        {getTrailerInfo.isResultStatus == 1 && <Spinner color={styleColor} />}
                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#ddd' }]}
                        heading="照片">
                        {getTrailerInfo.isResultStatus == 5 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>未绑定车头</Text>
                        </View>}
                        {getTrailerInfo.isResultStatus == 2 && getTrailerImage.isResultStatus == 2 && <TrailerImage />}
                        {(getTrailerInfo.isResultStatus == 1 || getTrailerImage.isResultStatus == 1) && <Spinner color={styleColor} />}
                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#ddd' }]}
                        heading="车保">
                        {getTrailerInfo.isResultStatus == 5 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>未绑定车头</Text>
                        </View>}
                        {getTrailerInfo.isResultStatus == 2 && getTrailerInsurance.isResultStatus == 2 && <TrailerInsurance />}
                        {(getTrailerInfo.isResultStatus == 1 || getTrailerInsurance.isResultStatus == 1) && <Spinner color={styleColor} />}
                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#ddd' }]}
                        heading="维修">
                        {getTrailerInfo.isResultStatus == 5 && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>未绑定车头</Text>
                        </View>}
                        {getTrailerInfo.isResultStatus == 2 && getTrailerRepairList.isResultStatus == 2 && <TrailerRepairList />}
                        {(getTrailerInfo.isResultStatus == 1 || getTrailerRepairList.isResultStatus == 1) && <Spinner color={styleColor} />}
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        trailerInfoReducer: state.trailerInfoReducer,
        trailerInsuranceReducer: state.trailerInsuranceReducer,
        trailerImageReducer: state.trailerImageReducer,
        trailerRepairListReducer: state.trailerRepairListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getTrailerInfo: (param) => {
        dispatch(actions.trailerInfoAction.getTrailerInfo(param))
    },
    getTrailerInfoWaiting: () => {
        dispatch(actions.trailerInfoAction.getTrailerInfoWaiting())
    },
    getTrailerRepairListWaiting: () => {
        dispatch(actions.trailerRepairListAction.getTrailerRepairListWaiting())
    },
    getTrailerInsuranceWaiting: () => {
        dispatch(actions.trailerInsuranceAction.getTrailerInsuranceWaiting())
    },
    getTrailerImageWaiting: () => {
        dispatch(actions.trailerImageAction.getTrailerImageWaiting())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Trailer)
