import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {Container, Content, ListItem} from 'native-base'
import {connect} from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import globalStyles, {styleColor} from '../utils/GlobalStyles'
import FontTag from '../utils/FontTag'
import moment from 'moment'


const TruckDetail = props => {
    const {truckDetailReducer: {data: {truckInfo}}} = props
    return (
        <Container>
            <Content>
                <View style={{padding: 15, backgroundColor: '#f2f6f9'}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: 40}}>
                            <MaterialCommunityIcons name='bus' size={25} color={styleColor}/>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={[globalStyles.largeText, {
                                color: styleColor,
                                fontWeight: 'bold'
                            }]}>{truckInfo.truck_num ? truckInfo.truck_num : ''}</Text>
                        </View>
                        <View style={{width: 40}}>
                            {truckInfo.operate_type == 1 &&
                            <FontTag size={30} title='自' color='#76b92c' fontColor='#fff'/>}
                            {truckInfo.operate_type == 2 &&
                            <FontTag size={30} title='协' color='#76b92c' fontColor='#fff'/>}
                            {truckInfo.operate_type == 3 &&
                            <FontTag size={30} title='供' color='#76b92c' fontColor='#fff'/>}
                            {truckInfo.operate_type == 4 &&
                            <FontTag size={30} title='包' color='#76b92c' fontColor='#fff'/>}
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', paddingHorizontal: 40}}>
                        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
                            {/*<FontAwesomeIcon name='building-o' size={11}/>*/}
                            <Text
                                style={[globalStyles.midText, {paddingLeft: 5}]}>{truckInfo.company_name ? truckInfo.company_name : ''}</Text>
                        </View>
                        <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                            {truckInfo.truck_tel && <FontAwesomeIcon name='mobile-phone' size={16}/>}
                            {truckInfo.truck_tel &&
                            <Text style={[globalStyles.midText, {paddingLeft: 5}]}>{truckInfo.truck_tel}</Text>}
                        </View>
                    </View>
                </View>


                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>主驾司机</Text>
                    <Text style={globalStyles.midText}>{truckInfo.drive_name ? truckInfo.drive_name : ''}</Text>
                </ListItem>
                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>副驾司机</Text>
                    <Text
                        style={globalStyles.midText}>{truckInfo.vice_drive_name ? truckInfo.vice_drive_name : ''}</Text>
                </ListItem>
                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>关联挂车</Text>
                    <Text style={globalStyles.midText}>{truckInfo.trail_num ? truckInfo.trail_num : ''}</Text>
                </ListItem>
                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>品牌</Text>
                    <Text style={globalStyles.midText}>{truckInfo.brand_name ? truckInfo.brand_name : ''}</Text>
                </ListItem>
                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>识别代码</Text>
                    <Text style={globalStyles.midText}>{truckInfo.the_code ? truckInfo.the_code : ''}</Text>
                </ListItem>
                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>挂车货位</Text>
                    <Text style={globalStyles.midText}>{truckInfo.trail_number ? truckInfo.trail_number : ''}</Text>
                </ListItem>
                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>车辆状态</Text>
                    <Text style={globalStyles.midText}>{truckInfo.repair_status ? '正常' : '维修'}</Text>
                </ListItem>
                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>行驶证检证日期</Text>
                    <Text
                        style={globalStyles.midText}>{truckInfo.driving_date ? moment(truckInfo.driving_date).format('YYYY-MM-DD') : ''}</Text>
                </ListItem>
                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>营运证检证日期</Text>
                    <Text
                        style={globalStyles.midText}>{truckInfo.license_date ? moment(truckInfo.license_date).format('YYYY-MM-DD') : ''}</Text>
                </ListItem>
                <ListItem last style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Text style={globalStyles.midText}>备注</Text>
                    <Text
                        style={[globalStyles.midText, {paddingTop: 5}]}>{truckInfo.remark ? truckInfo.remark : ''}</Text>
                </ListItem>
            </Content>
        </Container>
    )

}

const styles = StyleSheet.create({
    textListItem: {
        justifyContent: 'space-between'
    }
})
const mapStateToProps = (state) => {
    return {
        truckDetailReducer: state.truckDetailReducer,
    }
}

export default connect(mapStateToProps)(TruckDetail)
