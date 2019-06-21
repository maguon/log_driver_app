import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {Container,Tab,Tabs,Button} from 'native-base'
import globalStyles from '../utils/GlobalStyles'
import MileageInfo from '../layout/MileageInfo'


class Home extends Component {
    constructor(props) {
        super(props)

    }

    render() {

        return (
            <Container style={globalStyles.listBackgroundColor}>
                <MileageInfo />
                <Tabs>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                        heading="路线">
                      <Text>1111111</Text>
                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#adc5d5' }]}
                        heading="任务">
                        <Text>2222222</Text>
                    </Tab>

                </Tabs>
            </Container>
        )
    }
}

export default Home
