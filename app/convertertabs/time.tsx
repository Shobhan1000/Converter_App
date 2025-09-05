import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const timeUnits = ['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks', 'Months', 'Years', 'Decades', 'Centuries', 'Milliseconds', 'Microseconds', 'Nanoseconds', 'Picoseconds', 'Femtoseconds', 'Attoseconds', 'Planck Time'];

const Time: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('Seconds');
  const [toUnit, setToUnit] = useState('Minutes');
  const [result, setResult] = useState('');

    const convert = (value: string, from: string, to: string) => {
    const val = parseFloat(value);
    if (isNaN(val)) { setResult(''); return; }

    // Convert input to seconds
    let seconds: number;
    switch (from) {
        case 'Seconds': seconds = val; break;
        case 'Minutes': seconds = val * 60; break;
        case 'Hours': seconds = val * 3600; break;
        case 'Days': seconds = val * 86400; break;
        case 'Weeks': seconds = val * 604800; break;
        case 'Months': seconds = val * 2629800; break; // Average month (30.44 days)
        case 'Years': seconds = val * 31557600; break; // Average year (365.25 days)
        case 'Decades': seconds = val * 315576000; break;
        case 'Centuries': seconds = val * 3155760000; break;
        case 'Milliseconds': seconds = val * 1e-3; break;
        case 'Microseconds': seconds = val * 1e-6; break;
        case 'Nanoseconds': seconds = val * 1e-9; break;
        case 'Picoseconds': seconds = val * 1e-12; break;
        case 'Femtoseconds': seconds = val * 1e-15; break;
        case 'Attoseconds': seconds = val * 1e-18; break;
        case 'Planck Time': seconds = val * 5.391247e-44; break;
        default: seconds = val;
    }

    // Convert seconds to target unit
    let converted: number;
    switch (to) {
        case 'Seconds': converted = seconds; break;
        case 'Minutes': converted = seconds / 60; break;
        case 'Hours': converted = seconds / 3600; break;
        case 'Days': converted = seconds / 86400; break;
        case 'Weeks': converted = seconds / 604800; break;
        case 'Months': converted = seconds / 2629800; break;
        case 'Years': converted = seconds / 31557600; break;
        case 'Decades': converted = seconds / 315576000; break;
        case 'Centuries': converted = seconds / 3155760000; break;
        case 'Milliseconds': converted = seconds / 1e-3; break;
        case 'Microseconds': converted = seconds / 1e-6; break;
        case 'Nanoseconds': converted = seconds / 1e-9; break;
        case 'Picoseconds': converted = seconds / 1e-12; break;
        case 'Femtoseconds': converted = seconds / 1e-15; break;
        case 'Attoseconds': converted = seconds / 1e-18; break;
        case 'Planck Time': converted = seconds / 5.391247e-44; break;
        default: converted = seconds;
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
            {timeUnits.map(unit => (
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
            {timeUnits.map(unit => (
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

export default Time;

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