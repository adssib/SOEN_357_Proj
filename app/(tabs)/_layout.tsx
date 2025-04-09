import { Tabs } from 'expo-router';
import { Home, ChartPie as PieChart, Wallet, Settings, Banknote } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        paddingBottom: 8,
        paddingTop: 8,
        height: 65,
      },
      tabBarActiveTintColor: '#0891b2',
      tabBarInactiveTintColor: '#64748b',
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ size, color }) => <PieChart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="savings"
        options={{
          title: 'Savings',
          tabBarIcon: ({ size, color }) => <Wallet size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => <Settings size={size} color={color} />,
        }}
      />
       <Tabs.Screen
        name="bank"
        options={{
          title: 'Accounts',
          tabBarIcon: ({ size, color }) => <Banknote size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}