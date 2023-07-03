import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import transports from "../data/ru/transports.json";
import categories from "../data/ru/categories.json";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { ITransport, getTransport } from "../redux/slices/language";

type Props = {};

const Map = () => {
  const mapRef = useRef(null);
  const dispatch: AppDispatch = useDispatch();

  const singleTransport = useSelector(
    (state: RootState) => state.lng.transport
  );

  const singleCategory = useSelector((state: RootState) => state.lng.category);

  const [origin, setOrigin] = useState<Location.LocationObjectCoords>();
  const [allCategories, setCategories] = useState(categories);
  const [allTransports, setTransports] = useState<ITransport[]>(transports);

  const getPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({});
    setOrigin(location.coords);
  };

  useEffect(() => {
    getPermission();
  }, []);

  const navigation = useNavigation();
  const n = "Transport";

  return (
    <MapView
      ref={mapRef}
      mapType="mutedStandard"
      style={styles.container}
      initialRegion={{
        latitude: singleTransport.lat
          ? singleTransport.lat
          : origin?.latitude
          ? origin.latitude
          : 56.116766,
        longitude: singleTransport.lon
          ? singleTransport.lon
          : origin?.longitude
          ? origin.longitude
          : 47.262782,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {origin?.latitude && origin.longitude && (
        <Marker
          coordinate={{
            latitude: origin.latitude,
            longitude: origin.longitude,
          }}
          title="user"
          description="this is the position of the user"
          pinColor="#000"
        />
      )}
      {allTransports
        .filter((item) =>
          singleCategory === ""
            ? item.category !== singleCategory
            : item.categoryId === singleCategory
        )
        .map((item) => {
          return (
            <Marker
              key={item.name}
              coordinate={{
                latitude: item.lat,
                longitude: item.lon,
              }}
              title={item.driverName}
              description={item.name}
              pinColor="#000"
              onPress={() => {
                dispatch(getTransport(item));
                navigation.navigate(n as never);
              }}
            >
              <Image
                source={
                  item.categoryId === "passenger"
                    ? require("../assets/passenger.png")
                    : item.categoryId === "freight"
                    ? require("../assets/track1.png")
                    : require("../assets/special.png")
                }
                style={styles.passenger}
              />
            </Marker>
          );
        })}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    position: "relative",
  },
  passenger: {
    width: 42,
    height: 42,
  },
});
