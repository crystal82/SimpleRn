import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

class ConfigDevStatePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.gifView}>
                    <Image source={require('../image/02-airlink-0.5s.gif')} style={styles.loading}/>

                </View>
                <Text style={styles.titleView}>接通电源,确认指示灯在快闪</Text>
                <Text style={styles.urlText}>如何将指示灯设置为快闪</Text>
                <TouchableOpacity>

                    <View style={styles.buttonView}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>确认指示灯在快闪</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center'
    },
    gifView: {
        height: 200,
        width: width,
        backgroundColor: '#eeeeee',
        alignItems: 'center',
        justifyContent:'center'
    },
    titleView: {
        marginTop: 20,
        color: '#000',
        fontSize: 19,
        flex: 1,

    }, urlText: {
        color: '#1976D2',
        fontSize: 16,
        textDecorationLine: 'underline',
        textDecorationColor: '#1976D2',
        marginBottom: 30

    },
    buttonView: {
        width: width,
        height: 150,
        alignItems: 'center',
    },button:{
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#1976D2',
        borderRadius: 3,
        width: width - 50,
        height: 50
    }, buttonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',

    },
    loading: {
        width: 150,
        height: 150
    }
});


export default ConfigDevStatePage;