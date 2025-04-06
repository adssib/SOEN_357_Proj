import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { ArrowUpRight, TrendingUp, DollarSign, Coins } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.name}>Alex</Text>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$4,285.00</Text>
        <View style={styles.trend}>
          <TrendingUp size={16} color="#16a34a" />
          <Text style={styles.trendText}>+2.4% from last month</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Pressable style={styles.actionButton}>
          <View style={[styles.actionIcon, { backgroundColor: '#e0f2fe' }]}>
            <DollarSign size={24} color="#0891b2" />
          </View>
          <Text style={styles.actionText}>Add Expense</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <View style={[styles.actionIcon, { backgroundColor: '#f0fdf4' }]}>
            <Coins size={24} color="#16a34a" />
          </View>
          <Text style={styles.actionText}>Round-up Savings</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <ArrowUpRight size={20} color="#64748b" />
        </View>
        {[1, 2, 3].map((_, index) => (
          <View key={index} style={styles.transaction}>
            <View style={styles.transactionLeft}>
              <Text style={styles.transactionTitle}>Grocery Shopping</Text>
              <Text style={styles.transactionDate}>Today, 2:45 PM</Text>
            </View>
            <Text style={styles.transactionAmount}>-$45.90</Text>
          </View>
        ))}
      </View>
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
  greeting: {
    fontSize: 16,
    color: '#64748b',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 4,
  },
  balanceCard: {
    margin: 24,
    padding: 24,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 8,
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
  quickActions: {
    flexDirection: 'row',
    padding: 24,
    gap: 16,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionIcon: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#0f172a',
    textAlign: 'center',
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
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  transactionLeft: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#64748b',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
});