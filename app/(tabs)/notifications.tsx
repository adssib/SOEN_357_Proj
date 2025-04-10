import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Bell } from 'lucide-react-native';

const notifications = [
  {
    id: '1',
    title: 'Payment Received',
    message: 'You have received $200 from Alex.',
    time: 'Today • 10:30 AM',
    type: 'success',
  },
  {
    id: '2',
    title: 'Subscription Due',
    message: 'Your Netflix subscription will renew tomorrow.',
    time: 'Yesterday • 5:20 PM',
    type: 'reminder',
  },
  {
    id: '3',
    title: 'Offer Alert',
    message: 'Get 10% cashback on your next purchase.',
    time: '2 days ago • 11:15 AM',
    type: 'offer',
  },
];

export default function NotificationPage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconWrapper}>
              <Bell size={20} color="#0f172a" />
            </View>
            <View style={styles.textContent}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationMessage}>{item.message}</Text>
              <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
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
      paddingBottom: 12,
    },
    pageTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: '#0f172a',
    },
    listContent: {
      paddingHorizontal: 24,
      paddingBottom: 24,
    },
    card: {
      flexDirection: 'row',
      padding: 16,
      backgroundColor: '#f8fafc',
      borderRadius: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#e2e8f0',
      alignItems: 'center',
    },
    iconWrapper: {
      padding: 12,
      backgroundColor: '#e2e8f0',
      borderRadius: 12,
      marginRight: 16,
    },
    textContent: {
      flex: 1,
    },
    notificationTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#0f172a',
      marginBottom: 4,
    },
    notificationMessage: {
      fontSize: 14,
      color: '#64748b',
      marginBottom: 4,
    },
    notificationTime: {
      fontSize: 12,
      color: '#94a3b8',
    },
  });
  