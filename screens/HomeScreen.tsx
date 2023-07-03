import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useState } from "react";
import Map from "../components/Map";
import { Icon } from "react-native-elements";
import Settings from "../components/popup/Settings";
import Filter from "../components/popup/Filter";
import categories from "../data/ru/categories.json";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { changeLng, chooseCategory } from "../redux/slices/language";

type Props = {};

const HomeScreen = () => {
  const [isLg, setIsLg] = useState<boolean>(false);
  const singleCategory = useSelector((state: RootState) => state.lng.category);
  const dispatch: AppDispatch = useDispatch();

  console.log(singleCategory);
  return (
    <SafeAreaView style={styles.container}>
      <Map />
      <View style={styles.categories}>
        <TouchableOpacity
          style={[
            styles.btn,
            singleCategory === ""
              ? { backgroundColor: "rgba(0, 0, 0, 0.5)" }
              : {},
          ]}
          onPress={() => dispatch(chooseCategory(""))}
        >
          <Text style={singleCategory === "" ? { color: "#fff" } : {}}>
            Все категории
          </Text>
        </TouchableOpacity>
        {categories.map((item) => (
          <TouchableOpacity
            style={[
              styles.btn,
              singleCategory === item.id
                ? { backgroundColor: "rgba(0, 0, 0, 0.5)" }
                : {},
            ]}
            key={item.id}
            onPress={() => dispatch(chooseCategory(item.id))}
          >
            <Text style={singleCategory === item.id ? { color: "#fff" } : {}}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* <View style={styles.parameters}></View> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

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
    // backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 8,
    borderRadius: 4,
  },

  categories: {
    position: "absolute",
    bottom: 100,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: "auto",
    width: "auto",
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 8,
  },
});
