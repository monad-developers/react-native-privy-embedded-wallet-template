import IconButton from "@/components/ui/IconButton";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { usePrivy } from "@privy-io/expo";
import { View } from "react-native";

export default function WalletActions({
  openSheet,
}: {
  openSheet: (type: "send" | "receive" | "sign") => void;
}) {
  const { logout } = usePrivy();
  return (
    <View
      style={{
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 30,
        paddingHorizontal: 30,
        gap: 10,
      }}
    >
      <IconButton
        icon={<Feather name="send" size={24} color="black" />}
        label="Send USDC"
        onPress={() => openSheet("send")}
      />
      <IconButton
        icon={<Ionicons name="qr-code-sharp" size={24} color="black" />}
        label="Receive"
        onPress={() => openSheet("receive")}
      />
      <IconButton
        icon={<FontAwesome5 name="signature" size={24} color="black" />}
        label="Sign Message"
        onPress={() => openSheet("sign")}
      />
      <IconButton
        icon={<FontAwesome name="sign-out" size={24} color="black" />}
        label="Sign Out"
        onPress={logout}
      />
    </View>
  );
}
