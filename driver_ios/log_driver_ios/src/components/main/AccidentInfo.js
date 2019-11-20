import React from 'react'
import { Container, Tab, Tabs } from 'native-base'
import globalStyles from '../utils/GlobalStyles'
import { connect } from 'react-redux'
import AccidentDetail from '../modules/AccidentDetail'
import AccidentEditor from './AccidentEditor'
import ImageEditorForAccident from './ImageEditorForAccident'
import ImageListForAccident from './ImageListForAccident'
import CameraEditorForAccident from  './CameraEditorForAccident'

const AccidentInfo = props => {
    const { accidentInfo } = props
    return (
        <Container style={globalStyles.listBackgroundColor}>
            <Tabs>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="事故">
                    <Container>
                        {accidentInfo.accident_status == 1 && <AccidentEditor accidentInfo={accidentInfo} />}
                        {accidentInfo.accident_status == 2 && <AccidentEditor accidentInfo={accidentInfo} />}
                        {accidentInfo.accident_status == 3 && <AccidentDetail accidentInfo={accidentInfo} />}
                    </Container>
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="照片">
                    <Container>
                        {accidentInfo.accident_status == 1 && <ImageEditorForAccident accidentInfo={accidentInfo} />}
                        {accidentInfo.accident_status == 2 && <ImageEditorForAccident accidentInfo={accidentInfo} />}
                        {accidentInfo.accident_status == 3 && <ImageListForAccident />}
                    </Container>
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="视频">
                    <Container>
                        {accidentInfo.accident_status == 1 && <CameraEditorForAccident accidentInfo={accidentInfo} />}
                        {accidentInfo.accident_status == 2 && <CameraEditorForAccident accidentInfo={accidentInfo} />}
                        {/*{accidentInfo.accident_status == 3 && <ImageListForAccident />}*/}
                    </Container>
                </Tab>
            </Tabs>
        </Container>
    )
}


const mapStateToProps = (state, ownProps) => {
    return {
        accidentInfo: state.accidentListReducer.data.accidentList.find(item => item.id == ownProps.accidentId)
    }
}


export default connect(mapStateToProps)(AccidentInfo)
