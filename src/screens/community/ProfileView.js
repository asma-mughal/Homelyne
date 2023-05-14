import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  Alert,
  Modal,
  FlatList,
  Button,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Avatar } from "react-native-paper";
import Style from "../../utilis/AppStyle";

import {
  auth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  db,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
  where,
  query,
} from "../../utilis/firebase";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Colors from "../../utilis/AppColors";
import Post from "../../components/Post";
const { height, width } = Dimensions.get("window");
const ProfileView = (props) => {
  const [projects, setProjects] = useState([]);
  const [postState, setPostState] = useState();
  const [account, setAccount] = useState(props.route.params.profile);
  const [isLoading, setIsLoading] = useState(false);

  const getPublicProjects = useCallback(async () => {
    const projectsRef = collection(db, "projects");
    const projectsQuery = query(projectsRef, where("isPrivate", "==", false));
    const projectsQuerySnapshot = await getDocs(projectsQuery);
    const accountsRef = await getDocs(collection(db, "accounts"));

    // setProjects(
    //   projectsQuerySnapshot.docs.filter((x)=>x.data().associateId === props.route.params.profile.uuid)
    // );

    setProjects(
      projectsQuerySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
          account: accountsRef.docs
            .find((x) => x.data().uuid == doc.data().associateId)
            .data(),
        }))
        .filter((x) => x.associateId == props.route.params.profile.uuid)
    );
  }, []);
  useEffect(() => {
    getPublicProjects();
  }, [projects]);

  const butnClick = () => {
    // setProjects(projects?.map((x)=>x.data))
    // console.log(account)
    // console.log("Hello",projects.filter((x)=>x.associateId == props.route.params.profile.uuid).length)
    // console.log("Hello",projects.map((x)=>x.associateId))
    // setPosts(projects?.map((x) => x?.data()))
    console.log(projects, account);
  };

  const publisher = props.route.params.profile;

  let levelIcon =
    "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/junior_uouq0h.png";
  if (publisher.points <= 500) {
    levelIcon =
      "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/junior_uouq0h.png";
  } else if (publisher.points > 500 && publisher.points <= 1500) {
    levelIcon =
      "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/young_designer_hh4htn.png";
  } else if (publisher.points > 1500 && publisher.points <= 3000) {
    levelIcon =
      "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/rising_star_uigpeo.png";
  } else if (publisher.points > 3000 && publisher.points <= 5000) {
    levelIcon =
      "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/super_star_ioadpd.png";
  } else if (publisher.points > 5000 && publisher.points <= 7000) {
    levelIcon =
      "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/world_class_designer_gtvp4x.png";
  } else if (publisher.points > 7000) {
    levelIcon =
      "https://res.cloudinary.com/united-app/image/upload/v1676730330/appicons/levels/master_designer_plz7v0.png";
  }

  return (
    <ScrollView>
      <View>
        <View style={Style.avatar_container_sub}>
          <View style={{ width: 100, height: 100 }}>
            
            {account?.avatar  && <Avatar.Image size={100} source={{   uri: account?.avatar }} /> }
           
            <Image
              source={{ uri: levelIcon }}
              style={{
                width: width * 0.1,
                height: width * 0.1,
                display: "flex",
                position: "absolute",
                top: 35,
                left: 80,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("EditProfile");
              }}
            >
              <Image
                source={require("../../../assets/images/suitcase.png")}
                style={{
                  borderRadius: 50,
                  width: width * 0.09,
                  height: width * 0.09,
                  display: "flex",
                  position: "absolute",
                  top: -95,
                  left: -5,
                }}
              />
            </TouchableOpacity>
          </View>

          <Text style={Style.name_title}>
            {account.firstName} {account.lastName}
          </Text>
          <Text style={Style.name_level}>{account?.coverLetter}</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity style={styles.white_btn}>
              <Text style={styles.white_btn_text}>Following</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.white_btn}>
              <Text style={styles.white_btn_text}>Messages</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: height * 0.01,
            marginBottom: height * 0.01,
            backgroundColor: "white",
            borderRadius: 15,
            width: width * 0.95,
            alignSelf: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            props.navigation.navigate("ProProfile");
          }}
        >
          <View style={{ width: width * 0.2, display: "flex" }}>
            <Image
              source={require("../../../assets/images/furniture.jpg")}
              style={{ width: width * 0.2, height: width * 0.4 }}
            />
          </View>
          <View
            style={{
              width: width * 0.5,
              marginTop: height * 0.04,
              marginBottom: height * 0.05,
              marginLeft: height * 0.02,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>FURNITURE LTD</Text>
            <Text>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type
            </Text>
          </View>
          <View>
            <Image
              source={require("../../../assets/images/greater-than.png")}
              style={{
                height: width * 0.05,
                width: width * 0.05,
                marginTop: height * 0.1,
              }}
            />
          </View>
        </TouchableOpacity>

        <View>
          {!projects.length ? (
            <ActivityIndicator style={{ height: 100 }} />
          ) : (
            <FlatList
              data={projects.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
              })}
              keyExtractor={(item) => item.id}
              renderItem={(itemRow) => (
                setPostState(itemRow.item),
                (
                  <Post
                    post={itemRow.item}
                    myAccount={auth.currentUser.uid}
                    nav={props.navigation}
                    profileClick={() => {
                      props.navigation.navigate("ProfileInfo", {
                        profile: itemRow.item,
                        myAccount: auth.currentUser.uid,
                      });
                    }}
                  />
                )
              )}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  white_btn: {
    borderStyle: "solid",
    borderColor: Colors.pink,
    borderRadius: 30,
    backgroundColor: Colors.white,
    paddingVertical: 14,
    width: width * 0.2,
    alignItems: "center",
  },
  white_btn_text: {
    fontFamily: "BebasNeue-Regularttf",
    color: Colors.pink,
    fontSize: 20,
  },
});
export const screenOptions = (navData) => {
  return {
    headerTitle: "Profile View",
    headerShown: true,
  };
};

export default ProfileView;
