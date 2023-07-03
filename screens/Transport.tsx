import {
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import Map from "../components/Map";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const dialCall = (number: string) => {
  let phoneNumber = "";
  if (Platform.OS === "android") {
    phoneNumber = `tel:${number}`;
  } else {
    phoneNumber = `telprompt:${number}`;
  }
  Linking.openURL(phoneNumber);
};

const initiateWhatsApp = (mobileNumber: string) => {
  // Check for perfect 10 digit length
  if (mobileNumber.length != 12) {
    alert("Please insert correct WhatsApp number");
    return;
  }
  // Using 91 for India
  // You can change 91 with your country code
  let url =
    "whatsapp://send?text=" +
    "Добрый день, подскажите пожалуйста, какой номер заказа у вас сейчас в работе" +
    "&phone=" +
    mobileNumber;
  Linking.openURL(url)
    .then((data) => {
      console.log("WhatsApp Opened");
    })
    .catch(() => {
      alert("Make sure Whatsapp installed on your device");
    });
};

type Props = {};

const Transport = (props: Props) => {
  const singleTransport = useSelector(
    (state: RootState) => state.lng.transport
  );

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.map}>
        <Map />
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btn}
        >
          <Icon name="arrowleft" type="antdesign" color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text
          style={[
            styles.text,
            { fontSize: 20, textTransform: "uppercase", paddingTop: 20 },
          ]}
        >
          {singleTransport.category}
        </Text>
        <Text style={[styles.text, { textTransform: "uppercase" }]}>
          {singleTransport.driverName}
        </Text>
        <Text style={styles.text}>{singleTransport.phone}</Text>
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => dialCall(singleTransport.phone)}
            style={styles.redirect}
          >
            <Text style={styles.style}>Позвонить</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => initiateWhatsApp(singleTransport.phone)}
            style={styles.redirect}
          >
            <Text style={styles.style}>Написать</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Transport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    position: "relative",
  },
  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    position: "absolute",
    top: "6%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  btn: {
    width: "auto",
    height: "auto",
    borderRadius: 10,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  map: {
    flex: 2,
  },

  info: {
    flex: 1,
    gap: 10,
    width: "100%",
    alignContent: "center",
  },

  text: {
    fontSize: 18,
    textAlign: "center",
  },

  options: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 80,
    marginTop: 50,
  },

  redirect: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    width: 120,
    height: 40,
    borderRadius: 8,
  },

  style: {
    fontSize: 18,
    color: "#fff",
  },
});
