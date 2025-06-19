import Avatar from "@/components/ui/Avatar";
import { useWalletContext } from "@/context/WalletContext";
import { getAddressForUser } from "@/utils";
import { usePrivy } from "@privy-io/expo";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { formatUnits } from "viem/utils";

export default function WalletHeader() {
  const { user } = usePrivy();

  const address = user ? getAddressForUser(user) : null;

  const { getUSDCBalance, getMONBalance } = useWalletContext();
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [monBalance, setMonBalance] = useState<number | undefined>(undefined);

  useEffect(() => {
    const getBalance = async () => {
      const [balance, monBalance] = await Promise.all([
        getUSDCBalance(),
        getMONBalance(),
      ]);
      setBalance(balance);
      setMonBalance(monBalance ? Number(formatUnits(monBalance, 18)) : 0);
    };
    getBalance();
  }, [getUSDCBalance, getMONBalance]);

  return (
    <>
      <Avatar seed={address || "user"} size={96} style={{ marginBottom: 24 }} />
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>$</Text>
        <Text style={styles.balance}>
          {balance ? Number(formatUnits(balance, 6)).toFixed(2) : "0.00"}
        </Text>
      </View>
      <View style={{ height: 24, marginTop: 10 }}>
        <Text style={styles.gasBalance}>
          Gas: {monBalance ? monBalance.toFixed(2) : "0.00"} MON
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  gasBalance: {
    fontSize: 16,
    color: "#777",
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Semibold",
      android: "Inter_600SemiBold",
    }),
  },
  balance: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: Platform.select({
      ios: "SF-Pro-Rounded-Semibold",
      android: "Inter_600SemiBold",
    }),
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
