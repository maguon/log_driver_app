import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, Image } from 'react-native'
import { Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../../GlobalStyles'

const window = Dimensions.get('window')
const containerWidth = (window.width - (2 + 1) * 10) / 2
const containerHeight = containerWidth / 16 * 9

export default class SingleImageItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            spinnerDisplay: true
        }
    }

    render() {
        const { imageUrl, title } = this.props
        if (imageUrl) {
            return <View style={styles.container}>
                <Image source={{ uri: imageUrl }}
                    style={styles.image}
                    onLoadStart={() => { this.setState({ spinnerDisplay: true }) }}
                    LonLoad={() => { this.setState({ spinnerDisplay: false }) }}
                    onLoadEnd={() => { this.setState({ spinnerDisplay: false }) }}
                />
                <Spinner
                    animating={this.state.spinnerDisplay}
                    style={styles.spinner}
                    color={styleColor}
                />
                <View style={styles.tagContainer}>
                    <Text style={[globalStyles.smallText, styles.tagTitle]}>{title ? `${title}` : ''}</Text>
                </View>
            </View>
        } else {
            return <View style={styles.container}>
                <Text style={{ alignSelf: 'center' }}>暂无图片</Text>
                <View style={styles.tagContainer}>
                    <Text style={[globalStyles.smallText, styles.tagTitle]}>{title ? `${title}` : ''}</Text>
                </View>
            </View>
        }
    }
}

const styles = StyleSheet.create({
    spinner: {
        position: 'absolute',
        alignSelf: 'center'
    },
    container: {
        borderColor: '#ccc',
        justifyContent: 'center',
        borderWidth: 0.3,
        width: containerWidth,
        height: containerHeight
    },
    image: {
        flex: 1
    },
    tagContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: containerWidth,
        position: 'absolute',
        bottom: 0
    },
    tagTitle: {
        textAlign: 'center',
        paddingVertical: 4,
        color: '#fff'
    }
})