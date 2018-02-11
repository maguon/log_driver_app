import React, { Component } from 'react'
import {View, Text, FlatList ,ActivityIndicator,StyleSheet} from 'react-native'
import { ListItem, Container, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../GlobalStyles'


const ListFooterComponent = props => {
    return (
        <View style={styles.footerContainer}>
            <ActivityIndicator color={styleColor} styleAttr='Small' />
            <Text style={[globalStyles.smallText, styles.footerText]}>正在加载...</Text>
        </View>
    )
}

const PagingList = props => {
    const { listReducer: { data: { list }, Action, MoreAction }, onSelect, getListMore } = props
    if (Action.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    onEndReached={getListMore}
                    ListFooterComponent={MoreAction.isResultStatus == 1 ? ListFooterComponent : undefined}
                    data={list}
                    renderItem={({ item, index }) => <ListItem key={index} onPress={() => onSelect(item)}>
                        <Text>{item.value}</Text>
                    </ListItem>} />
            </Container>
        )
    }

}


const styles = StyleSheet.create({
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    footerText: {
        paddingLeft: 10
    }
})


export default PagingList
