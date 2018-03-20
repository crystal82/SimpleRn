import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import RCTProgressBar from '../component/RCTProgressBarView';

const {width, height} = Dimensions.get('window');

class ConnectDevicePage extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: '查找设备',
    });


    constructor(props) {
        super(props);
        this.state = {
            connState:1,
            progress:10,
            tip: '正在搜索设备，请稍后...',
        }
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f6f6f6', alignItems: 'center'}}>
                <View style={[styles.textView, {marginTop: 30}]}>
                    <Image source={require('../image/circle.png')} style={styles.icon}/>
                    <Text style={[styles.text,{color:"#1976D2"}]}>正在搜索设备</Text>
                </View>
                <View style={styles.textView}>
                    <Image source={require('../image/circle.png')} style={styles.icon}/>
                    <Text style={[styles.text,{color:this.state.connState>1?'#1976D2':"#000"}]}>已搜索到设备</Text>
                </View>
                <View style={styles.textView}>
                    <Image source={require('../image/circle.png')} style={styles.icon}/>
                    <Text style={[styles.text,{color:this.state.connState>2?'#1976D2':"#000"}]}>正在绑定设备</Text>
                </View>

                <Image source={require('../image/pic_pairing.png')} style={styles.SearchImage}/>
                <View style={styles.progressView}>
                    <RCTProgressBar style={styles.progressBar} progress={this.state.progress}/></View>
                <Text style={[styles.text,{marginTop:20,color:'#1976D2'}]}>{this.state.tip}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    textView: {
        width: '100%',
        height: 25,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        align: 'contain',
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'center'
    },
    SearchImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain'
    },
    progressView: {
        width: '100%',
        height: 30,
        marginTop: 50
    },
    progressBar: {
        width: '100%',
        height: 30,
    }
});
export default ConnectDevicePage;

