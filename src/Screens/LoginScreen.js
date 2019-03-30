import React from 'react'
import { Text, View, StyleSheet, Image, Dimensions, Platform, TextInput, TouchableOpacity } from 'react-native'

const { height, width } = Dimensions.get('window')


export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            passwordVal: true,
            passwordImage: require('../../Assets/password_no_icon.png'),
            checked:false,
            checkBoxImage:require('../../Assets/checkbox.png'),
            validEmail:null
        }

        this.changePwdType = this.changePwdType.bind(this);
        this.changeCheckChecked = this.changeCheckChecked.bind(this),
        this.validateEmail = this.validateEmail.bind(this),
        this.signIn = this.signIn.bind(this)
    }

    changePwdType (){
        if(this.state.passwordVal){
            this.setState({
                passwordVal:false,
                passwordImage: require('../../Assets/password_show.png')
            })
        }
        else{
            this.setState({
                passwordVal:true,
                passwordImage: require('../../Assets/password_no_icon.png')
            })
        }
    }

    changeCheckChecked(){
        if(this.state.checked){
            this.setState({
                checked:false,
                checkBoxImage: require('../../Assets/checkbox.png')
            })
        }
        else{
            this.setState({
                checked:true,
                checkBoxImage: require('../../Assets/fill_checkbox.png')
            })
        }
    }

    validateEmail(){
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(this.state.email) == false)
        {
            this.setState({validEmail : false})
        }
        else{
            this.setState({validEmail : true})
        }
    }

    signIn(){

        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(this.state.email) == false)
        {
            this.setState({validEmail : false})
        }
        else if(this.state.password == '')
        {
            this.setState({validEmail : true})
        }
        else{
            this.setState({validEmail : true})


                  fetch('http://63.35.102.119/node_api/luzy_UserLogin', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      username: this.state.email,
                      pasword: this.state.password,
                    }),
                  }).then((response) => response.json())
                    .then((responseJson) => {
                      console.log("Login...", responseJson);
                      alert(responseJson.Message)

                    })
                    .catch((error) => {
                      this.setState({ downloading: true });
                      console.log("Login Error : ", error);
                    });

        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navigationView}>
                    <Image style={{ height: height / 18, width: width / 4 }} resizeMode='stretch' source={require('../../Assets/logo.png')}></Image>
                    <Image style={{ height: height / 25, width: width / 12 }} resizeMode='stretch' source={require('../../Assets/app_menu_icon.png')}></Image>
                </View>

                <View style={styles.LoginView}>

                    <Text style={{ color: '#ffffff', fontSize: 25, fontWeight: 'bold' }}>LOGIN</Text>
                    <Text style={{ color: '#ffffff' }}>with LUZY account:</Text>

                    <View style={{ width: width / 1.2, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>

                    <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 12, marginTop: height / 50 }}>USERNAME:</Text>
                    {this.state.validEmail == false ? <Text style={{color: 'red', fontSize: 12, marginTop: height / 50 }}>Wrong email address.</Text> : null }

                    </View>
                    <View style={[styles.textInput,{borderColor : this.state.validEmail == false ? 'red' : 'transparent'}]}>
                        <Image style={{ height: height / 25, width: width / 9 }} resizeMode='contain' source={require('../../Assets/email_icon.png')}></Image>
                        <TextInput
                            style={styles.textInputText}
                            placeholderTextColor="#054993"
                            placeholder="Your email address"
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType="next"
                            onSubmitEditing={this.validateEmail}
                            onChangeText={(email) => this.setState({ email })}>
                        </TextInput>
                        {this.state.validEmail == true ?
                                                <Image style={{ height: height / 25, width: width / 9 }} resizeMode='contain' source={require('../../Assets/check_mark.png')}></Image>
                                                : this.state.validEmail == false ?<Image style={{ height: height / 25, width: width / 9 }} resizeMode='contain' source={require('../../Assets/error_mark.png')}></Image>
                                                : null
                        }
                    </View>

                    <Text style={{ marginLeft: width / 12, alignSelf: 'flex-start', color: '#ffffff', fontWeight: 'bold', fontSize: 12, marginTop: height / 80 }}>PASSWORD:</Text>
                    <View style={styles.textInput}>
                        <Image style={{ height: height / 25, width: width / 9 }} resizeMode='contain' source={require('../../Assets/password_icon.png')}></Image>
                        <TextInput
                            style={styles.textInputText}
                            placeholderTextColor="#054993"
                            placeholder="Your password"
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={this.state.passwordVal ? true : false}
                            returnKeyType="next"
                            onChangeText={(password) => this.setState({ password })}>
                        </TextInput>
                        <TouchableOpacity onPress={this.changePwdType} >
                            <Image style={{ height: height / 25, width: width / 9 }} resizeMode='contain' source={this.state.passwordImage}></Image>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: height / 80, width: width / 1.2, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}onPress={this.changeCheckChecked} >
                            <Image style={{ height: height / 40, width: width / 10 }} resizeMode='contain' source={this.state.checkBoxImage}></Image>
                            <Text style={{ color: '#054993', fontSize: 12, merginTop: height / 70 }}>Remember me:</Text>
                          </TouchableOpacity>
                        <Text style={{ color: '#054993', fontSize: 12, merginTop: height / 70 }}>Forgot your password?</Text>
                    </View>

                    <TouchableOpacity style={styles.buttonSignIn} onPress={this.signIn} >
                        <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold' }}>SIGN IN</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.socialView}>
                    <Text style={{ color: '#ffffff', fontSize: 25, fontWeight: 'bold' }}>LOGIN</Text>
                    <Text style={{ color: '#ffffff' }}>with your social media account:</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: height / 80 }}>
                        <Image style={{ height: height / 15, width: width / 5 }} resizeMode='contain' source={require('../../Assets/facebook_icon.png')}></Image>
                        <Image style={{ height: height / 15, width: width / 5 }} resizeMode='contain' source={require('../../Assets/twitter_icon.png')}></Image>
                        <Image style={{ height: height / 15, width: width / 5 }} resizeMode='contain' source={require('../../Assets/instagram_icon.png')}></Image>
                    </View>
                </View>

                <View style={styles.signupView}>
                    <Text style={{ color: '#ffffff' }}>Don't have an account?</Text>
                    <View style={styles.buttonSignUp}>
                        <Text style={{ color: '#054993', fontSize: 18, fontWeight: 'bold' }}>SIGN UP</Text>
                    </View>
                    <View style={{ width: width / 1.2, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: height / 70 }}>
                            <Image style={{ height: height / 25, width: width / 15 }} resizeMode='contain' source={require('../../Assets/info_icon.png')}></Image>
                            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>  About us</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: height / 70 }}>
                            <Image style={{ height: height / 25, width: width / 15 }} resizeMode='contain' source={require('../../Assets/help_icon.png')}></Image>
                            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>  Need help?</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: Platform.OS === 'ios' ? 500 : 0.11,
    },
    navigationView: {
        flex: 0.11,
        flexDirection: 'row',
        paddingTop: Platform.OS === 'ios' ? 12 : 0,
        backgroundColor: '#065bae',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: width / 15
    },
    LoginView: {
        flex: 0.50,
        backgroundColor: '#02152a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialView: {
        flex: 0.20,
        backgroundColor: '#011e3f',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signupView: {
        flex: 0.19,
        backgroundColor: '#054993',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonSignUp: {
        height: height / 15,
        width: width / 1.2,
        borderWidth: 1,
        borderRadius: 8,
        borderColor : 'transparent',
        marginTop: height / 80,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonSignIn: {
        height: height / 15,
        width: width / 1.2,
        borderWidth: 1,
        borderRadius: 8,
        borderColor : 'transparent',
        marginTop: height / 80,
        backgroundColor: '#0cb6f3',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        height: height / 15,
        width: width / 1.2,
        borderWidth: 1,
        borderRadius: 8,
        borderColor : 'transparent',
        marginTop: height / 100,
        backgroundColor: '#011E3f',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: width / 35
    },
    textInputText: {
        color: 'white',
        marginLeft: width / 45,
        width: width / 1.9
    }
})
