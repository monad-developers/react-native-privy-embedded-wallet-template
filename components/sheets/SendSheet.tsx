import { useWalletContext } from "@/context/WalletContext";
import Feather from '@expo/vector-icons/Feather';
import { BottomSheetView } from "@gorhom/bottom-sheet";
import * as Clipboard from "expo-clipboard";
import React, { useEffect, useState } from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { formatUnits, parseUnits } from "viem/utils";
import FloatingIconButton from "../ui/FloatingIconButton";
import ThemedButton from "../ui/ThemedButton";

function TransactionStatus({ txHash }: { txHash: string | null }) {
  if (!txHash) return null;
  return (
    <TouchableOpacity
      onPress={() =>
        Linking.openURL(`https://testnet.monadexplorer.com/tx/${txHash}`)
      }
      style={{ marginTop: 16 }}
    >
      <Text
        style={{
          color: "#4f46e5",
          fontSize: 16,
          textAlign: "center",
          textDecorationLine: "underline",
        }}
      >
        View on Monad Explorer
      </Text>
    </TouchableOpacity>
  );
}

export default function SendSheet() {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [usdcBalance, setUsdcBalance] = useState<bigint | undefined>(undefined);
  const [isOverBalance, setIsOverBalance] = useState(false);
  const { getUSDCBalance, sendUSDC } = useWalletContext();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const bal = await getUSDCBalance();
      setUsdcBalance(bal);
    };
    fetchBalance();
  }, [getUSDCBalance]);

  // Checking if the user entered an amount that is greater than their balance
  useEffect(() => {
    let isOverBalance = false;
    if (amount && usdcBalance !== undefined) {
      const parsedAmount = parseUnits(amount, 6);
      isOverBalance = parsedAmount > usdcBalance;
    }
    setIsOverBalance(isOverBalance);
  }, [amount, usdcBalance]);

  const handleChange = (val: string) => {
    // Allow only digits and a single dot
    let sanitized = val.replace(/[^0-9.]/g, "");
    // Only allow one decimal point
    const parts = sanitized.split(".");
    if (parts.length > 2) {
      sanitized = parts[0] + "." + parts.slice(1).join("");
    }

    setAmount(sanitized);
  };

  async function onSend() {
    setLoading(true);
    setTxHash(null);
    try {
      const parsedAmount = parseUnits(amount, 6);
      const tx = await sendUSDC(address as `0x${string}`, parsedAmount);
      // tx may be a hash or an object with hash property
      const hash = typeof tx === "string" ? tx : tx?.hash;
      setTxHash(hash || null);
    } catch (e) {
      setTxHash(null);
    } finally {
      setLoading(false);
    }
  }

  async function onPaste() {
    const text = await Clipboard.getStringAsync();
    setAddress(text);
  }

  return (
    <BottomSheetView style={styles.bottomSheetView}>
      <View style={styles.flexContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Send USDC</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputRow}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={[styles.input, isOverBalance && { color: "red" }]}
                value={amount}
                onChangeText={handleChange}
                placeholder="0.00"
                placeholderTextColor="#bbb"
                keyboardType="numeric"
                maxLength={12}
                selectionColor="transparent"
              />
            </View>
          </View>
          <Text
            style={{
              color: "#888",
              fontSize: 14,
              marginTop: 8,
              alignSelf: "center",
              fontFamily: Platform.select({
                ios: "SF-Pro-Rounded-Regular",
                android: "Inter_400Regular",
              }),
            }}
          >
            Balance:{" "}
            {usdcBalance !== undefined
              ? Number(formatUnits(usdcBalance, 6)).toFixed(2)
              : "..."}{" "}
            USDC
          </Text>
          <View style={styles.addressInputWrapper}>
            <Text style={styles.label}>Receiver</Text>
            <View style={styles.addressFloatContainer}>
              <TextInput
                style={styles.addressInput}
                value={address}
                onChangeText={setAddress}
                placeholder="Receiver address"
               
                placeholderTextColor="#bbb"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                textContentType="none"
                multiline
                numberOfLines={2}
              />
              {address.length === 0 && (
                <FloatingIconButton
                  icon={<Feather name="copy" size={14} color="black" />}
                  label="Paste"
                  onPress={onPaste}
                  style={styles.pasteButton}
                  textStyle={{ fontSize: 12 }}
                  iconSize={14}
                />
              )}
            </View>
          </View>
          <TransactionStatus txHash={txHash} />
        </View>
        <View style={styles.bottomButtonWrapper}>
          <ThemedButton
            title={loading ? "Sending..." : "Send"}
            onPress={onSend}
            disabled={!(amount && address) || isOverBalance || loading}
          />
        </View>
      </View>
    </BottomSheetView>
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
  inputWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  addressInputWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    minHeight: 100,
    marginTop: 60,
  },
  addressFloatContainer: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },
  pasteButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }], // half of button height (48)
    height: 24,
    width: 70,
    zIndex: 2,
    fontSize: 12,
  },
  dollarSign: {
    fontSize: 28,
    color: "#222",
    marginRight: 8,
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Semibold",
      android: "Inter_600SemiBold",
    }),
  },
  input: {
    fontSize: 64,
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Bold",
      android: "Inter_700Bold",
    }),
    color: "#222", // Hide the text input text
    backgroundColor: "transparent",
    borderWidth: 0,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#555",
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Semibold",
      android: "Inter_600SemiBold",
    }),
    marginBottom: 10,
  },
  addressInput: {
    fontSize: 20,
    backgroundColor: "transparent",
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Semibold",
      android: "Inter_600SemiBold",
    }),
    color: "#222",
    minHeight: 48,
    textAlignVertical: "top",
  },
  inputRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  bottomButtonWrapper: {
    paddingBottom: 32,
    padding: 24,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
});
