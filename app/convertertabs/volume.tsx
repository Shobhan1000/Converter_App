import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const volumeUnits = ['Milliliters', 'Liters', 'Deciliters', 'Centiliters', 'Cubic Milliliters', 'Cubic Centimeters', 'Cubic Meters', 'Cubic Inches', 'Cubic Feet', 'Cubic Yards', 'Pints', 'Quarts', 'Gallons', 'Fluid Ounces', 'Teaspoons', 'Tablespoons', 'Drops', 'Barrels', 'Hogsheads', 'Hectoliters', 'Cups', 'Minims', 'Gills', 'Cord', 'Board Feet', 'Acre-Feet', 'Bushels', 'Pecks'];

const Volume: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('Milliliters');
  const [toUnit, setToUnit] = useState('Liters');
  const [result, setResult] = useState('');

    const convert = (value: string, from: string, to: string) => {
    const val = parseFloat(value);
    if (isNaN(val)) { setResult(''); return; }

    // Convert input to liters
    let liters: number;
    switch (from) {
        case 'Milliliters': liters = val / 1000; break;
        case 'Liters': liters = val; break;
        case 'Deciliters': liters = val / 10; break;
        case 'Centiliters': liters = val / 100; break;
        case 'Cubic Milliliters': liters = val / 1e6; break;
        case 'Cubic Centimeters': liters = val / 1000; break;
        case 'Cubic Meters': liters = val * 1000; break;
        case 'Cubic Inches': liters = val * 0.016387064; break;
        case 'Cubic Feet': liters = val * 28.3168466; break;
        case 'Cubic Yards': liters = val * 764.554858; break;
        case 'Fluid Ounces': liters = val * 0.0295735296; break; // US fluid ounce
        case 'Pints': liters = val * 0.473176473; break; // US pint
        case 'Quarts': liters = val * 0.946352946; break; // US quart
        case 'Gallons': liters = val * 3.785411784; break; // US gallon
        case 'Teaspoons': liters = val * 0.00492892159; break; // US teaspoon
        case 'Tablespoons': liters = val * 0.0147867648; break; // US tablespoon
        case 'Drops': liters = val * 0.00005; break; // Approximate
        case 'Barrels': liters = val * 158.987295; break; // Oil barrel
        case 'Hogsheads': liters = val * 238.480942; break; // US liquid hogshead
        case 'Hectoliters': liters = val * 100; break;
        case 'Cups': liters = val * 0.236588236; break; // US cup
        case 'Minims': liters = val * 0.0000616115; break; // US minim
        case 'Gills': liters = val * 0.118294118; break; // US gill
        case 'Cord': liters = val * 3636.8729; break;
        case 'Board Feet': liters = val * 0.002359737; break;
        case 'Acre-Feet': liters = val * 1233481.84; break;
        case 'Bushels': liters = val * 35.2390702; break; // US bushel
        case 'Pecks': liters = val * 8.80976754; break; // US peck
        default: liters = val;
    }

    // Convert liters to target unit
    let converted: number;
    switch (to) {
        case 'Milliliters': converted = liters * 1000; break;
        case 'Liters': converted = liters; break;
        case 'Deciliters': converted = liters * 10; break;
        case 'Centiliters': converted = liters * 100; break;
        case 'Cubic Milliliters': converted = liters * 1e6; break;
        case 'Cubic Centimeters': converted = liters * 1000; break;
        case 'Cubic Meters': converted = liters / 1000; break;
        case 'Cubic Inches': converted = liters / 0.016387064; break;
        case 'Cubic Feet': converted = liters / 28.3168466; break;
        case 'Cubic Yards': converted = liters / 764.554858; break;
        case 'Fluid Ounces': converted = liters / 0.0295735296; break;
        case 'Pints': converted = liters / 0.473176473; break;
        case 'Quarts': converted = liters / 0.946352946; break;
        case 'Gallons': converted = liters / 3.785411784; break;
        case 'Teaspoons': converted = liters / 0.00492892159; break;
        case 'Tablespoons': converted = liters / 0.0147867648; break;
        case 'Drops': converted = liters / 0.00005; break;
        case 'Barrels': converted = liters / 158.987295; break;
        case 'Hogsheads': converted = liters / 238.480942; break;
        case 'Hectoliters': converted = liters / 100; break;
        case 'Cups': converted = liters / 0.236588236; break;
        case 'Minims': converted = liters / 0.0000616115; break;
        case 'Gills': converted = liters / 0.118294118; break;
        case 'Cord': converted = liters / 3636.8729; break;
        case 'Board Feet': converted = liters / 0.002359737; break;
        case 'Acre-Feet': converted = liters / 1233481.84; break;
        case 'Bushels': converted = liters / 35.2390702; break;
        case 'Pecks': converted = liters / 8.80976754; break;
        default: converted = liters;
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
            {volumeUnits.map(unit => (
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
            {volumeUnits.map(unit => (
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

export default Volume;

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