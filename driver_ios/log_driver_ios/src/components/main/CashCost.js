import React, { Component } from 'react'
import { Container, Tabs, Tab} from 'native-base'
import { connect } from 'react-redux'

import globalStyles, { styleColor } from '../utils/GlobalStyles'
import CashRefueling from './CashRefueling'
import CashMaintenance from './CashMaintenance'
import CashETC from './CashETC'
import * as actions from '../../actions/index'



class CashCost extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
         this.props.getCashRefuelingWaiting()
        this.props.getCashMaintenanceWaiting()
        this.props.getCashETCWaiting()
        actions.cashRefuelingAction.getCashRefueling(),
            actions.cashMaintenanceAction.getCashMaintenance(),
            actions.cashETCAction.getCashETC()

    }

    render() {
        return (
            <Container style={globalStyles.listBackgroundColor}>
                <Tabs tabBarUnderlineStyle={{backgroundColor: '#fff'}}>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#ddd' }]}
                        heading="现金加油">
                       <CashRefueling/>
                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#ddd' }]}
                        heading="现金维修">
                       <CashMaintenance />

                    </Tab>
                    <Tab
                        tabStyle={globalStyles.styleBackgroundColor}
                        activeTabStyle={globalStyles.styleBackgroundColor}
                        activeTextStyle={[globalStyles.midText, { color: '#fff' }]}
                        textStyle={[globalStyles.midText, { color: '#ddd' }]}
                        heading="现金过路费">
                        <CashETC />
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cashCostReducer: state.cashCostReducer,
        cashRefuelingReducer: state.cashRefuelingReducer,
        cashMaintenanceReducer: state.cashMaintenanceReducer,
        cashETCReducer: state.cashETCReducer,
        loginReducer: state.loginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

    getCashRefuelingWaiting: () => {
        dispatch(actions.cashRefuelingAction.getCashRefuelingWaiting())
    },
    getCashMaintenanceWaiting: () => {
        dispatch(actions.cashMaintenanceAction.getCashMaintenanceWaiting())
    },
    getCashETCWaiting: () => {
        dispatch(actions.cashETCAction.getCashETCWaiting())
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(CashCost)
