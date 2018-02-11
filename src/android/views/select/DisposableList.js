import React, { Component } from 'react'
import { Text, FlatList } from 'react-native'
import { ListItem, Container, Spinner } from 'native-base'
import { styleColor } from '../../GlobalStyles'

const DisposableList = props => {
    const { listReducer: { data: { list }, Action }, filter, onSelect } = props
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
                    data={filter ? list.filter(item => item.value.indexOf(filter) > -1) : list}
                    renderItem={({ item, index }) => <ListItem key={index} onPress={() => onSelect(item)}>
                        <Text>{item.value}</Text>
                    </ListItem>} />
            </Container>
        )
    }
}

export default DisposableList
