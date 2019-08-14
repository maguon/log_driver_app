import React from 'react'
import { connect } from 'react-redux'
import { Container,  Tab, Tabs, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../utils/GlobalStyles'
import CarInfoForDemage from './CarInfoForDemage'
import RecordForDemage from './RecordForDemage'
import ImageListForDemage from './ImageListForDemage'
import DemageEditor from '../utils/DemageEditor'
import DemageDetail from '../utils/DemageDetail'
import ImageEditorForDemage from '../utils/ImageEditorForDemage'


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
