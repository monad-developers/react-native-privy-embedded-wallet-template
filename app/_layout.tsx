import { useColorScheme } from "@/hooks/useColorScheme";
import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
} from "@expo-google-fonts/inter";


import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import "react-native-reanimated";


export default function RootLayout() {
    const colorScheme = useColorScheme();
    
    const [loaded] = useFonts({
        "SF-Pro-Rounded-Black": require("../assets/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Black.otf"),
        "SF-Pro-Rounded-Bold": require("../assets/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Bold.otf"),
        "SF-Pro-Rounded-Heavy": require("../assets/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Heavy.otf"),
        "SF-Pro-Rounded-Medium": require("../assets/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Medium.otf"),
        "SF-Pro-Rounded-Regular": require("../assets/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Regular.otf"),
        "SF-Pro-Rounded-Semibold": require("../assets/fonts/SF_Pro_Rounded/SF-Pro-Rounded-Semibold.otf"),
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
      
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <Slot />
        </ThemeProvider>
    );
}
