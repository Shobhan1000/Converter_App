import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const angleUnits = ['Degrees', 'Radians', 'Gradians', 'Turns', 'Arcminutes', 'Arcseconds', 'Milliradians', 'Microradians', 'Nautical Miles', 'Sextants', 'Points', 'Quadrants'];

const Angle: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('Degrees');
  const [toUnit, setToUnit] = useState('Radians');
  const [result, setResult] = useState('');

    const convert = (value: string, from: string, to: string) => {
    const val = parseFloat(value);
    if (isNaN(val)) { setResult(''); return; }

    // Convert input to degrees
    let degrees: number;
    switch (from) {
        case 'Degrees': degrees = val; break;
        case 'Radians': degrees = val * (180 / Math.PI); break;
        case 'Gradians': degrees = val * 0.9; break;
        case 'Turns': degrees = val * 360; break;
        case 'Arcminutes': degrees = val / 60; break;
        case 'Arcseconds': degrees = val / 3600; break;
        case 'Milliradians': degrees = val * (180 / Math.PI) / 1000; break;
        case 'Microradians': degrees = val * (180 / Math.PI) / 1e6; break;
        case 'Nautical Miles': degrees = val * 21600; break; // 1 nautical mile = 1/21600 of a circle
        case 'Sextants': degrees = val * 60; break; // 1 sextant = 60 degrees
        case 'Points': degrees = val * 11.25; break; // 1 point = 11.25 degrees
        case 'Quadrants': degrees = val * 90; break; // 1 quadrant = 90 degrees
        default: degrees = val;
    }

    // Convert degrees to target unit
    let converted: number;
    switch (to) {
        case 'Degrees': converted = degrees; break;
        case 'Radians': converted = degrees * (Math.PI / 180); break;
        case 'Gradians': converted = degrees / 0.9; break;
        case 'Turns': converted = degrees / 360; break;
        case 'Arcminutes': converted = degrees * 60; break;
        case 'Arcseconds': converted = degrees * 3600; break;
        case 'Milliradians': converted = degrees * (Math.PI / 180) * 1000; break;
        case 'Microradians': converted = degrees * (Math.PI / 180) * 1e6; break;
        case 'Nautical Miles': converted = degrees / 21600; break;
        case 'Sextants': converted = degrees / 60; break;
        case 'Points': converted = degrees / 11.25; break;
        case 'Quadrants': converted = degrees / 90; break;
        default: converted = degrees;
    }

    setResult(converted.toFixed(6));
    };

  const handleKeyPress = (key: string) => {
    if (key === '⌫') {
      const newValue = inputValue.slice(0, -1);
      setInputValue(newValue);
      convert(newValue, fromUnit, toUnit);
    } else if (key === '↔') {
      const temp = fromUnit;
      setFromUnit(toUnit);
      setToUnit(temp);
      convert(inputValue, toUnit, temp);
    } else {
      // Prevent multiple dots
      if (key === '.' && inputValue.includes('.')) return;

      const newValue = inputValue + key;
      setInputValue(newValue);
      convert(newValue, fromUnit, toUnit);
    }
  };

  const keypad = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['.','0','⌫'],
    ['↔']
  ];

  return (
    <SafeAreaView style={styles.container}>

      {/* Fixed Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.label}>You are converting:</Text>
        <Text style={styles.inputText}>{inputValue || '0'} {fromUnit}</Text>
        <Text style={styles.label}>Result:</Text>
        <Text style={styles.resultText}>{result ? `${result} ${toUnit}` : '--'}</Text>
      </View>

      {/* Units selection */}
      <View style={styles.unitsContainer}>
        {/* From Units */}
        <View style={styles.unitColumn}>
          <Text style={styles.unitLabel}>From</Text>
          <ScrollView style={styles.unitScroll} showsVerticalScrollIndicator={false}>
            {angleUnits.map(unit => (
              <TouchableOpacity
                key={unit}
                style={[styles.unitButton, unit === fromUnit && styles.activeUnit]}
                onPress={() => { setFromUnit(unit); convert(inputValue, unit, toUnit); }}
              >
                <Text style={[styles.unitText, unit === fromUnit && styles.activeUnitText]}>{unit}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* To Units */}
        <View style={styles.unitColumn}>
          <Text style={styles.unitLabel}>To</Text>
          <ScrollView style={styles.unitScroll} showsVerticalScrollIndicator={false}>
            {angleUnits.map(unit => (
              <TouchableOpacity
                key={unit}
                style={[styles.unitButton, unit === toUnit && styles.activeUnit]}
                onPress={() => { setToUnit(unit); convert(inputValue, fromUnit, unit); }}
              >
                <Text style={[styles.unitText, unit === toUnit && styles.activeUnitText]}>{unit}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Space */}
      <View style={{height:10}} />

      {/* Keypad */}
      <View style={styles.keypadContainer}>
        {keypad.map((row, i) => (
          <View key={i} style={styles.keypadRow}>
            {row.map(key => (
              <TouchableOpacity
                key={key}
                style={[styles.key, key === '↔' && styles.swapKey]}
                onPress={() => handleKeyPress(key)}
              >
                <Text style={[styles.keyText, key === '↔' && styles.swapKeyText]}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

    </SafeAreaView>
  );
};

export default Angle;

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#f6f6f6' },
  displayContainer: { padding:20, alignItems:'center' },
  label: { fontSize:16, color:'#666' },
  inputText: { fontSize:40, fontWeight:'bold', marginVertical:5 },
  resultText: { fontSize:30, fontWeight:'bold', color:'#6200ee', marginVertical:5 },

  unitsContainer: { flexDirection:'row', justifyContent:'space-around', flex:1, paddingHorizontal:10 },
  unitColumn: { flex:1, alignItems:'center' },
  unitLabel: { fontSize:16, fontWeight:'bold', marginBottom:5 },
  unitScroll: { maxHeight:200 }, // each scrolls independently
  unitButton: {
    backgroundColor:'#fff',
    paddingVertical:8,
    paddingHorizontal:12,
    marginVertical:4,
    borderRadius:10,
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{ width:0, height:1 },
    shadowOpacity:0.1,
    shadowRadius:2,
    elevation:2,
  },
  activeUnit: { backgroundColor:'#6200ee' },
  unitText: { fontSize:14, color:'#000' },
  activeUnitText: { color:'#fff', fontWeight:'bold' },

  keypadContainer: { backgroundColor:'#eaeaea', padding:10, borderTopLeftRadius:20, borderTopRightRadius:20 },
  keypadRow: { flexDirection:'row', justifyContent:'space-between', marginVertical:4 },
  key: {
    flex:1,
    marginHorizontal:4,
    backgroundColor:'#fff',
    borderRadius:12,
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:12,
    shadowColor:'#000',
    shadowOffset:{ width:0, height:2 },
    shadowOpacity:0.1,
    shadowRadius:4,
    elevation:2,
  },
  swapKey: { backgroundColor:'#6200ee' },
  keyText: { fontSize:22, fontWeight:'bold', color:'#6200ee' },
  swapKeyText: { fontSize:22, fontWeight:'bold', color:'#fff' },
});