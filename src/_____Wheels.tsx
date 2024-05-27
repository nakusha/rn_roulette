import {FC, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as d3Shape from 'd3-shape';
import Svg, {G, Text, TSpan, Path, Pattern} from 'react-native-svg';

const Wheels = () => {
  const rotation = useSharedValue(0);
  const [currentAngle, setCurrentAngle] = useState(rotation.value);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  const handleAngle = (value: number) => {
    setCurrentAngle(parseInt(value.toFixed(), 10));
  };
  const easing = Easing.bezier(0.23, 1, 0.32, 1);

  const gesture = Gesture.Pan().onUpdate(e => {
    rotation.value = withTiming(
      Math.abs(e.velocityY) / 7 + rotation.value,
      {
        duration: 1000,
        easing: easing,
      },
      () => runOnJS(handleAngle)(rotation.value % 360),
    );
  });

  const Wheel = () => {
    return (
      <>
        <View style={styles.circleRow}>
          <View style={[styles.pizza, styles.pizzaRed]} />
          <View style={[styles.pizza, styles.pizzaBlue]} />
        </View>
        <View style={styles.circleRow}>
          <View style={[styles.pizza, styles.pizzaGreen]} />
          <View style={[styles.pizza, styles.pizzaYellow]} />
        </View>
      </>
    );
  };

  return (
    <View style={styles.circleContainer}>
      <View style={styles.pointer} />
      <Animated.View style={[styles.circle, animatedStyles]}>
        <Wheel />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  circleRow: {width: '100%', height: '50%', flexDirection: 'row'},
  pizza: {width: '50%', height: '100%'},
  pizzaRed: {backgroundColor: '#ce4257'},
  pizzaBlue: {backgroundColor: '#4361ee'},
  pizzaYellow: {backgroundColor: '#fee440'},
  pizzaGreen: {backgroundColor: '#06d6a0'},
  text: {
    color: 'white',
    fontSize: 16,
  },
  infoBox: {
    marginTop: 15,
    height: 40,
    justifyContent: 'space-between',
  },
  circle: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: '#ced4da',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#343a40',
  },
  circleContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointer: {
    width: 10,
    height: 30,
    backgroundColor: 'black',
    position: 'absolute',
    top: -15,
    borderWidth: 2,
    borderColor: 'white',
    zIndex: 6000,
  },
});

export default Wheels;
