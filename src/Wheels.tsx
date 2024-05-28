// Roulette.tsx
import React, {useRef, useState} from 'react';
import {View, Button, StyleSheet, Text, Animated, Easing} from 'react-native';
import Svg, {G, Path, Text as SvgText} from 'react-native-svg';

interface RouletteProps {
  items: string[];
  colors: string[];
  radius?: number;
}

const Roulette: React.FC<RouletteProps> = ({items, colors, radius = 150}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const startSpinning = () => {
    const randomValue = Math.floor(Math.random() * items.length);

    setSelectedIndex(randomValue);

    Animated.timing(spinValue, {
      toValue: randomValue + 5 * items.length, // 충분히 회전하게 설정
      duration: 3000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      spinValue.setValue(randomValue); // 최종 위치로 설정
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, items.length],
    outputRange: ['0deg', `${360 * items.length}deg`],
  }) as unknown as string; // 타입 오류를 방지하기 위해 string으로 캐스팅

  const anglePerItem = (2 * Math.PI) / items.length; // 아이템 당 각도
  const anglePerItemDeg = 360 / items.length;

  return (
    <View style={styles.container}>
      <Animated.View style={{transform: [{rotate: spin}]}}>
        <Svg
          width={radius * 2 + 10}
          height={radius * 2 + 10}
          viewBox={`-5 -5 ${radius * 2 + 10} ${radius * 2 + 10}`}>
          <G
            origin={`${radius}, ${radius}`}
            rotation={
              selectedIndex
                ? -(anglePerItemDeg * selectedIndex) - 90 - anglePerItemDeg / 2
                : 0
            }>
            {items.map((item, index) => {
              const startAngle = index * anglePerItem;
              const endAngle = startAngle + anglePerItem;
              const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';
              const x1 = radius + radius * Math.cos(startAngle);
              const y1 = radius + radius * Math.sin(startAngle);
              const x2 = radius + radius * Math.cos(endAngle);
              const y2 = radius + radius * Math.sin(endAngle);
              const pathData = `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

              return (
                <G key={index}>
                  <Path
                    d={pathData}
                    fill={colors[index % colors.length]}
                    stroke="#000"
                    strokeWidth="3"
                  />
                  <SvgText
                    fill="#000"
                    fontSize="16"
                    fontWeight="bold"
                    x={
                      radius +
                      (radius - 20) * Math.cos((startAngle + endAngle) / 2)
                    }
                    y={
                      radius +
                      (radius - 20) * Math.sin((startAngle + endAngle) / 2)
                    }
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform={`rotate(${
                      ((startAngle + endAngle) / 2) * (180 / Math.PI)
                    }, ${
                      radius +
                      (radius - 20) * Math.cos((startAngle + endAngle) / 2)
                    }, ${
                      radius +
                      (radius - 20) * Math.sin((startAngle + endAngle) / 2)
                    })`}>
                    {item}
                  </SvgText>
                </G>
              );
            })}
          </G>
        </Svg>
      </Animated.View>
      <Button title="Spin" onPress={startSpinning} />
      {selectedIndex && (
        <Text style={styles.selectedItem}>
          Selected Item: {items[selectedIndex]}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItem: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Roulette;
