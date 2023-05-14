import React from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import AppColors from "../../utilis/AppColors";
import { Avatar } from "react-native-paper";
import { EntypoIcons } from "@expo/vector-icons/Entypo";
import { FeatherIcons } from "@expo/vector-icons/Feather";

// import { Colors } from 'react-native/Libraries/NewAppScreen'
const { height, width } = Dimensions.get("window");

const ProProfileView = () => {
  return (
    <ScrollView>
      <View
        style={{
          width: width * 1,
          backgroundColor: "white",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/images/furniture.jpg")}
          style={{ justifyContent: "center", alignSelf: "center" }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: 20,
          }}
        >
          furniture ltd
        </Text>
        <Text style={{ color: "black", fontSize: 13 }}>@furnitureltd</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image
            source={require("../../../assets/images/facebook.png")}
            style={{
              height: height * 0.1,
              width: width * 0.1,
              marginRight: width * 0.02,
            }}
            resizeMode="contain"
          />
          <Image
            source={require("../../../assets/images/Insta.jpeg")}
            style={{
              height: height * 0.1,
              width: width * 0.1,
              marginRight: width * 0.02,
            }}
            resizeMode="contain"
          />
          <Image
            source={require("../../../assets/images/linkedIn.jpeg")}
            style={{
              height: height * 0.1,
              width: width * 0.1,
              marginRight: width * 0.02,
            }}
            resizeMode="contain"
          />
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ fontSize: 20, color: "grey" }}>| </Text>
          <Text
            style={{
              textTransform: "uppercase",
              fontWeight: "600",
              fontSize: 20,
              color: AppColors.pink,
            }}
          >
            34 reviews
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: AppColors.background,
          paddingLeft: width * 0.08,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            marginTop: height * 0.02,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Avatar.Image
            size={70}
            source={require("../../../assets/images/avatar.png")}
          />
          <Image
            source={require("../../../assets/images/suitcase.png")}
            style={{
              width: width * 0.1,
              height: width * 0.1,
              display: "flex",
              position: "absolute",
              top: 35,
              left: 60,
              width: width * 0.07,
              height: width * 0.07,
            }}
          />
          {/* <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("EditProfile");
              }}
            > */}
          <Image
            source={require("../../../assets/images/suitcase.png")}
            style={{
              borderRadius: 50,
              width: width * 0.07,
              height: width * 0.07,
              display: "flex",
              position: "absolute",
              top: 5,
              left: -5,
            }}
          />
          <View style={{ display: "flex", flexDirection: "column" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: width * 0.07,
                marginTop: height * 0.02,
              }}
            >
              <Text
                style={{
                  color: AppColors.pink,
                  textTransform: "uppercase",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                annabell
              </Text>
              <Text
                style={{
                  color: AppColors.gray,
                  textTransform: "uppercase",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {" "}
                singelton
              </Text>
              {/*
               */}
            </View>
            <Text
              style={{
                marginLeft: width * 0.07,
                fontSize: 12,
                color: AppColors.gray,
              }}
            >
              @annabell_singleton
            </Text>
          </View>
          {/* </TouchableOpacity> */}
        </View>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text style={Style.mainHeading}>ABOUT US</Text>
          <Text style={Style.innerText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </Text>
        </View>

        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text style={Style.mainHeading}>SERVICES</Text>
          <Text style={Style.subHeading}>Category</Text>
          <Text style={Style.innerText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </Text>
          <Text style={Style.subHeading}>Servies Provided</Text>

          <Text style={Style.innerText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </Text>
          <Text style={Style.subHeading}>Price Range</Text>
          <Text style={Style.innerText}>$1500 - $4500</Text>
          <Text style={Style.subHeading}>Area Served</Text>
          <Text style={Style.innerText}>All Areas</Text>
        </View>

        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text style={Style.mainHeading}>PORTFOLIO</Text>
          <ScrollView
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: height * 0.03,
            }}
            horizontal={true}
          >
            <Image
              source={require("../../../assets/images/1.jpg")}
              style={{
                height: height * 0.18,
                width: width * 0.65,
                marginRight: width * 0.02,
              }}
            />
            <Image
              source={require("../../../assets/images/1.jpg")}
              style={{
                height: height * 0.18,
                width: width * 0.65,
                marginRight: width * 0.02,
              }}
            />
          </ScrollView>
        </View>

        {/* <View style={{ display: "flex", flexDirection: "column" }}>
          <Text style={Style.mainHeading}>CONTACT</Text>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <EntypoIcons name="location-pin" size={24} color="#C9C2BB" />
            <Text
              style={{
                fontSize: 24,
              }}
            >
              14, Karlibach st. Tel Aviv, ISRAEL 615456
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <EntypoIcons name="phone" size={24} color="#C9C2BB" />
            <Text
              style={{
                fontSize: 24,
              }}
            >
              03-91120304
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <FeatherIcons name="globe" size={24} color="#C9C2BB" />
            <Text style={{ fontSize: 24 }}>www.furnitureltd.com</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <EntypoIcons name="mail" size={24} color="#C9C2BB" />
            <Text style={{ fontSize: 24 }}>annabell@furnitureltd.com</Text>
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};
export default ProProfileView;
const Style = StyleSheet.create({
  innerText: {
    paddingRight: width * 0.09,
    fontSize: 14,
    marginBottom: height * 0.02,
  },
  mainHeading: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: height * 0.01,
  },
  subHeading: {
    fontWeight: "600",
    fontSize: 16,
  },
});
