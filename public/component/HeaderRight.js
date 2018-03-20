import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import MenuPopWindow from './PopuWindow'
const { width, height } = Dimensions.get('window');

class HeaderRight extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPop: false,
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => { this.setState({ showPop: !this.state.showPop }) }}>
                    <Icon name="more-horiz" size={35} color={'#FFFFFF'}/>
                </TouchableOpacity>
                <View style={{ position: 'absolute', top: 0, left: 0, width: width, height: height }}>
                    <MenuPopWindow width={60} height={100} show={this.state.showPop} closeModal={(show) => { this.setState({ showPop: show }) }} dataArray={['扫码绑定设备', '设备配网']} />
                </View>
            </View>
        );
    }
}

export default HeaderRight;