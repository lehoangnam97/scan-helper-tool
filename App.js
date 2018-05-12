/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {Dialog} from 'react-native-simple-dialogs';
import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput, ScrollView,
    TouchableOpacity,
    Keyboard, Button
} from 'react-native';
import {Icon as ElementsIcon} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import KeyboardAwareScrollView from "react-native-keyboard-aware-scroll-view/lib/KeyboardAwareScrollView";


export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            numberOfLines: 1,
            numberOfEmptyLines: 1,
            numberOfFullLines: 0,
            text: "",
            dialogVisible: false
        };
        this.onChangeText = this.onChangeText.bind(this);
    }

    onChangeText(text) {
        let result = text.split("\n");
        let numberOfLines = result.length;
        let numberOfFullLines = 0;

        for (let index = 0; index < result.length; ++index) {
            if (result[index])
                numberOfFullLines++;
        }
        let numberOfEmptyLines = numberOfLines - numberOfFullLines;

        this.setState({
            text: text,
            numberOfLines: numberOfLines,
            numberOfEmptyLines: numberOfEmptyLines,
            numberOfFullLines: numberOfFullLines
        });
    }

    render() {
        return (
            <KeyboardAwareScrollView innerRef={ref => this.scroll = ref}>
                <Dialog
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({dialogVisible: false})}>
                    <View style={styles.dialogBackgroundContainer}>
                        <Text style={styles.dialogTitle}>Contact us</Text>
                        <Text style={styles.dialogSubTitle}>Phan mem chat luong</Text>
                        <View style={styles.dialogRowContainer}>
                            <Icon name="ios-mail" size={30}/>
                            <Text style={styles.dialogContent}>pmclgroup.vn@gmail.com</Text>
                        </View>
                        <View style={styles.dialogRowContainer}>
                            <Icon name="logo-facebook" size={30}/>
                            <Text style={styles.dialogContent}>fb.com/phanmemtienichsinhvien</Text>
                        </View>
                        <TouchableOpacity style={styles.dialogButton}
                                          onPress={() => this.setState({dialogVisible: false})}>
                            <Text style={{fontWeight: 'bold', color: 'white'}}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Dialog>


                <View style={styles.header}>
                    <View/>
                    <Text style={styles.headerText}>BAR CODE HELPER</Text>
                    <TouchableOpacity style={styles.settings}
                                      onPress={() => {
                                          this.setState({dialogVisible: true})
                                      }}>
                        <ElementsIcon name="more-vert" color="white" size={20}/>
                    </TouchableOpacity>
                </View>

                <Image style={styles.image} source={require('./logo.png')}/>

                <View style={styles.rowContainer}>
                    <Text style={styles.rowContent}>All lines: </Text>
                    <Text style={styles.rowData}>{this.state.numberOfLines}</Text>
                </View>

                <View style={styles.rowContainer}>
                    <Text style={styles.rowContent}>Empty lines: </Text>
                    <Text style={styles.rowData}>{this.state.numberOfEmptyLines}</Text>
                </View>

                <View style={styles.rowContainer}>
                    <Text style={styles.rowContent}>Full lines: </Text>
                    <Text style={styles.rowData}>{this.state.numberOfFullLines}</Text>
                </View>

                <View style={styles.body}>
                    <TextInput style={[styles.textInput]}
                               onChangeText={this.onChangeText}
                               multiline={true}
                               blurOnSubmit={false}
                    />
                    <TouchableOpacity style={styles.sendButton}
                                      onPress={() => {
                                          Keyboard.dismiss();
                                      }}>
                        <Icon name="md-send" size={30} color='#12914B'/>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1},
    header: {
        width: '100%', height: 50,
        backgroundColor: '#12914B', alignItems: 'center',
        elevation: 5, flexDirection: 'row', justifyContent: 'space-between'
    },
    settings: {margin: 5},
    headerText: {fontWeight: 'bold', fontSize: 20, color: 'white'},
    image: {width: '100%', height: 150, resizeMode: 'stretch'},
    textInput: {
        width: '80%', backgroundColor: 'white', borderRadius: 20, alignSelf: 'center',
        elevation: 20, borderTopWidth: 0,
        borderColor: 'grey',
        fontSize: 20,
        shadowOffset: {
            width: -5,
            height: 5
        },
        shadowColor: 'green',
        shadowOpacity: 0.5,
    },
    text: {fontWeight: 'bold', fontSize: 50, color: 'black', backgroundColor: '#FFFFFF'},
    scrollView: {flex: 1},
    rowContainer: {flexDirection: 'row', justifyContent: 'space-between', padding: 10},
    rowContent: {color: '#34495e', fontSize: 22},
    rowData: {color: '#2c3e50', fontSize: 22, fontWeight: 'bold'},
    body: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 30,

    },
    sendButton: {margin: 10, borderRadius: 30, elevation: 20},
    dialogBackgroundContainer: {backgroundColor: 'transparent', width: '100%', height: 250,},
    dialogRowContainer: {
        width: '90%', flexDirection: 'row', alignItems: 'center',
        marginLeft: 10, marginRight: 10,
    },

    dialogContent: {fontStyle: 'italic', fontSize: 18, marginLeft: 10, color: '#2c3e50'},
    dialogButton: {
        elevation: 5,
        alignSelf: "center",
        width: 100,
        backgroundColor: "#12914B",
        padding: 5,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialogTitle: {
        fontSize: 24,
        color: '#12914B',
        margin: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },

    dialogSubTitle: {fontSize: 22, fontStyle: 'italic', margin: 5, color: '#2c3e50'}
});

