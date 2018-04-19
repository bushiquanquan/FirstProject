import React, {Component} from 'react';
var React1 = require('react-native');
var {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image
} = React1;
type Props = {};
class Forecast extends Component<Props> {
    constructor(props) {
        super(props);
        // 设置 initial state
        this.state = {
            zip: props.initialValue || ''
        };
    }
    render() {
        return (
            <View>
                <Text style={styles.bigText}>
                    {this.props.main}
                </Text>
                <Text style={styles.mainText}>
                    Current conditions: {this.props.description}
                </Text>
                <Text style={styles.bigText}>
                    {this.props.temp}°F
                </Text>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    bigText: {
        flex: 2,
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#FFFFFF'
    },
    mainText: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        color: '#FFFFFF'
    }
})
module.exports = Forecast;