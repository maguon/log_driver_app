import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Container, Content, ListItem } from 'native-base'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import globalStyles, { styleColor } from '../../../GlobalStyles'
import FontTag from '../../../components/FontTag'
import moment from 'moment'

const TrailerInfo = props => {
    const { trailerInfoReducer: { data: { trailerInfo } }, trailerInfoReducer } = props
    console.log('trailerInfoReducer', trailerInfoReducer)
    return (
        <Container>
            <Content>
                <View style={{ padding: 15, backgroundColor: '#f2f6f9' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 40 }}>
                            <MaterialCommunityIcons name='truck' size={20} color={styleColor} />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={[globalStyles.midText, { color: styleColor, fontWeight: 'bold' }]}>{trailerInfo.truck_num ? trailerInfo.truck_num : ''}</Text>
                        </View>
                        <View style={{ width: 40 }}>
                            {trailerInfo.operate_type == 1 && <FontTag size={26} title='自' color='#12c3eb' fontColor='#fff' />}
                            {trailerInfo.operate_type == 2 && <FontTag size={26} title='协' color='#73de8a' fontColor='#fff' />}
                            {trailerInfo.operate_type == 3 && <FontTag size={26} title='供' color='#efbb7a' fontColor='#fff' />}
                            {trailerInfo.operate_type == 4 && <FontTag size={26} title='包' color='#e08ddd' fontColor='#fff' />}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 40 }}>
                        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesomeIcon name='building-o' size={11} />
                            <Text style={[globalStyles.midText, { paddingLeft: 5 }]}>{trailerInfo.company_name ? trailerInfo.company_name : ''}</Text>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center' }}>
                        </View>
                    </View>
                </View>
                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>关联车头</Text>
                    <Text style={globalStyles.midText} >{trailerInfo.first_num ? trailerInfo.first_num : ''}</Text>
                </ListItem>
                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>识别代码</Text>
                    <Text style={globalStyles.midText} >{trailerInfo.the_code ? trailerInfo.the_code : ''}</Text>
                </ListItem>
                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>挂车货位</Text>
                    <Text style={globalStyles.midText} >{trailerInfo.number ? trailerInfo.number : ''}</Text>
                </ListItem>
                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>车辆状态</Text>
                    <Text style={globalStyles.midText} >{trailerInfo.repair_status ? '正常' : '维修'}</Text>
                </ListItem>
                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>行驶证检证日期</Text>
                    <Text style={globalStyles.midText} >{trailerInfo.driving_date ? moment(trailerInfo.driving_date).format('YYYY-MM-DD') : ''}</Text>
                </ListItem>
                <ListItem style={styles.textListItem}>
                    <Text style={globalStyles.midText}>营运证检证日期</Text>
                    <Text style={globalStyles.midText} >{trailerInfo.license_date ? moment(trailerInfo.license_date).format('YYYY-MM-DD') : ''}</Text>
                </ListItem>
                <ListItem last style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text style={globalStyles.midText}>备注</Text>
                    <Text style={[globalStyles.midText, { paddingTop: 5 }]}>{trailerInfo.remark ? trailerInfo.remark : ''}</Text>
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
        trailerInfoReducer: state.trailerInfoReducer,
    }
}

export default connect(mapStateToProps)(TrailerInfo)