import React from 'react'
import { Tab, Tabs, Container } from 'native-base'
import globalStyles from '../utils/GlobalStyles'
import CleanRelInfo from './CleanRelInfo'
import ReceiveForCleanRel from '../main/ReceiveForCleanRel'



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
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="基本信息">
                    <CleanRelInfo cleanRelInfo={cleanRelInfo} />
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="经销商信息">
                    <ReceiveForCleanRel />
                </Tab>
            </Tabs>
        </Container>
    )
}

export default CleanRel
