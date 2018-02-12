import React, { Component } from 'react'
import {
    View,
} from 'react-native'
import { Container, Header, Tab, Tabs, TabHeading, Icon, ListItem, Spinner } from 'native-base'
import AccidentDetail from '../components/accidentInfo/AccidentDetail'
import AccidentEditor from '../components/accidentInfo/AccidentEditor'
import ImageEditorForAccident from '../components/accidentInfo/ImageEditorForAccident'
import ImageListForAccident from '../components/accidentInfo/ImageListForAccident'
import globalStyles from '../GlobalStyles'
import { connect } from 'react-redux'

const AccidentInfo = props => {
   // console.log('props', props)
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
                        {accidentInfo.accident_status == 1 && <ImageEditorForAccident />}
                        {accidentInfo.accident_status == 2 && <ImageEditorForAccident />}
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

const mapDispatchToProps = (dispatch, ownProps) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AccidentInfo)