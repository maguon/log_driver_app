import React from 'react'
import {
    StyleSheet,
    Text
} from 'react-native'
import { Button, Spinner } from 'native-base'
//import gobalStyles, { styleColor } from '../../general/GlobalStyles'
//import { connect } from 'react-redux'
// import * as reduxActions from '../../actions/index'
// import * as homeAction from '../views/blockInitial/home/HomeAction'


const HomeOperation = props => {
    // const { getMileageInfo, getMileageInfoWaiting, getTaskListForHome,
    //     getTaskListForHomeWaiting, getRouteTaskListForHome, getRouteTaskListForHomeWaiting, homeReducer } = props
    // if (homeReducer.getHomeMileageInfo.isResultStatus == 1) {
        return (
            <Spinner color='rgba(255,255,255,0.5)' />
        )
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
    //             <Text style={[gobalStyles.smallText, styles.text]} >刷新</Text>
    //         </Button>
    //     )
    // }
}


const mapStateToProps = (state) => {
    return {
        homeReducer: state.homeReducer
    }
}


// const mapDispatchToProps = (dispatch) => ({
//     getMileageInfoWaiting: () => {
//         dispatch(reduxActions.mileageInfo.getMileageInfoWaiting())
//     },
//     getMileageInfo: () => {
//         dispatch(reduxActions.mileageInfo.getMileageInfo())
//     },
//     getTaskListForHome: () => {
//         dispatch(reduxActions.taskListForHome.getTaskListForHome())
//     },
//     getTaskListForHomeWaiting: () => {
//         dispatch(reduxActions.taskListForHome.getTaskListForHomeWaiting())
//     },
//     getRouteTaskListForHome: () => {
//         dispatch(reduxActions.routeTaskListForHome.getRouteTaskListForHome())
//     },
//     getRouteTaskListForHomeWaiting: () => {
//         dispatch(reduxActions.routeTaskListForHome.getRouteTaskListForHomeWaiting())
//     }
// })
//
// export default connect(mapStateToProps, mapDispatchToProps)(HomeOperation)
export default HomeOperation
const styles = StyleSheet.create({
    text: {
        color: '#fff'
    }
})
