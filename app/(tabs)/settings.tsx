import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { User, Bell, Lock, CreditCard, CircleHelp as HelpCircle, ChevronRight, LogOut } from 'lucide-react-native';

const menuItems = [
  { icon: User, title: 'Account', subtitle: 'Personal information' },
  { icon: Bell, title: 'Notifications', subtitle: 'Customize alerts' },
  { icon: Lock, title: 'Security', subtitle: 'Password & authentication' },
  { icon: CreditCard, title: 'Linked Accounts', subtitle: 'Manage your bank accounts' },
  { icon: HelpCircle, title: 'Help & Support', subtitle: 'FAQs and contact' },
];

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Alex Johnson</Text>
          <Text style={styles.profileEmail}>alex@example.com</Text>
        </View>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Pressable key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuItemIcon}>
                  <Icon size={20} color="#0891b2" />
                </View>
                <View>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#64748b" />
            </Pressable>
          );
        })}
      </View>

      <Pressable style={styles.logoutButton}>
        <LogOut size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
    marginHorizontal: 24,
    borderRadius: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0891b2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748b',
  },
  menu: {
    padding: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    padding: 10,
    backgroundColor: '#e0f2fe',
    borderRadius: 12,
    marginRight: 12,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 24,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  version: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 32,
    fontSize: 14,
    color: '#64748b',
  },
});