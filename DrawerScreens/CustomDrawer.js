import React from "react";
import { View, Image, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#1e90ff" }}
      >
        <Image
          source={require("../assets/teachers.png")}
          style={{
            height: 120,
            width: 100,
            marginLeft: 90,
            marginTop: 40,
            marginBottom: 10,
            borderRadius: 40,
            borderWidth: 1,
            borderColor: "white",
          }}
        />

      
        <Text
          style={{
            marginLeft: 20,
            fontSize: 16,
            marginTop: 8,
            paddingBottom: 10,
          }}
        >
          test@email.com
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingBottom: 5,
            paddingTop: 5,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
