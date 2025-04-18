import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { LoginScreen } from '../screens/auth/LoginScreen';
import { RequestScreen } from '../screens/employee/RequestScreen';
import { ApprovalScreen } from '../screens/manager/ApprovalScreen';
import { useAuthStore } from '../stores/authStore';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const EmployeeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#1976d2',
      tabBarInactiveTintColor: '#757575',
    }}
  >
    <Tab.Screen
      name="Requests"
      component={RequestScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="file-document-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="History"
      component={RequestScreen} // Replace with actual history screen
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="history" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const ManagerTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#1976d2',
      tabBarInactiveTintColor: '#757575',
    }}
  >
    <Tab.Screen
      name="Approvals"
      component={ApprovalScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="History"
      component={ApprovalScreen} // Replace with actual history screen
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="history" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  const { user, token } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1976d2',
          },
          headerTintColor: '#fff',
          headerRight: () => (
            <IconButton
              icon="logout"
              iconColor="#fff"
              onPress={() => useAuthStore.getState().logout()}
            />
          ),
        }}
      >
        {!token ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            {user?.role === 'employee' ? (
              <Stack.Screen
                name="EmployeeDashboard"
                component={EmployeeTabNavigator}
                options={{ title: 'Employee Dashboard' }}
              />
            ) : (
              <Stack.Screen
                name="ManagerDashboard"
                component={ManagerTabNavigator}
                options={{ title: 'Manager Dashboard' }}
              />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 