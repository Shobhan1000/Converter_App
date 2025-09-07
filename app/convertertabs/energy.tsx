import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const energyUnits = ['Joules', 'Kilojoules', 'Megajoules', 'Gigajoules', 'Terajoules', 'Petajoules', 'Exajoules', 'Zettajoules', 'Yottajoules', 'Calories', 'Kilocalories', 'Watt-hours', 'Kilowatt-hours', 'Megawatt-hours', 'Gigawatt-hours', 'British Thermal Units (BTU)', 'Electronvolts', 'Foot-pounds', 'Therms'];

const Energy: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('Joules');
  const [toUnit, setToUnit] = useState('Kilojoules');
  const [result, setResult] = useState('');

    const convert = (value: string, from: string, to: string) => {
    const val = parseFloat(value);
    if (isNaN(val)) { setResult(''); return; }

    // Convert input to Joules
    let joules: number;
    switch (from) {
        case 'Joules': joules = val; break;
        case 'Kilojoules': joules = val * 1e3; break;
        case 'Megajoules': joules = val * 1e6; break;
        case 'Gigajoules': joules = val * 1e9; break;
        case 'Terajoules': joules = val * 1e12; break;
        case 'Petajoules': joules = val * 1e15; break;
        case 'Exajoules': joules = val * 1e18; break;
        case 'Zettajoules': joules = val * 1e21; break;
        case 'Yottajoules': joules = val * 1e24; break;
        case 'Calories': joules = val * 4.184; break;
        case 'Kilocalories': joules = val * 4184; break;
        case 'Watt-hours': joules = val * 3600; break;
        case 'Kilowatt-hours': joules = val * 3.6e6; break;
        case 'Megawatt-hours': joules = val * 3.6e9; break;
        case 'Gigawatt-hours': joules = val * 3.6e12; break;
        case 'British Thermal Units (BTU)': joules = val * 1055.05585; break;
        case 'Electronvolts': joules = val * 1.602176634e-19; break;
        case 'Foot-pounds': joules = val * 1.3558179483314; break;
        case 'Therms': joules = val * 1.05506e8; break;
        default: joules = val;
    }

    // Convert Joules to target unit
    let converted: number;
    switch (to) {
        case 'Joules': converted = joules; break;
        case 'Kilojoules': converted = joules / 1e3; break;
        case 'Megajoules': converted = joules / 1e6; break;
        case 'Gigajoules': converted = joules / 1e9; break;
        case 'Terajoules': converted = joules / 1e12; break;
        case 'Petajoules': converted = joules / 1e15; break;
        case 'Exajoules': converted = joules / 1e18; break;
        case 'Zettajoules': converted = joules / 1e21; break;
        case 'Yottajoules': converted = joules / 1e24; break;
        case 'Calories': converted = joules / 4.184; break;
        case 'Kilocalories': converted = joules / 4184; break;
        case 'Watt-hours': converted = joules / 3600; break;
        case 'Kilowatt-hours': converted = joules / 3.6e6; break;
        case 'Megawatt-hours': converted = joules / 3.6e9; break;
        case 'Gigawatt-hours': converted = joules / 3.6e12; break;
        case 'British Thermal Units (BTU)': converted = joules / 1055.05585; break;
        case 'Electronvolts': converted = joules / 1.602176634e-19; break;
        case 'Foot-pounds': converted = joules / 1.3558179483314; break;
        case 'Therms': converted = joules / 1.05506e8; break;
        default: converted = joules;
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
            {energyUnits.map(unit => (
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
            {energyUnits.map(unit => (
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

export default Energy;

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#f6f6f6' },
  displayContainer: { padding:20, alignItems:'center' },
  label: { fontSize:16, color:'#666' },
  inputText: { fontSize:40, fontWeight:'bold', marginVertical:5 },
  resultText: { fontSize:30, fontWeight:'bold', color:'#6200ee', marginVertical:5 },

  unitsContainer: { flexDirection:'row', justifyContent:'space-around', flex:1, paddingHorizontal:10 },
  unitColumn: { flex:1, alignItems:'center', marginHorizontal: 5 },
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
  unitText: { fontSize:14, color:'#000', textAlign:'center' },
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