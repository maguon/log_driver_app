import React from 'react'
import { InteractionManager } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'

const OveruseDieselOilLeftButton = props => {
    const { cleanOveruseDieselOilList } = props
    return (
        <Button transparent onPress={() => {
            Actions.pop()
            InteractionManager.runAfterInteractions(cleanOveruseDieselOilList)
        }}>
            <Icon name='arrow-back' />
        </Button>
    )
}

const mapDispatchToProps = (dispatch) => ({
    cleanPeccancyList: () => {
        dispatch(actions.overuseDieselOilListAction.cleanOveruseDieselOilList())
    }
})
export default connect(null, mapDispatchToProps)(OveruseDieselOilLeftButton)
