import React from 'react'
import {
    Text,
    View
} from 'react-native'
import { Tab, Tabs, Container } from 'native-base'

import CleanRelInfo from './CleanRelInfo'
import ReceiveForCleanRel from './receiveForCleanRel/ReceiveForCleanRel'
import globalStyles from '../../GlobalStyles'


const CleanRel = props => {
    const { cleanRelInfo } = props
    // console.log('cleanRelInfo', cleanRelInfo)
    return (
        <Container>
            <Tabs>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                    heading="基本信息">
                    <CleanRelInfo cleanRelInfo={cleanRelInfo} />
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                    heading="经销商信息">
                    <ReceiveForCleanRel />
                </Tab>
            </Tabs>
        </Container>
    )
}

export default CleanRel