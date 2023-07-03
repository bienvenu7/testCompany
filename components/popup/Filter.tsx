import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changeLng } from "../../redux/slices/language";

type Props = {};

const Filter = (props: Props) => {
  const lg = useSelector((state: RootState) => state.lng.lg);
  const dispatch = useDispatch();
  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>Настройки</Text>
          <TouchableOpacity>
            <Icon name="close" type="antdesign" color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.lg}>
          <TouchableOpacity
            style={[styles.btn, lg === "ru" ? { backgroundColor: "#000" } : {}]}
            onPress={() => dispatch(changeLng("ru"))}
          >
            <Text
              style={[styles.btnText, lg === "ru" ? { color: "#fff" } : {}]}
            >
              Русский
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, lg === "en" ? { backgroundColor: "#000" } : {}]}
            onPress={() => dispatch(changeLng("en"))}
          >
            <Text
              style={[styles.btnText, lg === "en" ? { color: "#fff" } : {}]}
            >
              Англиский
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "75%",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 60,
    gap: 80,
  },

  text: {
    fontSize: 28,
  },

  title: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  lg: {
    gap: 40,
  },

  btnText: {
    fontSize: 18,
  },

  btn: {
    backgroundColor: "transparent",
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 10,
  },
});
