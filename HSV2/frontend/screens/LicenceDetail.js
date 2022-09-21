
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { images, icons, COLORS, FONTS, SIZES } from '../../constants';
import {fetch} from "react-native/Libraries/Network/fetch";
import Home from "./Home";

/*
const IconLabel = ({ icon, label }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image
                source={icon}
                resizeMode="cover"
                style={{
                    width: 50,
                    height: 50,
                }}
            />
            <Text style={{ marginTop: SIZES.padding, color: COLORS.gray, ...FONTS.h3 }}>{label}</Text>
        </View>
    )
}
*/
const LicenceDetail = ({navigation,route}) => {
    // const fetchData = async () => {
    //     const response = await fetch('http://localhost:5000/api/hotels/getAllLicences');
    //     const responseData = await response.json();
    //     setData(responseData);
    //     setLoading(false);
    // }
    const [error, setError] = React.useState('');
    const {data} = route.params;
    const licenceDelete = data.category_name;
    const deleteCategory = async () => {
        const insertResponse = await fetch('http://localhost:5000/api/hotels/deleteLicence', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category_name: licenceDelete,
            })
        }).then((res)=>{
            // setDeleteLicenceBox(false)
            // clearLicences();
            if(res.ok) navigation.navigate(Home, {del: true})
        });
        // const insertResponseData = await insertResponse.json();
        // if (insertResponseData.message === 'This category cannot be deleted beacuse it is used by a task. Delete tasks first.'){
        //     setError(insertResponseData.message);
        // }else if(insertResponseData.message === 'Requested category does not exist'){
        //     setError(insertResponseData.message);
        // }else if(insertResponseData.message === 'Category deleted'){
        //     setError(insertResponseData.message);
        // }
        // fetchData();
        // navigation.navigate(Home);

    }
    // Render
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={{ flex: 2 }}>
                <Image
                    source={`http://localhost:5000${data.image}`}
                    resizeMode="cover"
                    style={{
                        width: '100%',
                        height: '80%',
                    }}
                />

                {/* Header Buttons */}
                <View
                    style={{
                        position: 'absolute',
                        top: 50,
                        left: 20,
                        right: 20,
                        //height: 50,
                        flexDirection: 'row',
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Home') }}
                        >
                            <Image
                                source={icons.back}
                                resizeMode="cover"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Body */}
            <View style={{ flex: 1.5 }}>

                {/* About */}
                <View style={{ flex: 0.5, paddingHorizontal: SIZES.padding }}>
                    <LinearGradient
                        style={[{ height: 150, width: '100%', borderRadius: 15, padding: '30px' }]}
                        colors={['#edf0fc', '#d6dfff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={{ ...FONTS.h2 }}>About {data.category_name}</Text>
                        <Text style={{ marginTop: SIZES.radius, color: COLORS.gray, ...FONTS.body3 }}>
                            {data.text}
                        </Text>
                        <Text style={{ marginTop: SIZES.radius, color: COLORS.gray, ...FONTS.body3 }}>
                            id: {data.id}
                        </Text>
                        {/*<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>*/}
                        {/*    <View style={{ flex: 1, marginHorizontal: SIZES.padding, justifyContent: 'center' }}>*/}
                        {/*        <Text style={{ ...FONTS.h1 }}>${data.price}</Text>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                    </LinearGradient>
                </View>
                {/*<View style={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}>*/}
                {/*    <Text style={{ ...FONTS.h2 }}>About {data.category_name}</Text>*/}
                {/*    <Text style={{ marginTop: SIZES.radius, color: COLORS.gray, ...FONTS.body3 }}>*/}
                {/*        {data.text}*/}
                {/*    </Text>*/}
                {/*</View>*/}
            </View>

            {/* Footer */}
            {/*<View style={{ flex: 0.5, paddingHorizontal: SIZES.padding }}>*/}
            {/*    <LinearGradient*/}
            {/*        style={[{ height: 70, width: '100%', borderRadius: 15 }]}*/}
            {/*        colors={['#edf0fc', '#d6dfff']}*/}
            {/*        start={{ x: 0, y: 0 }}*/}
            {/*        end={{ x: 1, y: 0 }}*/}
            {/*    >*/}
                    {/*<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>*/}
                    {/*    <View style={{ flex: 1, marginHorizontal: SIZES.padding, justifyContent: 'center' }}>*/}
                    {/*        <Text style={{ ...FONTS.h1 }}>${data.price}</Text>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                {/*</LinearGradient>*/}
            {/*</View>*/}
            {error && (<View style={styles.alertBox}>
                <Text>{error}</Text>
            </View>)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
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

export default LicenceDetail;
