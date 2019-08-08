import React, {Component} from 'react';
import {DatePickerIOS, View, StyleSheet, Modal} from 'react-native';

export default class TimeChange extends Component {
    constructor(props) {
        super(props);
        console.log("props===="+JSON.stringify(props))
        this.state = {chosenDate: new Date()};
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({chosenDate: newDate});
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent
                visible={true}
                onRequestClose={() => { }}
            >
             <View style={styles.container}>
                <DatePickerIOS
                    date={this.state.chosenDate}
                    onDateChange={this.setDate}
                    defaultDate={this.state.chosenDate}
                    minimumDate={new Date(2017, 1, 1)}
                    maximumDate={new Date(2027, 12, 31)}
                    mode={"date"}
                    locale={"zh-Hans"}
                />
              </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});
