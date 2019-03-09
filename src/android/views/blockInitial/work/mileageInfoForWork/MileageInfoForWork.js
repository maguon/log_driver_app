// import React, { Component } from 'react'
// import {
//     Text,
//     View,
//     DatePickerAndroid,
//     InteractionManager,
//     FlatList,
//     ActivityIndicator,
//     TouchableOpacity
// } from 'react-native'
// import { connect } from 'react-redux'
// import globalStyles from '../../../../GlobalStyles'
// import { connect } from 'react-redux'

// const MileageInfoForWork = props => {
//     return (
//         <View style={{ flexDirection: 'row' }}>
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
//                 <Text style={{ fontSize: 11 }}>{data.mileageInfo.distanceCount ? `${data.mileageInfo.distanceCount}` : '0'}</Text>
//                 <Text style={{ fontSize: 11 }}>总里程</Text>
//             </View>
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
//                 <Text style={{ fontSize: 11 }}>{data.mileageInfo.load_distance ? `${data.mileageInfo.load_distance}` : '0'}</Text>
//                 <Text style={{ fontSize: 11 }}>重载里程</Text>
//             </View>
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
//                 <Text style={{ fontSize: 11 }}>{data.mileageInfo.no_load_distance ? `${data.mileageInfo.no_load_distance}` : '0'}</Text>
//                 <Text style={{ fontSize: 11 }}>空载里程</Text>
//             </View>
//         </View>
//     )
// }


// const mapStateToProps = (state) => {
//     return {
//         mileageInfoReducer: state.mileageInfoReducer,
//     }
// }

// export default connect(mapStateToProps)(MileageInfoForWork)
