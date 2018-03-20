import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NetworkInfo} from 'react-native-network-info';

const {width, height} = Dimensions.get('window');
const iconColor = '#7D7D7D';

class WLANConnectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ssId: '',
            password: '',
            visible: true
        };
    }

    componentWillMount() {
        var thiz = this;
        NetworkInfo.getSSID(ssid => {
            console.log(ssid);
            thiz.setState({
                ssId: ssid
            })
        });

    }

    onClickFun(visible) {
        this.setState({
            visible: visible
        });
    }

    _nextConfDevState() {
        if (this.state.ssId == '' || this.state.password == '') {
            ToastAndroid.show("WiFi或密码不能为空", ToastAndroid.SHORT);
        } else {
            this.props.navigation.navigate('ConfigDevState')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text1}>请输入Wi-Fi密码，连接你的智能设备</Text>
                <Image source={require('../image/pic_router.png')} style={styles.image}/>

                <View style={styles.inputView}>
                    <View style={styles.inputV}>
                        <Icon name="wifi" size={20} color={iconColor}/>
                        <TextInput underlineColorAndroid='transparent' style={styles.textInput} placeholder='WiFi'
                                   onChangeText={(ssId) => this.setState({ssId})}
                                   value={this.state.ssId}/>
                        <Icon name="navigate-next" size={30} color={iconColor}/>
                    </View>
                    <View style={styles.dividerView}>
                        <Text style={styles.divider}/>
                    </View>
                    <View style={styles.inputV}>
                        <Icon name="lock-outline" size={25} color={iconColor}/>
                        <TextInput underlineColorAndroid='transparent' style={styles.textInput} placeholder='Password'
                                   secureTextEntry={this.state.visible}
                                   onChangeText={(password) => this.setState({password})}
                                   value={this.state.password}/>
                        <Icon name={this.state.visible ? "visibility-off" : "visibility"} size={20} color={iconColor}
                              style={{marginRight: 7}} onPress={() =>
                            this.onClickFun(!this.state.visible)
                        }/>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this._nextConfDevState()}>
                    <View style={styles.buttonView}>
                        <Text style={styles.loginText}>下一步</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.bottomView}>
                    <Text style={styles.text1}>注：暂不支持5G频道的WiFi网络</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    image: {
        marginTop: 5,
        width: 180,
        height: 120,
        resizeMode: 'center'
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        flex: 1,
    },
    text1: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14,
    },
    inputView: {
        backgroundColor: '#FFFFFF',
        marginTop: 15,
        width: width,
        height: 100,
    }, inputV: {
        marginLeft: 10,
        marginRight: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        marginLeft: 5,
        flex: 1,
        fontSize: 16,
    },
    dividerView: {
        flexDirection: 'row',
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#d3d3d3'
    },
    buttonView: {
        height: 40,
        width: width - 50,
        backgroundColor: '#1976D2',
        marginTop: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 17,
        color: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
    },
    bottomView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});


export default WLANConnectPage;