import React,{useState, useEffect} from "react";
import { Text, StyleSheet, View,Image, TouchableOpacity } from "react-native";
import Colors from "../../utilis/AppColors";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword , auth,addDoc,signInWithEmailAndPassword,collection, db} from "../../utilis/firebase";
WebBrowser.maybeCompleteAuthSession();
const Welcome = (props) => {
  const [token, setToken] = useState("");

  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "919364266067-ob3i60hj7oa7qtnm1f90u0noq4mj79mg.apps.googleusercontent.com",
    iosClientId: "919364266067-7021co25upun5sdc97867l7v2tmetkps.apps.googleusercontent.com",
    webClientId: "919364266067-evrvsddbkb359d8kpblm0pbdh7csjroa.apps.googleusercontent.com",
    expoClientId:"919364266067-qtscsl4d4vkt9imbbslgahqofp6eivtb.apps.googleusercontent.com"
  });
  useEffect(() => {
    handleEffect();
  }, [response, token]);
  async function handleEffect() {
      const user = await getLocalUser();
      //console.log("user", user);
      if (!user) {
        if (response?.type === "success") {
          getUserInfo(response.authentication.accessToken);
        }
      } else {
        setUserInfo(user);
        //console.log("loaded locally");
      }
    }
  
    const getLocalUser = async () => {
      const data = await AsyncStorage.getItem("@user");
      if (!data) return null;
      return JSON.parse(data);
    };
  
    const getUserInfo = async (token) => {
      if (!token) return;
      try {
        const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        const user = await response.json();
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUserInfo(user);
      } catch (error) {
       console.log(error)
      }
    }; 

    const fbsignup = async() => {
      const socialLogin = await AsyncStorage.getItem("@user");
      if(JSON.parse(socialLogin))
      {
        try {
          const email ="crazyTest@gmail.com";
          const password = "abcnewpassword";
          const user = await createUserWithEmailAndPassword(auth, email, password);
              if(user){
                  const accountsRef = await addDoc(collection(db, "accounts"), {
                      uuid: userInfo.id,
                      role: 'Member',
                      expoPushToken: '',
                      coverLetter: 'I AM FED UP',
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
                      firstName: userInfo.family_name,
                      lastName: userInfo.given_name,
                  });
              }
          
        } catch (error) {
          console.log(error)
        }
      }
      if(!JSON.parse(socialLogin)){
        const email = userInfo.email;
            const password = "abcnewpassword";
            const user = await signInWithEmailAndPassword(auth,email,password);
      }
      // else {
      //   console.log("must be here", )
      //   try {
         
      //     const email = userInfo.email;
      //     const password = "abcnewpassword";
      //     const user = await signInWithEmailAndPassword(auth,email,password);
      // } catch (error) {
      //     Alert.alert(error.message);
      // }
      
  }
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={styles.greeting_container}>
          <Image
            source={require("../../../assets/images/hi_there.png")}
            style={{ width: 270, height: 90, marginBottom: 10 }}
            resizeMode="contain"
            
          />
          <Text style={styles.greeting_black}>
            WELCOME TO <Text style={styles.greeting_pink}>HOMELYNE</Text>
          </Text>
        </View>

        <View>
            <TouchableOpacity style={styles.button_border} onPress={()=>{props.navigation.navigate("SignUpWithEmail")}} >
                <Image
                source={require('../../../assets/images/mail.png')}
                style={{width:24,height:24}}
                resizeMode="contain"

                
                />
                <Text style={styles.text_input} >CONTINUE WITH EMAIL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_border}>
                <Image
                source={require('../../../assets/images/facebook.png')}
                style={{width:27,height:27}}
                resizeMode="contain"

                
                />
                <Text style={styles.text_input}>CONTINUE WITH FACEBOOK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_border}
            onPress={() => {
              promptAsync().then(async()=>{
                fbsignup()
                console.log("hellow")
              });
            }}
            >
                <Image
                source={require('../../../assets/images/google.png')}
                style={{width:27,height:27}}
                resizeMode="contain"
                
                />
                <Text style={styles.text_input}>CONTINUE WITH GOOGLE</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.footer_container}>
          <Text style={styles.footer_text}>
            By signin, signup or continuing I confirm that I have read and agree
            to the{" "}
            <Text
              style={styles.footer_text_link}
              onPress={() => {
                props.navigation.navigate("PrivacyPolicy");
              }}
            >
              Privacy Policy
            </Text>{" "}
            and{" "}
            <Text
              style={styles.footer_text_link}
              onPress={() => {
                props.navigation.navigate("TermsOfUse");
              }}
            >
              Terms of Use
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer_container: {
    marginTop: 60,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  footer_text: {
    fontFamily: "Raleway-Regularttf",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    color: Colors.black,
  },
  footer_text_link: {
    fontFamily: "Raleway-Boldttf",
    fontStyle: "italic",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    color: Colors.pink,
  },
  greeting_container: {
    width: "100%",
    marginBottom: 60,
    alignItems: "center",
  },
  greeting_black: {
    fontFamily: "BebasNeue-Regularttf",
    fontSize: 26,
    color: Colors.black,
    marginTop:15
  },
  greeting_pink: {
    fontFamily: "BebasNeue-Regularttf",
    fontSize: 26,
    color: Colors.pink,
  },
  container: {
    padding: 30,
    backgroundColor: "#ebebeb",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text_input: {
    width: "100%",
    // paddingVertical: 15,
    paddingHorizontal: 16,
    fontSize: 15,
    // borderRadius: 30,
    // backgroundColor: "#ffffff",
    // marginBottom: 10,
  },
  button_border: {
    width: "90%",
    paddingVertical: 15,
    paddingHorizontal: 28,
    paddingEnd:15,
    fontSize: 14,
    // border:'none',
    borderColor: "white",
    borderRadius: 30,
    backgroundColor: "whitesmoke",
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    flexDirection:'row',
    justifyContent:'space-between'
    // display:'flex'
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: "Welcome",
    headerShown: false,
  };
};
export default Welcome;
