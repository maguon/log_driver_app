import React, { Component } from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, ListItem, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../GlobalStyles'
import CarInfoForDemage from '../components/demageInfo/CarInfoForDemage'
import RecordForDemage from '../components/demageInfo/RecordForDemage'
import ImageListForDemage from '../components/demageInfo/ImageListForDemage'
import DemageOpResult from '../components/demageInfo/DemageOpResult'
import DemageDetail from '../components/demageInfo/DemageDetail'
import ImageEditorForDemage from '../components/demageInfo/ImageEditorForDemage'
import DemageEditor from '../components/demageInfo/DemageEditor'

const DemageInfo = props => {
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
                        {damage_status == 1 && <DemageEditor initParam={initParam} parent={parent} />}
                        {damage_status == 2 && <DemageEditor initParam={initParam} parent={parent} />}
                        {damage_status == 3 && <DemageDetail initParam={initParam} />}
                    </Container>
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="照片">
                    <Container>
                        {damage_status == 3 && <ImageListForDemage initParam={initParam} parent={parent} />}
                        {damage_status == 1 && <ImageEditorForDemage initParam={initParam} parent={parent} />}
                        {damage_status == 2 && <ImageEditorForDemage initParam={initParam} parent={parent} />}
                    </Container>
                </Tab>
                {/* {damage_status != 1 && <Tab
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
                </Tab>} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DemageInfo)
