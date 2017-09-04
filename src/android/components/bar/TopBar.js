import React, { Component } from 'react'
import { Header, Title, Button, Icon } from 'native-base'
import { View, StatusBar } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class TopBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { title, layout } = this.props
        return (
            <View androidStatusBarColor='#00cade' style={{ flex: 1, position: 'absolute', top: 0, backgroundColor: '#fff', width: layout.initWidth }}>
                <StatusBar hidden={false} />
                <Header androidStatusBarColor='#00cade' style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade' }}>
                    <Title>{title}</Title>
                    {this.props.rightType == 1 && <View style={{ position: 'absolute', right: 0 }}>
                        <Button transparent onPress={this.props.onPressRight}>
                            <Icon name="md-add" size={30} color='#ffffff' />
                        </Button>
                    </View>}
                </Header>
            </View>
        )
    }
}