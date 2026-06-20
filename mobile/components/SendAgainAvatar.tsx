import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface SendAgainAvatarProps {
  imageUrl: string;
  size?: number;
}

export default function SendAgainAvatar({
  imageUrl,
  size = 64,
}: SendAgainAvatarProps) {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image
        source={{ uri: imageUrl }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    resizeMode: 'cover',
  },
});
