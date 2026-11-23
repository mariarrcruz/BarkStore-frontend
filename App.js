import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './src/theme';
import { StoreProvider, navigationRef } from './src/store';
import { Splash, Login, Register } from './src/screens/auth';
import { Home, Products, ProductDetail } from './src/screens/shop';
import { Cart, Payment, Confirmation } from './src/screens/checkout';
import { MyPlans, CreatePlan, ManagePlan } from './src/screens/plans';
import { Profile, EditProfile, Orders, MyPets, AddPet, Addresses, AddAddress, PaymentMethods } from './src/screens/profile';

const Root = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const opts = { headerShown: false, contentStyle: { backgroundColor: colors.bg } };

const detail = (S) => (
  <>
    <S.Screen name="ProductDetail" component={ProductDetail} />
    <S.Screen name="Cart" component={Cart} />
    <S.Screen name="Payment" component={Payment} />
    <S.Screen name="Confirmation" component={Confirmation} />
    <S.Screen name="CreatePlan" component={CreatePlan} />
    <S.Screen name="ManagePlan" component={ManagePlan} />
    <S.Screen name="EditProfile" component={EditProfile} />
    <S.Screen name="Orders" component={Orders} />
    <S.Screen name="MyPets" component={MyPets} />
    <S.Screen name="AddPet" component={AddPet} />
    <S.Screen name="Addresses" component={Addresses} />
    <S.Screen name="AddAddress" component={AddAddress} />
    <S.Screen name="PaymentMethods" component={PaymentMethods} />
  </>
);

const makeStack = (initial, component) => () => {
  const S = createNativeStackNavigator();
  return (
    <S.Navigator screenOptions={opts}>
      <S.Screen name={initial} component={component} />
      {detail(S)}
    </S.Navigator>
  );
};
const HomeStack = makeStack('Home', Home);
const ProductsStack = makeStack('Products', Products);
const PlansStack = makeStack('MyPlans', MyPlans);
const ProfileStack = makeStack('Profile', Profile);

const icons = { Início: 'home-outline', Produtos: 'cube-outline', Planos: 'clipboard-outline', Perfil: 'id-card-outline' };

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: {
          position: 'absolute', left: 16, right: 16, bottom: 16, height: 68,
          borderRadius: 20, backgroundColor: '#fff', borderTopWidth: 0,
          paddingTop: 8, paddingBottom: 8, elevation: 8,
          shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
        },
        tabBarIcon: ({ color }) => <Ionicons name={icons[route.name]} size={24} color={color} />,
      })}
    >
      <Tab.Screen name="Início" component={HomeStack} />
      <Tab.Screen name="Produtos" component={ProductsStack} />
      <Tab.Screen name="Planos" component={PlansStack} />
      <Tab.Screen name="Perfil" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <StatusBar style="dark" />
        <NavigationContainer ref={navigationRef}>
          <Root.Navigator screenOptions={opts} initialRouteName="Splash">
            <Root.Screen name="Splash" component={Splash} />
            <Root.Screen name="Login" component={Login} />
            <Root.Screen name="Register" component={Register} />
            <Root.Screen name="Main" component={Tabs} />
          </Root.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </SafeAreaProvider>
  );
}