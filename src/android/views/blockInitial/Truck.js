import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { ListItem, Left, Thumbnail, Body, Right, Content, Container, Separator, Icon } from 'native-base'
import globalStyles from '../../GlobalStyles'


export default class Truck extends Component {
    render() {
        return (
            <Container>
                <View style={{ backgroundColor: '#00cade', flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#4edbf0' }}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={Actions.truckInfo}>
                        <MaterialCommunityIcons name='truck' size={30} color='#fff' />
                        <Text style={{ color: '#fff', fontSize: 11 }}>车头资料</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={Actions.trailerInfo}>
                        <MaterialCommunityIcons name='truck-trailer' size={30} color='#fff' />
                        <Text style={{ color: '#fff', fontSize: 11 }}>挂车资料</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={Actions.driverInfo}>
                        <MaterialCommunityIcons name='account' size={30} color='#fff' />
                        <Text style={{ color: '#fff', fontSize: 11 }}>个人资料</Text>
                    </TouchableOpacity>
                </View>
                <Content showsVerticalScrollIndicator={false}>
                    <ListItem avatar style={{ marginLeft: 0, padding: 15, borderBottomWidth: 0.3, borderBottomColor: '#ddd' }}>
                        <Left>
                            <Thumbnail source={{ uri: `personalicon` }} />
                        </Left>
                        <Body style={{ borderBottomWidth: 0 }}>
                            <View>
                                <Text>王宝泉</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>吉安物流</Text>
                                <Text>13322221110</Text>
                            </View>
                        </Body>
                    </ListItem>
                    <View style={{ padding: 5, backgroundColor: '#f8fafb' }}  >
                        <View style={styles.itemGroup}>
                            <TouchableOpacity style={styles.item}>
                                <Left style={styles.itemLeft}>
                                    <Icon name="ios-person" style={styles.itemIcon} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>我的资料</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemGroup}>
                            <TouchableOpacity style={styles.item}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='car-sports' size={14} color={'#bbb'}/>
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>商品车质损申报</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={Actions.applyAccidentTruck}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='truck' size={14} color={'#bbb'}/>
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>货车事故申报</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemGroup}>
                            <TouchableOpacity style={styles.item}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='car-sports' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>商品车责任</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item} onPress={Actions.truckResponsibilityList}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='truck'  size={14} color={'#bbb'}/>
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>货车责任</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemGroup}>
                            <TouchableOpacity style={styles.item} onPress={Actions.fuelFillingRecord}>
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='gas-station' size={14} color={'#bbb'} />
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>加油</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemGroup}>
                            <TouchableOpacity style={styles.item} >
                                <Left style={styles.itemLeft}>
                                    <MaterialCommunityIcons name='car-wash'  size={14} color={'#bbb'}/>
                                    <Text style={[globalStyles.midText, styles.itemTitle]}>洗车费</Text>
                                </Left>
                                <Body></Body>
                                <Right>
                                    <Icon name="ios-arrow-forward" style={styles.itemIcon} />
                                </Right>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 0.3,
        borderColor: '#ddd'
    },

    itemGroup: {
        margin: 5,
        borderWidth: 0.3,
        borderColor: '#ddd'
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemIcon: {
        color: '#bbb',
        fontSize: 20
    },
    itemTitle: {
        paddingLeft: 5
    }
})