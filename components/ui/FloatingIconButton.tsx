import React from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface FloatingIconButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconSize?: number;
}

export default function FloatingIconButton({ icon, label, onPress, style, textStyle, iconSize = 18 }: FloatingIconButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon}
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fefefe",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    height: 28,
    minWidth: 48,
    maxWidth: 90,
  },
  text: {
    color: "#000",
    lineHeight: 12,
    fontFamily: "SF-Pro-Rounded-Semibold",
    fontSize: 13,
  },
}); 