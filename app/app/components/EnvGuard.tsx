"use client"; //chore(env): add runtime EnvGuard for Privy env keys

import { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";

const REQUIRED_KEYS = ["EXPO_PUBLIC_PRIVY_APP_ID", "EXPO_PUBLIC_PRIVY_CLIENT_ID"] as const;

function readEnv(key: string) {
  // Expo pastes EXPO_PUBLIC_* into process.env
  // @ts-expect-error RN global injection at compile time
  return process.env?.[key];
}

export default function EnvGuard() {
  const [dismissed, setDismissed] = useState(false);

  const missing = useMemo(() => {
    return REQUIRED_KEYS.filter((k) => !readEnv(k));
  }, []);

  if (dismissed || missing.length === 0) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "#F59E0B", // amber-500
        paddingVertical: 10,
        paddingHorizontal: 12,
      }}
    >
      <Text style={{ color: "#111827", fontWeight: "700", marginBottom: 4 }}>
        Environment variable missing：{missing.join(", ")}
      </Text>
      <Text style={{ color: "#111827" }}>
        Please create a .env file in the project root directory and fill it in according to README
        {" "}
        EXPO_PUBLIC_PRIVY_APP_ID / EXPO_PUBLIC_PRIVY_CLIENT_ID。
      </Text>
      <Pressable onPress={() => setDismissed(true)} style={{ marginTop: 8 }}>
        <Text style={{ color: "#111827", textDecorationLine: "underline" }}>I already know, hide</Text>
      </Pressable>
    </View>
  );
}
