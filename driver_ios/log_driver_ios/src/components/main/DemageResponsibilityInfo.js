import React from 'react'
import { connect } from 'react-redux'
import { Container, Tab, Tabs, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../utils/GlobalStyles'

import CarInfoForDemage from './CarInfoForDemage'
import RecordForDemage from './RecordForDemage'
import ImageListForDemage from './ImageListForDemage'

import DemageOpResult from '../utils/DemageOpResult'
import DemageDetail from '../utils/DemageDetail'

const DemageResponsibilityInfo = props => {
    const { initParam: { damage_status },
        initParam,
        carInfoForDemageReducer: { getCarInfo },
        recordForDemageReducer: { getCarInfoRecord },
        demageOpResultReducer: { getDemageOpResult },
        parent } = props
    return (
        <Container style={globalStyles.listBackgroundColor}>
            <Tabs>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="车辆">
                    {(getCarInfo.isResultStatus == 1 || getCarInfoRecord.isResultStatus == 1) ?
                        <Container>
                            <Spinner color={styleColor} />
                        </Container>
                        : <Container>
                            <CarInfoForDemage />
                            <RecordForDemage />
                        </Container>}
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="质损">
                    <Container>
                        <DemageDetail initParam={initParam} />
                    </Container>
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="照片">
                    <Container>
                        <ImageListForDemage initParam={initParam} parent={parent} />
                    </Container>
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="处理">
                    {(getDemageOpResult.isResultStatus == 1) ?
                        <Container>
                            <Spinner color={styleColor} />
                        </Container>
                        : <Container>
                            <DemageOpResult damageStatus={damage_status} />
                        </Container>}
                </Tab>
            </Tabs>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        carInfoForDemageReducer: state.carInfoForDemageReducer,
        recordForDemageReducer: state.recordForDemageReducer,
        demageOpResultReducer: state.demageOpResultReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(DemageResponsibilityInfo)
