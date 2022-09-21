
import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity, TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Input} from 'react-native-elements'
import { images, COLORS, FONTS, SIZES } from '../../constants';

const Login = ({ navigation }) => {

    const [username, setUsername]= React.useState('');
    const [password, setPassword]= React.useState('');
    const [homeText, setHomeText]= React.useState('To Do list application');

    const canLogin = ()=>{
        if(username==='admin' && password ==='admin'){
            setHomeText('To Do list application');
            setUsername('');
            setPassword('');
            navigation.navigate("Home");

        }else{
            setHomeText("Invalid login");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={images.homeLogo}
                    resizeMode="contain"
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center', marginHorizontal: SIZES.padding, marginBottom: SIZES.padding*2 }}>

                    <Text style={{ ...FONTS.h2 }}>To Do App</Text>
                    <Text style={{ color: COLORS.gray, marginTop: SIZES.padding, textAlign: 'center', ...FONTS.body3 }}
                    value = {homeText}
                    >{homeText}</Text>
                </View>
                <Input placeholder={'Username'}
                       value={username}
                        onChangeText = {(text) => setUsername(text)}
                />
                <Input placeholder={'Password'}
                       secureTextEntry={true}
                        value={password}
                       onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity
                    style={[styles.shadow, { marginTop: SIZES.padding * 2, width: '70%', height: 50, alignItems: 'center', justifyContent: 'center' }]}
                    onPress={canLogin}
                >
                    <LinearGradient
                        style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}
                        colors={['#FF5733', '#D12500']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >

                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});

export default Login;
