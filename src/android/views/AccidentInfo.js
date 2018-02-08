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

const AccidentInfo = props => {
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
                        {/* <AccidentDetail /> */}
                        <AccidentEditor />
                    </Container>
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="照片">
                    <Container>
                        <ImageEditorForAccident />
                        {/* <ImageListForAccident /> */}
                    </Container>
                </Tab>
            </Tabs>
        </Container>
    )
}


export default AccidentInfo