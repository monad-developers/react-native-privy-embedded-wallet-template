import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

export default function IconButton({ icon, label, onPress, style }: IconButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon}
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fefefe",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    width: '100%',
    height: 70,
    marginHorizontal: 2,
  },
  text: {
    color: "#000",
    fontFamily: Platform.select({
      ios: 'SF-Pro-Rounded-Semibold',
      android: 'Inter_600SemiBold',
    }),
    fontSize: 20,
  },
}); 