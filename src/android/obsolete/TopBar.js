import React, { Component } from 'react'
import { Header, Title, Button, Icon } from 'native-base'
import { View, StatusBar } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class TopBar extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        rightType: 0, //0：不显示right 1:add
        onPressRight: () => { },
        // leftType: 0, //0：不显示left 1:add
        // onPressLeft: () => { },
        // leftButtonTitle: ''
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
                            <MaterialCommunityIcons name='qrcode' size={20} color='#fff' />
                        </Button>
                    </View>}
                </Header>
            </View>
        )
    }
}