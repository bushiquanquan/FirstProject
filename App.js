/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
const RN = require('react-native');
const {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    ImageBackground
} = RN;
var Forecast = require('./component/Forecast');

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        // 设置 initial state
        this.state = {
            zip: props.initialValue || '',
            forecast: null
        };
        this._handleTextChange = this._handleTextChange.bind(this);
    }

    // 我们将添加这个回调函数到<TextInput>属性中。
    _handleTextChange(event) {
        // log语句输出结果在Xcode或Chrome调试工具中可见。
        let city = event.nativeEvent.text;
        console.log(city);
        if (!city) {
            this.setState({
                forecast: null
            });
            return;
        }
        fetch('http://www.sojson.com/open/api/weather/json.shtml?city='
            + city, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                // this.setState({
                //     forecast: {
                //         main: responseJSON.data.ganmao,
                //         description: `湿度 ${responseJSON.data.shidu}，空气 ${responseJSON.data.quality}，PM2.5 ${responseJSON.data.pm25}`,
                //         temp: responseJSON.data.wendu
                //     }
                // });
                /*
                * aqi
                 :
                 31
                 date
                 :
                 "20日星期五"
                 fl
                 :
                 "<3级"
                 fx
                 :
                 "无持续风向"
                 high
                 :
                 "高温 30.0℃"
                 low
                 :
                 "低温 24.0℃"
                 notice
                 :
                 "带好雨具，别在树下躲雨"
                 sunrise
                 :
                 "06:18"
                 sunset
                 :
                 "18:58"
                 type
                 :
                 "雷阵雨"
                * */
                let current = responseJSON.data.forecast && responseJSON.data.forecast.length ? responseJSON.data.forecast[0] : {};
                this.setState({
                    forecast: {
                        main: `${current.type} ${current.fl} ${current.fx} ${current.notice} ${current.high} ${current.low}`,
                        description: `湿度 ${responseJSON.data.shidu}，空气 ${responseJSON.data.quality}，PM2.5 ${responseJSON.data.pm25}`,
                        temp: responseJSON.data.ganmao + ' ' +  responseJSON.data.wendu
                    }
                });
            })
            .catch((error) => {
                this.setState({
                    forecast: null
                });
                console.warn(error);
            });
    }

    render() {
        var content = null;
        if (this.state.forecast !== null) {
            content = <Forecast
                main={this.state.forecast.main}
                description={this.state.forecast.description}
                temp={this.state.forecast.temp}/>;
        }
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./static/fatboy.png')}
                                 resizeMode='cover'
                                 style={styles.bg}>
                    <View style={styles.overlay}>
                        <View style={styles.row}>
                            <Text style={styles.mainText}>
                                当前城市：
                            </Text>
                            <View style={styles.zipContainer}>
                                <TextInput
                                    style={[styles.zipCode, styles.inputText]}
                                    returnKeyType='go'
                                    onSubmitEditing={this._handleTextChange}/>
                            </View>
                        </View>
                        {content}
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
const baseFontSize = 16;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    bg: {
        width: '100%',
        height: '100%'
    },
    backdrop: {
        flex: 1,
        flexDirection: 'column'
    },
    overlay: {
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#000000',
        opacity: 0.5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
        padding: 30
    },
    zipContainer: {
        flex: 1,
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1,
        marginLeft: 5,
        marginTop: 3
    },
    zipCode: {
        width: 50,
        height: baseFontSize,
        color: 'red'
    },
    mainText: {
        flex: 1,
        lineHeight: 40,
        fontSize: baseFontSize,
        color: 'red'
    },
    inputText: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
});
