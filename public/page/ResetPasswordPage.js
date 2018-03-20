import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const iconColor = '#7D7D7D';
const {width, height} = Dimensions.get('window');

class ResetPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            password: '',
            visible_1: true,
            visible_2: true,
            visible_3: true
        };
    }

    onClickFun1(visible) {
        this.setState({
            visible_1: visible
        });
    }

    onClickFun2(visible) {
        this.setState({
            visible_2: visible
        });
    }

    onClickFun3(visible) {
        this.setState({
            visible_3: visible
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputView}>
                    <View style={styles.inputV}>
                        <Icon name="lock-outline" size={25} color={iconColor}/>
                        <TextInput underlineColorAndroid='transparent' style={styles.textInput}
                                   placeholder='old password'
                                   secureTextEntry={this.state.visible_1}
                                   onChangeText={(oldPassword) => this.setState({oldPassword})}
                                   value={this.state.oldPassword}/>
                        <Icon name={this.state.visible_1 ? "visibility-off" : "visibility"} size={22}
                              color={iconColor} style={{marginRight: 7}} onPress={() =>
                            this.onClickFun1(!this.state.visible_1)
                        }/>
                    </View>
                    <View style={styles.dividerView}>
                        <Text style={styles.divider}/>
                    </View>
                    <View style={styles.inputV}>
                        <Icon name="lock-outline" size={25} color={iconColor}/>
                        <TextInput underlineColorAndroid='transparent' style={styles.textInput}
                                   placeholder='new password'
                                   secureTextEntry={this.state.visible_2}
                                   onChangeText={(newPassword) => this.setState({newPassword})}
                                   value={this.state.newPassword}/>
                        <Icon name={this.state.visible_2 ? "visibility-off" : "visibility"} size={22}
                              color={iconColor}
                              style={{marginRight: 7}} onPress={() =>
                            this.onClickFun2(!this.state.visible_2)
                        }/>
                    </View>
                    <View style={styles.dividerView}>
                        <Text style={styles.divider}/>
                    </View>
                    <View style={styles.inputV}>
                        <Icon name="lock-outline" size={25} color={iconColor}/>
                        <TextInput underlineColorAndroid='transparent' style={styles.textInput}
                                   placeholder='reconfirm password'
                                   secureTextEntry={this.state.visible_3}
                                   onChangeText={(password) => this.setState({password})}
                                   value={this.state.password}/>
                        <Icon name={this.state.visible_3 ? "visibility-off" : "visibility"} size={22}
                              color={iconColor}
                              style={{marginRight: 7}} onPress={() =>
                            this.onClickFun3(!this.state.visible_3)
                        }/>
                    </View>
                </View>
                <TouchableOpacity>
                    <View style={styles.buttonView}>
                        <Text style={styles.loginText}>确定</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        flex: 1,
    },
    inputView: {
        backgroundColor: '#FFFFFF',
        marginTop: 15,
        width: '100%',
        height: 150,
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
        marginTop: 30,
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

});


export default ResetPasswordPage;