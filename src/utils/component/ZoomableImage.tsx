import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useRef, createRef } from 'react';
import { View, Text, Image, Animated, Dimensions } from 'react-native';
import { HandlerStateChangeEvent, PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import { stackScreen } from '../../core/shared/Routing';
import { theme } from '../../assets/res/theme';
import { HeaderBackButton } from '@react-navigation/elements';
import mainStyle from '../styling/mainStyle';

type ZoomableImageProps = NativeStackScreenProps<stackScreen, 'ZoomImage'>

const ZoomableImage = ({ navigation, route }: ZoomableImageProps) => {

  const [panEnabled, setPanEnabled] = useState(false);

  const { url } = route.params

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const pinchRef = createRef();
  const panRef = createRef();

  const onPinchEvent = Animated.event([{
    nativeEvent: { scale }
  }],
    { useNativeDriver: true });

  const onPanEvent = Animated.event([{
    nativeEvent: {
      translationX: translateX,
      translationY: translateY
    }
  }],
    { useNativeDriver: true });

  const handlePinchStateChange = (event: { nativeEvent: { state: number; scale: number; }; }) => {
    // enabled pan only after pinch-zoom
    if (event.nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    // when scale < 1, reset scale back to original (1)
    const nScale = event.nativeEvent.scale;
    if (event.nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true
        }).start();

        setPanEnabled(false);
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <PanGestureHandler
        onGestureEvent={onPanEvent}
        ref={panRef}
        simultaneousHandlers={[pinchRef]}
        enabled={panEnabled}
        failOffsetX={[-1000, 1000]}
        shouldCancelWhenOutside
      >
        <Animated.View>
          <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={onPinchEvent}
            simultaneousHandlers={[panRef]}
            onHandlerStateChange={handlePinchStateChange}
          >
            <Animated.Image
              source={{ uri: url }}
              style={{
                width: '100%',
                height: '100%',
                transform: [{ scale }, { translateX }, { translateY }]
              }}
              resizeMode="contain"
            />

          </PinchGestureHandler>
        </Animated.View>

      </PanGestureHandler>

      <HeaderBackButton onPress={() => navigation.pop()} style={mainStyle.backButton} tintColor={theme.colors.onBackground} />
      
    </View>
  );
};


export default ZoomableImage;