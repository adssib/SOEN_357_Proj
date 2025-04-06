import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Coins, ArrowUpRight, TrendingUp, PiggyBank } from 'lucide-react-native';

export default function SavingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Round-up Savings</Text>
        <Text style={styles.subtitle}>Your spare change, invested</Text>
      </View>

      <View style={styles.savingsCard}>
        <View style={styles.savingsHeader}>
          <PiggyBank size={24} color="#0f172a" />
          <Text style={styles.savingsTitle}>Total Saved</Text>
        </View>
        <Text style={styles.savingsAmount}>$328.45</Text>
        <View style={styles.trend}>
          <TrendingUp size={16} color="#16a34a" />
          <Text style={styles.trendText}>+$45.20 this month</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Round-ups</Text>
          <ArrowUpRight size={20} color="#64748b" />
        </View>
        {[
          { title: 'Coffee Shop', amount: 0.75, date: 'Today, 9:30 AM' },
          { title: 'Grocery Store', amount: 0.40, date: 'Yesterday, 2:15 PM' },
          { title: 'Gas Station', amount: 0.85, date: 'Apr 15, 4:20 PM' },
        ].map((item, index) => (
          <View key={index} style={styles.roundup}>
            <View style={styles.roundupLeft}>
              <View style={styles.roundupIcon}>
                <Coins size={20} color="#0891b2" />
              </View>
              <View>
                <Text style={styles.roundupTitle}>{item.title}</Text>
                <Text style={styles.roundupDate}>{item.date}</Text>
              </View>
            </View>
            <Text style={styles.roundupAmount}>+${item.amount.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <Pressable style={styles.investButton}>
        <Text style={styles.investButtonText}>View Investment Portfolio</Text>
      </Pressable>
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
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  savingsCard: {
    margin: 24,
    padding: 24,
    backgroundColor: '#f0fdf4',
    borderRadius: 16,
  },
  savingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  savingsTitle: {
    fontSize: 16,
    color: '#0f172a',
    marginLeft: 8,
  },
  savingsAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0f172a',
  },
  trend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  trendText: {
    marginLeft: 4,
    color: '#16a34a',
    fontSize: 14,
  },
  section: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  roundup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  roundupLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roundupIcon: {
    padding: 10,
    backgroundColor: '#e0f2fe',
    borderRadius: 12,
    marginRight: 12,
  },
  roundupTitle: {
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 4,
  },
  roundupDate: {
    fontSize: 14,
    color: '#64748b',
  },
  roundupAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#16a34a',
  },
  investButton: {
    margin: 24,
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  investButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});