import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList, TextInput
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {images, icons, COLORS, FONTS, SIZES} from '../../constants';
import {fetch} from "react-native/Libraries/Network/fetch";
import {Dropdown} from "react-native-element-dropdown";
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
const OptionItem = ({bgColor, icon, label, onPress}) => {
    return (
        <TouchableOpacity
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={onPress}
        >
            <View style={[styles.shadow, {width: 60, height: 60}]}>
                <LinearGradient
                    style={[{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,
                        backgroundColor: 'red'
                    }]}
                    colors={bgColor}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                >
                    <Image
                        id={1}
                        source={icon}
                        resizeMode="cover"
                        style={{
                            tintColor: COLORS.white,
                            width: 20,
                            height: 30,
                        }}
                    />
                </LinearGradient>
            </View>
            <Text style={{marginTop: SIZES.base, color: COLORS.gray, ...FONTS.body3}}>{label}</Text>
        </TouchableOpacity>
    )
}


const Home = ({navigation}) => {
    const [id, setId] = React.useState([]);
    const [textArea, setTextArea] = React.useState([]);
    const [category_name, setCategory_name] = React.useState([]);
    const [price, setPrice] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [insertLicenceBox, setInsertLicenceBox] = React.useState(false);
    const [deleteLicenceBox, setDeleteLicenceBox] = React.useState(false);
    const [licenceDelete, setLicenceDelete] = React.useState("");
    const [licenceUpdate, setLicenceUpdate] = React.useState("");
    const [data, setData] = React.useState([]);
    const [file, setFile] = React.useState([]);
    const [fileName, setFileName] = React.useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/api/hotels/getAllLicences');
        const responseData = await response.json();
        setData(responseData);
        setLoading(false);
    }

    // fetchData();

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };



    const insertLicence = async () => {
        const formData = new FormData();
        formData.append("category_name", category_name);
        formData.append("image", file);
        formData.append("fileName", fileName);
        try {
            axios.post("http://localhost:5000/addPicture",
                formData
            );

            setFile(formData);
            console.log(category_name);
            axios.post("http://localhost:5000/api/hotels/addLicence", {
                    category_name: category_name,
                    textArea: textArea,
                    image: `/img/${fileName}`
                }
            )

        } catch (res) {
            console.log(res);
        }
        fetchData();
    }


    const deleteLicence = async () => {
        const insertResponse = await fetch('http://localhost:5000/api/hotels/deleteLicence', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category_name: licenceDelete,
            })
        });
        const insertResponseData = await insertResponse.json();
        console.log(insertResponseData);
        // if (insertResponseData.message === 'This category cannot be deleted beacuse it is used by a task. Delete tasks first.'){
        //     setError(insertResponseData.message);
        // }else if(insertResponseData.message === 'Requested category does not exist'){
        //     setError(insertResponseData.message);
        // }else if(insertResponseData.message === 'Category deleted'){
        //     setError(insertResponseData.message);
        // }
        fetchData();
    }

    const updateLicence = async () => {
        const update = await fetch('http://localhost:5000/api/hotels/updateLicence', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category_name: category_name,
                textArea: textArea,
                price: price,
                id:id
            })
        });

        const insertResponseData = await update.json();
         if(insertResponseData.message === "Requested category does not exist"){
            setError(insertResponseData.message);
        }else if(insertResponseData.message === "Category updated"){
            setError(insertResponseData.message);
        }
         fetchData()
    }

    const clearLicences = () =>{
        setId('');
        setCategory_name('');
        setTextArea('');
        setPrice('');
        setLicenceDelete('')
        setError('');
    }

    React.useEffect(() => {
        fetchData()
    }, [])





    function renderDestinations(item, index) {
        var destinationStyle = {};
        if (index == 0) {
            destinationStyle = {marginLeft: SIZES.padding,}
        }

        return (
            <TouchableOpacity
                style={{justifyContent: 'center', marginHorizontal: SIZES.base, ...destinationStyle}}
                onPress={(event) => {
                    navigation.navigate("DestinationDetail", {data: item})
                }}
            >
                <Image
                    source={`http://localhost:5000${item.image}`}
                    resizeMode="cover"
                    style={{
                        width: SIZES.width * 0.28,
                        height: '82%',
                        borderRadius: 15
                    }}
                />

                <Text style={{marginTop: SIZES.base / 2, ...FONTS.h4}}>{item.category_name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>

            {insertLicenceBox && (<View style={styles.forms}>
                    <View style={styles.input}>
                        <View>
                            <Text>Add category</Text>
                            <TextInput
                                placeholder={"Category name"}
                                style={styles.samoInputi}
                                value={category_name}
                                onChangeText={(text) => setCategory_name(text)}

                            />
                            <TextInput
                                placeholder={"Category text"}
                                style={styles.tekst}
                                multiline={true}
                                numberOfLines={4}
                                value={textArea}
                                onChangeText={(text) => setTextArea(text)}

                            />
                            {/*<TextInput placeholder={"Licence price"}*/}
                            {/*           style={styles.samoInputi}*/}
                            {/*           value={price}*/}
                            {/*           onChangeText={(text) => setPrice(text)}*/}

                            {/*/>*/}
                            <input name='image' type='file' onChange={saveFile} />
                        </View>
                        <View style={styles.icon}>
                            <OptionItem
                                style={styles.icon}
                                icon={icons.plus}
                                bgColor={['#46aeff', '#5884ff']}
                                label="Add"
                                onPress={insertLicence}
                            />
                            <pre>       </pre>
                            <OptionItem
                                style={styles.icon}
                                icon={icons.back}
                                bgColor={['#46aeff', '#5884ff']}
                                label="Exit"
                                onPress={() => {
                                    setInsertLicenceBox(false);
                                    clearLicences();
                                }}
                            />
                        </View>
                        {error && (<View style={styles.alertBox}>
                            <Text>{error}</Text>
                        </View>)}

                    </View>
                </View>
            )}

            {deleteLicenceBox && (<View style={styles.forms}>

                    <View style={styles.input}>
                        <View>
                            <Text> Delete  </Text>
                            <TextInput
                                placeholder={"Category name"}
                                style={styles.samoInputi}
                                value={licenceDelete}
                                onChangeText={(text) => setLicenceDelete(text)}
                            />

                        </View>
                        <View style={styles.icon}>
                            <OptionItem
                                style={styles.icon}
                                icon={icons.minus}
                                bgColor={['#46aeff', '#5884ff']}
                                label="Delete"
                                onPress={() => {
                                    deleteLicence();
                                }}
                            />
                            <pre>       </pre>
                            <OptionItem
                                style={styles.icon}
                                icon={icons.back}
                                bgColor={['#46aeff', '#5884ff']}
                                label="Exit"
                                onPress={() => {
                                    setDeleteLicenceBox(false)
                                    clearLicences();
                                }}
                            />
                        </View>
                        {error && (<View style={styles.alertBox}>
                            <Text>{error}</Text>
                        </View>)}
                    </View>

                </View>
            )}

            {licenceUpdate && (<View style={styles.forms}>
                    <View style={styles.input}>
                        <View>
                            <Text>Update category</Text>
                            <TextInput
                                placeholder={"Category ID"}
                                style={styles.samoInputi}
                                value={id}
                                onChangeText={(text) => setId(text)}

                            />

                            <TextInput
                                placeholder={"Category name"}
                                style={styles.samoInputi}
                                value={category_name}
                                onChangeText={(text) => setCategory_name(text)}

                            />
                            <TextInput
                                placeholder={"Category text"}
                                style={styles.tekst}
                                multiline={true}
                                numberOfLines={4}
                                value={textArea}
                                onChangeText={(text) => setTextArea(text)}

                            />
                            {/*<TextInput placeholder={"Licence price"}*/}
                            {/*           style={styles.samoInputi}*/}
                            {/*           value={price}*/}
                            {/*           onChangeText={(text) => setPrice(text)}*/}

                            {/*/>*/}
                        </View>
                        <View style={styles.icon}>
                            <OptionItem
                                style={styles.icon}
                                icon={icons.plus}
                                bgColor={['#46aeff', '#5884ff']}
                                label="Update"
                                onPress={() => updateLicence()}
                            />
                            <pre>       </pre>
                            <OptionItem
                                style={styles.icon}
                                icon={icons.back}
                                bgColor={['#46aeff', '#5884ff']}
                                label="Exit"
                                onPress={() => {
                                    setLicenceUpdate(false);
                                    clearLicences();

                                }}
                            />
                        </View>
                        {error && (<View style={styles.alertBox}>
                            <Text>{error}</Text>
                        </View>)}
                    </View>
                </View>
            )}

            <View style={{flex: 1, marginTop: SIZES.base, marginLeft: '30px', paddingHorizontal: SIZES.padding, padding:'100px'}}>
                <Image
                    source={images.licenceBanner}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 15,
                    }}
                />
            </View>

            {/* Options */}
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{flexDirection: 'row', marginTop: SIZES.padding, paddingHorizontal: SIZES.base}}>
                    <OptionItem
                        icon={icons.plus}
                        bgColor={['#46aeff', '#5884ff']}
                        label="Add category"
                        onPress={() => {
                            setInsertLicenceBox(!insertLicenceBox)

                        }}
                    />
                    <OptionItem
                        icon={icons.minus}
                        bgColor={['#fddf90', '#fcda13']}
                        label="Delete category"
                        onPress={() => setDeleteLicenceBox(!deleteLicenceBox)}
                    />
                    <OptionItem
                        icon={icons.update}
                        bgColor={['#e973ad', '#da5df2']}
                        label="Update category"
                        onPress={() => {
                            setLicenceUpdate(!licenceUpdate)
                        }}
                    />
                </View>
            </View>

            <View style={{flex: 1}}>
                <Text style={{marginTop: SIZES.base, marginHorizontal: SIZES.padding, ...FONTS.h2}}>Categories</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => renderDestinations(item, index)}

                />
            </View>
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
    },
    forms: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        position: "absolute",
        zIndex: 998,
        width: '100%',
        height: '100%'
    },
    icon: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        marginTop: "5rem",
        backgroundColor: COLORS.white,
        padding: 20

    },
    input: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%"
    },
    samoInputi: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tekst: {
        height: 140,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    alertBox: {
        zIndex: 999,
    }
});
export default Home;
