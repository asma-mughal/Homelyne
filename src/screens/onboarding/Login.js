import React, { useState, useEffect } from "react";
import { View, Text, Alert, Image, TouchableOpacity, StyleSheet,Button, TextInput, ActivityIndicator } from 'react-native';
import Colors from '../../utilis/AppColors';
import {
    auth, onAuthStateChanged,signOut,signInWithEmailAndPassword,createUserWithEmailAndPassword,db,collection,addDoc,updateDoc,doc,getDocs,deleteDoc
} from '../../utilis/firebase';

const Login = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loginView, setLoginView] = useState(true)
      
    useEffect(() => {
        if(errorMsg){
            Alert.alert('Error', errorMsg);
        }
    },[errorMsg]);
   
  
    
    const fblogin = async() => {
        setIsLoading(true);
        try {
            const user = await signInWithEmailAndPassword(auth,email,password);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            Alert.alert(error.message);
        }
    }
    const fbsignup = async() => {
        
        setIsLoading(true);

        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
                if(user){
                    const accountsRef = await addDoc(collection(db, "accounts"), {
                        uuid: user.user.uid,
                        role: 'Member',
                        expoPushToken: '',
                        coverLetter: '',
                        avatar: '',
                        contact: {
                            phone: '',
                            address: '',
                            zip: '',
                            city: '',
                            country: '',
                            state: ''
                        },
                        points: 100,
                        level: "Junior",
                        pointsItems:[],
                        favoriteProducts: [],
                        firstName: firstName,
                        lastName: lastName,
                    });
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPassword("");
                    setIsLoading(false);
                }
            
          } catch (error) {
            setIsLoading(false);
            Alert.alert(error.message);
          }
    }
     
    return(
        <View style={styles.container}>
            {
                loginView ? 
                (
                    <View style={{width:'100%', alignItems:'center'}}>

                        <View style={styles.greeting_container}>
                        <Image source={require('../../../assets/images/hi_there.png')} style={{width:270,height:90, marginBottom:10}} />
                        <Text style={styles.greeting_black}>login / signup <Text style={styles.greeting_pink}>with email</Text></Text>
                        </View>

                        <TextInput
                            style={styles.text_input} 
                            placeholder='Email' 
                            autoCapitalize='none' 
                            value={email} 
                            onChangeText={text => setEmail(text)} />

                        <TextInput 
                            style={styles.text_input}
                            placeholder='Password' 
                            autoCapitalize='none' 
                            secureTextEntry={true}
                            value={password} 
                            onChangeText={text => setPassword(text)} />

                        {
                            isLoading ? (<ActivityIndicator color={Colors.pink} size='large' style={{marginVertical:12}} />) : (
                                <TouchableOpacity style={styles.button_pink} onPress={fblogin}>
                                    <Text style={{color:'#ffffff', fontWeight:'700', fontSize:16}}>LOGIN</Text>
                                </TouchableOpacity>
                            )
                        }


                        <TouchableOpacity style={styles.button_border} onPress={() => {setLoginView(!loginView)}}>
                            <Text style={{color:'#444', fontWeight:'500', fontSize:16}}>Create New Account</Text>
                        </TouchableOpacity>

                        <View style={styles.footer_container}>
                            <Text style={styles.footer_text}>
                            By signin, signup or continuing I confirm that  I have read and agree to the <Text style={styles.footer_text_link} onPress={() => {props.navigation.navigate('PrivacyPolicy')}}>Privacy Policy</Text> and <Text style={styles.footer_text_link} onPress={() => {props.navigation.navigate('TermsOfUse')}}>Terms of Use</Text>
                            </Text>
                        </View>
                    </View>
                ) :
                (
                    <View style={{width:'100%'}}>

                        <View style={styles.greeting_container}>
                            <Image source={require('../../../assets/images/hi_there.png')} style={{width:270,height:90, marginBottom:10}} />
                            <Text style={styles.greeting_black}>login / signup <Text style={styles.greeting_pink}>with email</Text></Text>
                        </View>

                        <TextInput
                            style={styles.text_input} 
                            placeholder='First Name' 
                            autoCapitalize='none' 
                            value={firstName} 
                            onChangeText={text => setFirstName(text)} />

                        <TextInput
                            style={styles.text_input} 
                            placeholder='Last Name' 
                            autoCapitalize='none' 
                            value={lastName} 
                            onChangeText={text => setLastName(text)} />    
                        <TextInput
                            style={styles.text_input} 
                            placeholder='Email' 
                            autoCapitalize='none' 
                            value={email} 
                            onChangeText={text => setEmail(text)} />

                        <TextInput 
                            style={styles.text_input}
                            placeholder='Password' 
                            autoCapitalize='none' 
                            secureTextEntry={true}
                            value={password} 
                            onChangeText={text => setPassword(text)} />

                        {
                            isLoading ? (
                                <ActivityIndicator color={Colors.pink} size='large' style={{marginVertical:12}} />
                            ) : (
                                <TouchableOpacity style={styles.button_pink} onPress={fbsignup}>
                                    <Text style={{color:'#ffffff', fontWeight:'700', fontSize:16}}>SIGN UP</Text>
                                </TouchableOpacity>
                            )
                        }

                        <TouchableOpacity style={styles.button_border} onPress={() => {setLoginView(!loginView)}}>
                            <Text style={{color:'#444', fontWeight:'500', fontSize:16}}>Back to login</Text>
                        </TouchableOpacity>

                        <View style={styles.footer_container}>
                            <Text style={styles.footer_text}>
                            By signin, signup or continuing I confirm that  I have read and agree to the <Text style={styles.footer_text_link} onPress={() => {props.navigation.navigate('PrivacyPolicy')}}>Privacy Policy</Text> and <Text style={styles.footer_text_link} onPress={() => {props.navigation.navigate('TermsOfUse')}}>Terms of Use</Text>
                            </Text>
                        </View>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    footer_container:{
        marginTop:20, width:'100%',alignItems:'center', paddingHorizontal:30
    },
    footer_text:{
        fontFamily:'Raleway-Regularttf',
        fontSize:14, lineHeight:18, textAlign:'center', color:Colors.black
    },
    footer_text_link:{
        fontFamily:'Raleway-Boldttf', fontStyle:'italic',
        fontSize:14, lineHeight:18, textAlign:'center', color:Colors.pink
    },
    greeting_container:{
        width:'100%',
        marginBottom:50,
        alignItems:'center'
    },
    greeting_black:{
        fontFamily:'BebasNeue-Regularttf',
        fontSize:26, color: Colors.black
    },
    greeting_pink:{
        fontFamily:'BebasNeue-Regularttf',
        fontSize:26, color:Colors.pink
    },
    container: {
        padding:30, backgroundColor:'#ebebeb', flex:1,
        alignItems:'center', justifyContent:'center'
    },
    text_input:{
        width:'100%', paddingVertical:15, paddingHorizontal:20, fontSize:18,
        borderRadius:30, backgroundColor:'#ffffff', marginBottom:10
    },
    button_pink:{
        width:'100%', paddingVertical:20, paddingHorizontal:20, fontSize:18,
        borderRadius:30, backgroundColor:'#D8315B', marginBottom:10, alignItems:'center'
    },
    button_border:{
        width:'100%', paddingVertical:20, paddingHorizontal:20, fontSize:18, borderColor:'#444',
        borderRadius:30, backgroundColor:'#ebebeb', marginBottom:10, alignItems:'center', borderWidth:1
    },
});

export const screenOptions = navData => {
    return {
        headerTitle: 'Login',
        headerShown: false
    }
}

export default Login;