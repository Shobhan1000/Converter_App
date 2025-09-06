// 1️⃣ Import necessary packages
import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// 2️⃣ Import the new Distance converter page
import Area from './convertertabs/area';
import DataStore from './convertertabs/datastorage';
import Distance from './convertertabs/distance';
import FuelMileage from './convertertabs/fuelmileage';
import Power from './convertertabs/power';
import Pressure from './convertertabs/pressure';
import Speed from './convertertabs/speed';
import Temperature from './convertertabs/temperature';
import Time from './convertertabs/time';
import Volume from './convertertabs/volume';
import Weight from './convertertabs/weight';

// 3️⃣ Define navigation types
type RootStackParamList = {
  Home: undefined;
  Distance: undefined;
  Weight: undefined;
  Temperature: undefined;
  Time: undefined;
  Volume: undefined;
  Speed: undefined;
  Area: undefined;
  DataStorage: undefined;
  FuelMileage: undefined;
  Power: undefined;
  Pressure: undefined;
  Category: { name: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

// 4️⃣ Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// 5️⃣ Define categories
const categories = [
  { name: 'Area', icon: 'crop' },
  { name: 'Data Storage', icon: 'storage' },
  { name: 'Distance', icon: 'straighten' },
  { name: 'Fuel Mileage', icon: 'local-gas-station' },
  { name: 'Power', icon: 'bolt' },
  { name: 'Pressure', icon: 'compress' },
  { name: 'Speed', icon: 'speed' },
  { name: 'Temperature', icon: 'thermostat' },
  { name: 'Time', icon: 'access-time' },
  { name: 'Volume', icon: 'invert-colors' },
  { name: 'Weight', icon: 'fitness-center' },
];

// 6️⃣ Home Screen
const HomeScreen: React.FC<{ navigation: HomeScreenNavigationProp }> = ({ navigation }) => {
  // Split categories into rows of 3
  const rows = [];
  for (let i = 0; i < categories.length; i += 3) {
    rows.push(categories.slice(i, i + 3));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cat) => (
            <TouchableOpacity
              key={cat.name}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => {
                if (cat.name === 'Distance') {
                  navigation.navigate('Distance');
                } else if (cat.name === 'Weight') {
                  navigation.navigate('Weight');
                } else if (cat.name === 'Temperature') {
                  navigation.navigate('Temperature');
                } else if (cat.name === 'Time') {
                  navigation.navigate('Time');
                } else if (cat.name === 'Volume') {
                  navigation.navigate('Volume');
                } else if (cat.name === 'Speed') {
                  navigation.navigate('Speed');
                } else if (cat.name === 'Area') {
                  navigation.navigate('Area');
                } else if (cat.name === 'Data Storage') {
                  navigation.navigate('DataStorage');
                } else if (cat.name === 'Fuel Mileage') {
                  navigation.navigate('FuelMileage');
                } else if (cat.name === 'Power') {
                  navigation.navigate('Power');
                } else if (cat.name === 'Pressure') {
                  navigation.navigate('Pressure');
                } else {
                  navigation.navigate('Category', { name: cat.name });
                }
              }}
            >
              <MaterialIcons name={cat.icon as any} size={50} color="#6200ee" />
              <Text style={styles.cardText}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

// 7️⃣ Generic Category Screen
const CategoryScreen: React.FC<{ route: CategoryScreenRouteProp }> = ({ route }) => {
  const { name } = route.params;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>{name} Converter</Text>
      <Text style={styles.subtitle}>Conversion functionality goes here.</Text>
    </Animated.View>
  );
};

// 8️⃣ App Component with stack navigator
export default function App() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Distance" component={Distance} />
        <Stack.Screen name="Weight" component={Weight} />
        <Stack.Screen name="Temperature" component={Temperature} />
        <Stack.Screen name="Time" component={Time} />
        <Stack.Screen name="Volume" component={Volume} />
        <Stack.Screen name="Speed" component={Speed} />
        <Stack.Screen name="Area" component={Area} />
        <Stack.Screen name="DataStorage" component={DataStore} />
        <Stack.Screen name="FuelMileage" component={FuelMileage} />
        <Stack.Screen name="Power" component={Power} />
        <Stack.Screen name="Pressure" component={Pressure} />
        <Stack.Screen name="Category" component={CategoryScreen} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

// 9️⃣ Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f6f6f6',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 0,
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 12,
    padding: 10,
    margin: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    minWidth: 0,
    maxWidth: '32%',
  },
  cardText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 10,
    color: '#6200ee',
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
});