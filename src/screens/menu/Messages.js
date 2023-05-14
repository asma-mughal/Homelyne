import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
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

import { Avatar } from "react-native-paper";
const { width, height } = Dimensions.get("window");
const Messages = (props) => {
  const [allChat, setAllChats] = useState([]);
  const [receiverAccount, setReceiverAccount] = useState([]);

  const chats = async () => {
    const chatsRef = collection(db, "chats");
    const chatsQuery = query(
      chatsRef,
      where("senderId", "==", props.route.params.myAccount.uuid)
    );
    const chatsQuerySnapshot = await getDocs(chatsQuery);
    setAllChats(chatsQuerySnapshot.docs.map((x) => x.data().receiverId));

    let receiverAccounts = [];
    const recieversRef = collection(db, "accounts");
    for (const chat of allChat) {
      const receiverQuery = query(recieversRef, where("uuid", "==", chat));
      const receiverSnapshot = await getDocs(receiverQuery);
      receiverAccounts.push(receiverSnapshot.docs[0].data());
    }

    setReceiverAccount(receiverAccounts);
  };

  useEffect(() => {
    chats();
  }, []);

  return (
    <>
      <View>
        <TouchableOpacity>
          <Text>Messages</Text>
        </TouchableOpacity>
      </View>
      {receiverAccount.length !== 0 && (
        <FlatList
          data={receiverAccount}
          keyExtractor={(item) => item.uuid}
          renderItem={(item) => (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignSelf: "center",
                marginTop: height * 0.02,
                paddingBottom: height * 0.02,
                borderBottomColor: "grey",
                borderBottomWidth: 1,
              }}
              onPress={() => {
                props.navigation.navigate("MessageView", {
                  myAccount: props.route.params.myAccount,
                  receiverAccount: item,
                });
              }}
            >
              <Avatar.Image
                size={65}
                source={{ uri: item?.avatar }}
                style={{
                  marginTop: height * 0.01,
                }}
              />
              <View
                style={{
                  marginLeft: height * 0.02,
                  marginTop: height * 0.02,
                  width: width * 0.6,
                }}
              >
                <Text style={{ fontWeight: "600" }}>
                  {item?.firstName} {item?.lastName}
                </Text>
                <Text
                  style={{
                    color: "grey",
                    fontStyle: "italic",
                    fontSize: 12,
                    marginTop: height * 0.01,
                  }}
                >
                  {item.email}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );
};
export const screenOptions = (navData) => {
  return {
    headerTitle: "Messages",
    headerShown: true,
    headerTitleAlign: "center",
  };
};
export default Messages;
