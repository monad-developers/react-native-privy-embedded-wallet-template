import { ThemedText } from "@/components/ThemedText";
import ThemedButton from "@/components/ui/ThemedButton";
import { useAuth } from "@/context/AuthContext";
import { useLoginWithEmail } from "@privy-io/expo";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function Email() {
  const { email, setEmail } = useAuth();
  const { sendCode } = useLoginWithEmail();

  async function onSendCode() {
    await sendCode({ email });
    router.push("/demo/sign-in/code");
  }

  return (
    <View style={styles.container}>
      <View style={{ gap: 8, alignItems: 'center' }}>
        <ThemedText type="title" style={{ marginBottom: 8 }}>Enter your email</ThemedText>
        <ThemedText type="subtitle">We will use this to create a wallet</ThemedText>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <ThemedButton
        title="Send Code"
        onPress={onSendCode}
        disabled={!email}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Rounded-Semibold',
    height: 50,
    marginTop: 20,
    borderColor: '#f0f0f0',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
  },
}); 