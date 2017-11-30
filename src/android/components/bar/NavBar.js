import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { Header, Title, Button, Icon, Right, Left, Body } from 'native-base'
import { Actions } from 'react-native-router-flux'

export default class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        isRequirePopRefresh: false
    }

    render() {
        let { title, layout } = this.props
        return (
            <View androidStatusBarColor='#00cade' style={{ flex: 1, position: 'absolute', top: 0, backgroundColor: '#fff', width: layout.initWidth }}>
                <StatusBar hidden={false} />
                <Header androidStatusBarColor='#00cade' style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade' }}>
                    <Title>{title}</Title>
                    <View style={{ position: 'absolute', left: 0 }}>
                        <Button transparent onPress={() => Actions.pop({ refresh: { isPopRefresh: this.props.isRequirePopRefresh } })}>
                            <Icon name="ios-arrow-back" size={30} color='#ffffff' />
                        </Button>
                    </View>
                </Header>
            </View>
        )
    }
}
