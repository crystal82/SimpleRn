import React from 'react';
import {
    View,
    DeviceEventEmitter
} from 'react-native';
import DeviceList from '../component/DeviceListComponent';
class HomePage extends React.Component {


    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: '我的设备',
        headerTitleStyle: {
            color: '#fff',
            fontSize: 20,
            alignSelf: 'flex-start',
        },
    });


    constructor(props) {
        super(props);
    }

    componentWillMount() {
        var thiz=this;
        DeviceEventEmitter.addListener('toWLANConnectPage', function (msg) {
            thiz.props.navigation.navigate('WLANConnect')
        });
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#f6f6f6'
            }}>
                <DeviceList/>
            </View>
        )
    }

}

export default HomePage;

