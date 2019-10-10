import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Container, Tab, Tabs, TabHeading } from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'
import CashToll from './cashToll/CashToll'
import CashRepair from './cashRepair/CashRepair'
import CashOil from './cashOil/CashOil'

const Cash = props => {
    return (
        <Container>
            <Tabs>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="现金维修">
                    <CashRepair />
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="现金加油">
                    <CashOil />
                </Tab>
                <Tab
                    tabStyle={globalStyles.styleBackgroundColor}
                    activeTabStyle={globalStyles.styleBackgroundColor}
                    activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                    textStyle={[globalStyles.midText, { color: '#ddd' }]}
                    heading="现金过路费">
                    <CashToll />
                </Tab>
            </Tabs>
        </Container>
    )
}

export default Cash