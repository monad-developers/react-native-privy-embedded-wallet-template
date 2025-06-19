import { getAddressForUser } from "@/utils";
import Feather from '@expo/vector-icons/Feather';
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { usePrivy } from "@privy-io/expo";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import QRCodeStyled from "react-native-qrcode-styled";
import SmallIconButton from "../ui/SmallIconButton";

export default function ReceiveSheet() {
  const { user } = usePrivy();
  const walletAddress = getAddressForUser(user);

  return (
    <BottomSheetView style={styles.bottomSheetView}>
      <View style={styles.flexContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Receive</Text>
          <View style={styles.qrCodeContainer}>
            <QRCodeStyled
              data={walletAddress || ""}
              style={{ backgroundColor: "white" }}
              pieceSize={10}
            />
          </View>
          <View style={styles.addressBox}>
            <Text
              style={styles.addressText}
              selectable
              numberOfLines={2}
              ellipsizeMode="middle"
            >
              {walletAddress}
            </Text>
          </View>
          <CopyButton walletAddress={walletAddress} />
        </View>
      </View>
    </BottomSheetView>
  );
}

function CopyButton({ walletAddress }: { walletAddress: string | null }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (!walletAddress) return;
    await Clipboard.setStringAsync(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <View style={styles.copyButtonBox}>
      <SmallIconButton
        icon={<Feather name="copy" size={16} color="black" />}
        label="Copy"
        onPress={onCopy}
        style={styles.copyButton}
        textStyle={{ fontSize: 18 }}
        iconSize={18}
      />
      {copied && <Text style={styles.copiedText}>Copied!</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetView: {
    height: "100%",
  },
  flexContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Semibold",
      android: "Inter_600SemiBold",
    }),
    color: "#555",
    marginBottom: 40,
  },
  qrCodeContainer: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#555",
  },
  copyButton: {
    height: 48,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#fefefe",
    borderWidth: 1,
    borderColor: "#bbb",
  },
  addressBox: {
    width: "100%",
    backgroundColor: "#fefefe",
    borderRadius: 10,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: "#bbb",
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginTop: 24,
    marginBottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  addressText: {
    color: "#333",
    fontSize: 20,
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Semibold",
      android: "Inter_600SemiBold",
    }),
    textAlign: "center",
  },
  copyButtonBox: {
    width: "100%",
    marginTop: 0,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  copiedText: {
    marginTop: 10,
    textAlign: "center",
    color: "#4ade80",
    fontSize: 18,
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Semibold",
      android: "Inter_600SemiBold",
    }),
  },
});
