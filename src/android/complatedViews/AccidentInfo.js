import React from 'react'
import { Container, Tab, Tabs } from 'native-base'
import AccidentDetail from '../complatedComponents/accidentInfo/AccidentDetail'
import AccidentEditor from '../complatedComponents/accidentInfo/addcidentEditor/AccidentEditor'
import ImageEditorForAccident from '../complatedComponents/accidentInfo/imageListForAccident/ImageEditorForAccident'
import ImageListForAccident from '../complatedComponents/accidentInfo/imageListForAccident/ImageListForAccident'
import globalStyles from '../GlobalStyles'
import { connect } from 'react-redux'

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