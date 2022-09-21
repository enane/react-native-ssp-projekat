import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Dimensions, Button
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {images, icons, COLORS, FONTS, SIZES} from '../../constants';
import {fetch} from "react-native/Libraries/Network/fetch";
import {Table,Row} from "react-native-table-component";


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
                        source={icon}
                        resizeMode="cover"
                        style={{
                            tintColor: COLORS.white,
                            width: 30,
                            height: 30,
                        }}
                    />
                </LinearGradient>
            </View>
            <Text style={{marginTop: SIZES.base, color: COLORS.gray, ...FONTS.body3}}>{label}</Text>
        </TouchableOpacity>
    )
}


const Hotels = ({navigation}) => {
    const [id, setId] = React.useState([]);
    const [task_name, setHotel_name] = React.useState('');
    const [category_name, setLicenceName] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [insertHotelBox, setInsertHotelBox] = React.useState(false);
    const [deleteHotelBox, setDeleteHotelBox] = React.useState(false);
    const [hotelDelete, setHotelDelete] = React.useState('');
    const [hotelUpdate, setHotelUpdate] = React.useState('');
    const [data, setData] = React.useState([])
    const [tableHead, setTableHead] = React.useState([]);
    const [tableData, setTableData] = React.useState([]);
    const [widthArr,setWidthArr]= React.useState([]);


    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/api/hotels/getAllHotels');
        const responseData = await response.json();
        setData(responseData);
        setLoading(false);
        console.log(responseData);
        setTableHead(['ID taska','Ime task','Ime kategorije']);
        var dataID =[];
        var dataIme =[];
        var dataLicenca =[];
        var dataFinal =[];
        var widthTemp=[];
        dataID.push('ID');
        dataIme.push('Name');
        dataLicenca.push('Licence');
        widthTemp.push(150);
        for (let i = 0; i < responseData.length; i++) {
            dataID.push(responseData[i].id);
            dataIme.push(responseData[i].name);
            dataLicenca.push(responseData[i].category_name);
            widthTemp.push(150);
        }
        dataFinal.push(dataID);
        dataFinal.push(dataIme);
        dataFinal.push(dataLicenca);
        console.log('Table data je',dataFinal);
        setTableData(dataFinal);
        setWidthArr(widthTemp);
        
    }


    const insertHotel = async () => {
        const insertResponse = await fetch('http://localhost:5000/api/hotels/addHotel', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task_name: task_name,
                category_name: category_name
            })
        });
        const insertResponseData = await insertResponse.json();
        if (insertResponseData.message === 'Task inserted')
            setError(insertResponseData.message);
        else if (insertResponseData.message === 'Invalid category name')
            setError(insertResponseData.message);
        fetchData();
    }

    const deleteHotel = async () => {
        const insertResponse = await fetch('http://localhost:5000/api/hotels/deleteHotel', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task_name: hotelDelete,
            })
        });
        const insertResponseData = await insertResponse.json();
        if (insertResponseData.message === "Requested task does not exist") {
            setError(insertResponseData.message);
        } else if (insertResponseData.message === 'Task deleted') {
            setError(insertResponseData.message);
        }
        fetchData();
    }

    const updateHotel = async () => {
        const update = await fetch('http://localhost:5000/api/hotels/updateHotel', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task_name: task_name,
                category_name: category_name,
                id: id
            })
        });

        const insertResponseData = await update.json();
        if (insertResponseData.message === 'Requested task does not exist') {
            setError(insertResponseData.message);
        } else if (insertResponseData.message === "Task updated") {
            setError(insertResponseData.message);
        }
        fetchData();
    }

    const clearHotels = () => {
        setError('');
        setHotel_name('');
        setLicenceName('');
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    // Render

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
                    source={item.img}
                    resizeMode="cover"
                    style={{
                        width: SIZES.width * 0.28,
                        height: '82%',
                        borderRadius: 15
                    }}
                />

                <Text style={{marginTop: SIZES.base / 2, ...FONTS.h4}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>

            {insertHotelBox && (<View style={styles.forms}>
                    <View style={styles.input}>
                        <View>
                            <Text>Add Task</Text>
                            <TextInput
                                placeholder={"Task name"}
                                style={styles.samoInputi}
                                value={task_name}
                                onChangeText={(text) => setHotel_name(text)}

                            />
                            <TextInput
                                placeholder={"Category name"}
                                style={styles.tekst}
                                multiline={true}
                                numberOfLines={4}
                                value={category_name}
                                onChangeText={(text) => setLicenceName(text)}

                            />
                        </View>
                        <View style={styles.icon}>
                            <Button
                                color="#FF2F02"
                                onPress={() => {
                                    insertHotel();
                                }}
                                color={'#EE6800'}
                                title='Add Task'/>
                            {/*<OptionItem*/}
                            {/*    style={styles.icon}*/}
                            {/*    icon={icons.plus}*/}
                            {/*    bgColor={['#46aeff', '#5884ff']}*/}
                            {/*    label="Add"*/}
                            {/*    onPress={() => {*/}
                            {/*        insertHotel();*/}
                            {/*    }}*/}
                            {/*/>*/}
                            <pre>       </pre>
                            <Button
                                color="#FF2F02"
                                onPress={() => {
                                    setInsertHotelBox(false)
                                    clearHotels();
                                }}
                                color={'#EE6800'}
                                title='Exit'/>
                            {/*<OptionItem*/}
                            {/*    style={styles.icon}*/}
                            {/*    icon={icons.back}*/}
                            {/*    bgColor={['#46aeff', '#5884ff']}*/}
                            {/*    label="Exit"*/}
                            {/*    onPress={() => {*/}
                            {/*        setInsertHotelBox(false)*/}
                            {/*        clearHotels();*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </View>
                        {error && (<View style={styles.alertBox}>
                            <Text>{error}</Text>
                        </View>)}
                    </View>
                </View>
            )}

            {deleteHotelBox && (<View style={styles.forms}>


                    <View style={styles.input}>
                        <View>
                            <Text> Delete task </Text>
                            <TextInput
                                placeholder={"Task name"}
                                style={styles.samoInputi}
                                value={hotelDelete}
                                onChangeText={(text) => setHotelDelete(text)}
                            />

                        </View>
                        <View style={styles.icon}>
                            <OptionItem
                                style={styles.icon}
                                icon={icons.minus}
                                bgColor={['#46aeff', '#5884ff']}
                                label="Delete"
                                onPress={() => {
                                    deleteHotel();
                                }}
                            />
                            <pre>       </pre>
                            <OptionItem
                                style={styles.icon}
                                icon={icons.back}
                                bgColor={['#46aeff', '#5884ff']}
                                label="Exit"
                                onPress={() => {
                                    setDeleteHotelBox(false)
                                    clearHotels();
                                }}
                            />
                        </View>
                        {error && (<View style={styles.alertBox}>
                            <Text>{error}</Text>
                        </View>)}
                    </View>

                </View>
            )}

            {hotelUpdate && (<View style={styles.forms}>
                    <View style={styles.input}>
                        <View>
                            <Text>Update task</Text>

                            <TextInput
                                placeholder={"Task ID"}
                                style={styles.samoInputi}
                                value={id}
                                onChangeText={(text) => setId(text)}

                            />

                            <TextInput
                                placeholder={"Task name"}
                                style={styles.samoInputi}
                                value={task_name}
                                onChangeText={(text) => setHotel_name(text)}

                            />

                            <TextInput
                                placeholder={"Category name"}
                                style={styles.samoInputi}
                                value={category_name}
                                onChangeText={(text) => setLicenceName(text)}

                            />

                        </View>
                        <View style={styles.icon}>
                            <OptionItem
                                style={styles.icon}
                                icon={icons.plus}
                                bgColor={['#46aeff', '#5884ff']}
                                label="Update"
                                onPress={() => updateHotel()}
                            />
                            <pre>       </pre>
                            <OptionItem
                                style={styles.icon}
                                icon={icons.back}
                                bgColor={['#46aeff', '#5884ff']}
                                label="Exit"
                                onPress={() => {
                                    setHotelUpdate(false);
                                    clearHotels();
                                }}
                            />
                        </View>
                        {error && (<View style={styles.alertBox}>
                            <Text>{error}</Text>
                        </View>)}
                    </View>
                </View>
            )}

            <View style={{flex: 1, marginTop: SIZES.base,  marginLeft: '30px', paddingHorizontal: SIZES.padding, padding:'100px',}}>
                <Image
                    source={images.hotelBanner}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 15,
                    }}
                />
            </View>

            {/* Options */}
            <View style={{flex: 1, justifyContent: 'space-around'}}>
                <View style={{flexDirection: 'row', marginTop: SIZES.padding, paddingHorizontal: SIZES.base, justifyContent: 'space-around'}}>
                    <Button
                        color="#FF2F02"
                            onPress={() => setInsertHotelBox(!insertHotelBox)}
                        color={'#EE6800'}
                            title='Add Task'/>
                    {/*<OptionItem*/}
                    {/*    // icon={icons.plus}*/}
                    {/*    bgColor={['#46aeff', '#5884ff']}*/}
                    {/*    label="Add task"*/}
                    {/*    onPress={() => setInsertHotelBox(!insertHotelBox)}*/}
                    {/*/>*/}
                    <Button color={'#F32901'} onPress={() => setDeleteHotelBox(!deleteHotelBox)} title='Delete Task'/>
                    {/*<OptionItem*/}
                    {/*    icon={icons.minus}*/}
                    {/*    bgColor={['#fddf90', '#fcda13']}*/}
                    {/*    label="Delete task"*/}
                    {/*    onPress={() => setDeleteHotelBox(!deleteHotelBox)}*/}
                    {/*/>*/}
                    <Button color='#BD2102' onPress={() => setHotelUpdate(!hotelUpdate)} title='Update Task'/>
                    {/*<OptionItem*/}
                    {/*    icon={icons.update}*/}
                    {/*    bgColor={['#e973ad', '#da5df2']}*/}
                    {/*    label="Update tast"*/}
                    {/*    onPress={() => setHotelUpdate(!hotelUpdate)}*/}
                    {/*/>*/}
                </View>

            </View>

            <View style={{flex: 1}}>
                <Text style={{marginTop: SIZES.base, marginHorizontal: SIZES.padding, ...FONTS.h2}}>Tasks</Text>
                <View style={styles.container}>
                    <ScrollView horizontal={true}>
                        <View>
                            <ScrollView style={styles.dataWrapper}>
                                <Table borderStyle={{borderColor: '#C1C0B9'}}>
                                    {
                                        tableData.map((dataRow, index) => (
                                            <Row
                                                key={index}
                                                data={dataRow}
                                                widthArr={widthArr}
                                                style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
                                                textStyle={styles.text}
                                            />
                                        ))
                                    }
                                </Table>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
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
        flex: 1,
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
    },
    table: {
        flex: 1,
        padding: 18,
        paddingTop: 35,
        backgroundColor: '#ffffff'
    },
    HeadStyle: {
        height: 50,
        alignContent: "center",
        backgroundColor: '#ffe0f0'
    },
    TableText: {
        margin: 10
    },
    dataWrapper: {
        marginTop: -1
    },
    row: {
        height: 40,
        backgroundColor: '#F7F8FA'
    }
});

export default Hotels;
