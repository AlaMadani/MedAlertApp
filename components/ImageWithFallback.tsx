// MedAlertNative/components/ImageWithFallback.tsx

import React, { useState } from 'react';
import { 
  Image, 
  View, 
  StyleSheet, 
  ImageProps, 
  StyleProp, 
  ViewStyle, // Keep ViewStyle for the fallback
  ImageStyle // <-- FIX: Import ImageStyle
} from 'react-native';
import { ImageOff } from 'lucide-react-native'; // A good fallback icon

// Define the props for our component
interface ImageWithFallbackProps extends Omit<ImageProps, 'source'> {
  uri: string | null | undefined;
  //
  // --- FIX IS HERE ---
  // The style prop should be for an Image, as that's the primary use.
  //
  style?: StyleProp<ImageStyle>; 
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const { uri, style, ...rest } = props;
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  if (didError || !uri) {
    // The fallback <View> can accept an ImageStyle prop,
    // so this is now valid.
    return (
      <View style={[styles.fallbackContainer, style]}>
        <ImageOff size={24} color="#888888" />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: uri }}
      style={style} // <-- FIX: This is now correctly typed as ImageStyle
      onError={handleError}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    overflow: 'hidden',
  },
});