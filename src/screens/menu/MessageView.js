import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
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
import AppColors from "../../utilis/AppColors";
const { width, height } = Dimensions.get("window");
const MessageView = (props) => {
  const [message, setMessage] = useState("");
  const [senderMessages, setSenderMessages] = useState();
  const [receiverMessages, setReceiverMessages] = useState();
  const [myAccount, setMyAccount] = useState(props.route.params.myAccount);
  const [receiverAccount, setReceiverAccount] = useState(
    props.route.params.receiverAccount
  );
  const [allMessages, setAllMessages] = useState([]);
  const loadMessages = async () => {
    const accountsRef = await getDocs(collection(db, "chatroom"));

    console.log(
      "HHAHAHAHHHAHAHHAHHAHHAAHHAHAH",
      accountsRef.docs.map((x) => x.data())
    );

    // loadMessages();

    setAllMessages(
      accountsRef.docs
        .map((x) => x.data())
        .filter((x) => x.senderId == myAccount.uuid)
        .concat(
          accountsRef.docs
            .map((x) => x.data())
            .filter((x) => x.senderId == receiverAccount.item.uuid)
        )
        .sort((a, b) => {
          return a.sendedAt - b.sendedAt;
        })
    );
  };
  const scrollViewRef = useRef();
  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  // useEffect(() => {
  // loadMessages();
  // }, [allMessages]);
  const sendMessage = async () => {
    console.log("message", message, "send", Date.now());
    try {
      console.log("+++++++++++++++=", receiverAccount.item.uuid);
      console.log("+++++++++++++==========++=", myAccount.uuid);
      await addDoc(collection(db, "chatroom"), {
        message: message,
        receiverId: receiverAccount.item.uuid,
        senderId: myAccount.uuid,
        sendedAt: Date.now(),
      });
      console.log("message sent");
      // loadMessages();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ScrollView ref={scrollViewRef} onContentSizeChange={scrollToBottom}>
        {allMessages.map((x) =>
          x.receiverId == myAccount.uuid ? (
            <View
              key={x.sendedAt}
              style={{
                flexDirection: "row",
                backgroundColor: "blue",
                marginLeft: width * 0.04,
                marginBottom: height * 0.02,
              }}
            >
              <Avatar.Image
                size={55}
                source={{ uri: receiverAccount?.avatar }}
                style={{
                  marginTop: height * 0.01,
                }}
              />
              <View
                style={{
                  marginTop: height * 0.02,
                  marginLeft: width * 0.06,
                  backgroundColor: "blue",
                  padding: 10,
                  width: width * 0.6,
                  borderRadius: 10,
                }}
              >
                <Text>{x.message}</Text>
                <Text
                  style={{
                    fontSize: 10,
                    justifyContent: "flex-end",
                    alignSelf: "flex-end",
                    color: "gray",
                  }}
                >
                  {new Date(x.sendedAt).getHours()}:{" "}
                  {new Date(x.sendedAt).getMinutes() < 10
                    ? `0${new Date(x.sendedAt).getMinutes()}`
                    : new Date(x.sendedAt).getMinutes()}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row-reverse",
                marginLeft: width * 0.04,
                marginBottom: height * 0.02,
              }}
            >
              <Avatar.Image
                size={55}
                source={{ uri: myAccount?.avatar }}
                style={{
                  marginTop: height * 0.01,
                }}
              />
              <View
                style={{
                  marginTop: height * 0.02,
                  marginRight: width * 0.06,

                  padding: 10,
                  width: width * 0.6,
                  borderRadius: 10,
                }}
              >
                <Text>{x.message}</Text>
                <Text
                  style={{
                    fontSize: 10,
                    justifyContent: "flex-end",
                    alignSelf: "flex-end",
                    color: "gray",
                  }}
                >
                  {new Date(x.sendedAt).getHours()}:{" "}
                  {new Date(x.sendedAt).getMinutes() < 10
                    ? `0${new Date(x.sendedAt).getMinutes()}`
                    : new Date(x.sendedAt).getMinutes()}
                </Text>
              </View>
            </View>
          )
        )}
      </ScrollView>
      <View
        style={{
          backgroundColor: AppColors.pink,
          paddingTop: 10,
          flexDirection: "row",
        }}
      >
        <TextInput
          name="message"
          placeholder="Type a message"
          style={{
            width: width * 0.8,
            marginLeft: width * 0.04,
            padding: 12,
            borderRadius: 10,
            backgroundColor: "white",
            marginBottom: height * 0.01,
          }}
          value={message}
          onChangeText={(text) => setMessage(text)}
          multiline={true}
        />
        <TouchableOpacity
          onPress={() => {
            sendMessage();
            setMessage("");
          }}
          disabled={message == "" ? true : false}
        >
          <Image
            source={require("../../../assets/images/send.png")}
            style={{
              height: width * 0.06,
              width: width * 0.1,
              marginTop: height * 0.02,
              marginLeft: width * 0.02,
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default MessageView;
export const screenOptions = (navData) => {
  return {
    headerTitle: "MessageView",
    headerShown: true,
    headerTitleAlign: "center",
  };
};
