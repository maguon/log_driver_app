import React from 'react'
import { Actions } from 'react-native-router-flux'
import { Button, Icon } from 'native-base'


const TaskLoanListOP = props => {
    return (
        <Button transparent onPress={Actions.searchTaskLoan}>
            <Icon name='ios-search-outline' style={{ color: '#fff' }} />
        </Button>
    )
}

export default TaskLoanListOP


