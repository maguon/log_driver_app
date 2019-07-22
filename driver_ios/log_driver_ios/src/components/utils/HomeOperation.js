import React from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Button, Spinner } from 'native-base'
import globalStyles from '../../general/GlobalStyles'
import { connect } from 'react-redux'
import * as actions from '../../actions/index'


const HomeOperation = props => {
    // const { getMileageInfo, getMileageInfoWaiting, getTaskListForHome,
    //     getTaskListForHomeWaiting, getRouteTaskListForHome, getRouteTaskListForHomeWaiting, taskListForHomeReducer } = props
    // if (taskListForHomeReducer.getTaskListForHome.isResultStatus == 1) {
    //     return (
    //         <Spinner color='rgba(255,255,255,0.5)' />
    //     )
    // } else {
    //     return (
    //         <Button transparent onPress={() => {
    //             getMileageInfoWaiting()
    //             getTaskListForHomeWaiting()
    //             getRouteTaskListForHomeWaiting()
    //             getMileageInfo()
    //             getTaskListForHome()
    //             getRouteTaskListForHome()
    //         }}>
    //             <Text style={[globalStyles.smallText, styles.text]} >刷新</Text>
    //         </Button>
    //     )
    // }
}


// const mapStateToProps = (state) => {
//     return {
//         homeReducer: state.homeReducer
//     }
// }


const mapDispatchToProps = (dispatch) => ({
    // getMileageInfoWaiting: () => {
    //     dispatch(actions.mileageInfoAction.getMileageInfoWaiting())
    // },
    // getMileageInfo: () => {
    //     dispatch(actions.mileageInfoAction.getMileageInfo())
    // },
    // getTaskListForHome: () => {
    //     dispatch(actions.taskListForHomeAction.getTaskListForHome())
    // },
    // getTaskListForHomeWaiting: () => {
    //     dispatch(actions.taskListForHomeAction.getTaskListForHomeWaiting())
    // },
    // getRouteTaskListForHome: () => {
    //     dispatch(actions.routeTaskListForHomeAction.getRouteTaskListForHome())
    // },
    // getRouteTaskListForHomeWaiting: () => {
    //     dispatch(actions.routeTaskListForHomeAction.getRouteTaskListForHomeWaiting())
    // }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeOperation)
//export default HomeOperation
const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
