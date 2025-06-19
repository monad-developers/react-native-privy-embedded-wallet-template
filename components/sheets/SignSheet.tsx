import { useWalletContext } from "@/context/WalletContext";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import ThemedButton from "../ui/ThemedButton";

export default function SignSheet() {
    const { signMessage } = useWalletContext();
    const [message, setMessage] = useState("");
    const [signature, setSignature] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSign = async () => {
        setLoading(true);
        try {
            const sig = await signMessage(message);
            setSignature(sig ?? null);
        } catch (e) {
            setSignature("Error signing message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <BottomSheetView style={styles.bottomSheetView}>
            <View style={styles.flexContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Sign Message</Text>
                    <TextInput
                        style={styles.textarea}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Enter message to sign"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                    <View style={styles.signatureBox}>
                        <Text style={styles.signatureLabel}>Signature:</Text>
                        <Text style={styles.signatureText} selectable>
                            {signature || ""}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonWrapper}>
                <ThemedButton
                    title={loading ? "Signing..." : "Sign Message"}
                    onPress={handleSign}
                    disabled={!message || loading}
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
    flexContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        fontFamily: Platform.select({
            ios: "SF-Pro-Rounded-Semibold",
            android: "Inter_600SemiBold",
        }),
        color: "#555",
        marginBottom: 24,
    },
    textarea: {
        width: "100%",
        minHeight: 80,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        fontFamily: Platform.select({
            ios: "SF-Pro-Rounded-Regular",
            android: "Inter_400Regular",
        }),
        marginBottom: 16,
        backgroundColor: "#fafafa",
    },
    signatureBox: {
        width: "100%",
        marginTop: 10,
        padding: 12,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        minHeight: 60,
    },
    signatureLabel: {
        fontSize: 14,
        color: "#888",
        marginBottom: 4,
    },
    signatureText: {
        fontSize: 16,
        color: "#222",
        fontFamily: Platform.select({
            ios: "SF-Pro-Rounded-Regular",
            android: "Inter_400Regular",
        }),
    },
    buttonWrapper: {
        paddingBottom: 32,
        padding: 24,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },
});
