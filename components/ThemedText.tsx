import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Platform.select({
      ios: 'SF-Pro-Rounded-Regular',
      android: 'Inter_400Regular',
    }),
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',  
    fontFamily: Platform.select({
      ios: 'SF-Pro-Rounded-Semibold',
      android: 'Inter_600SemiBold',
    }),
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: Platform.select({
      ios: 'SF-Pro-Rounded-Semibold',
      android: 'Inter_600SemiBold',
    }),
  },
  subtitle: {
    fontSize: 20,
    color: "#3d3d3d",
    fontFamily: Platform.select({
      ios: 'SF-Pro-Rounded-Regular',
      android: 'Inter_400Regular',
    }),
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
