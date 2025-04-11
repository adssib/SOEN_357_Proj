import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Modal } from 'react-native';
import { ArrowUpRight, TrendingUp, DollarSign, Coins, Lightbulb } from 'lucide-react-native';

const financeTips = [
  "If you can't buy it twice, don't buy it.",
  "Track your expenses daily to find savings.",
  "Automate your savings to stay consistent.",
  "Avoid lifestyle inflation — save your raises.",
  "Pay yourself first — save before you spend.",
  "Invest early, even in small amounts.",
  "Build an emergency fund of at least 3 months.",
  "Impulse spending? Wait 24 hours.",
  "Use the 50/30/20 budgeting rule.",
  "Cut subscriptions you rarely use.",
  "Budget for fun — balance is key.",
  "Don’t chase trends — invest consistently.",
  "Buy needs, wait on wants.",
  "Round up purchases to save passively.",
  "Know your credit score and monitor it.",
  "Use cash envelopes for stricter budgeting.",
  "Cancel one unused subscription today.",
  "Check your bank app weekly.",
  "Try no-spend challenges monthly.",
  "Always compare before big purchases.",
  "Plan meals to cut food waste.",
  "Refinance loans for better rates.",
  "Use windfalls wisely — don’t splurge it all.",
  "Track net worth over time.",
  "Start investing with your first paycheck.",
  "Negotiate bills and ask for discounts.",
  "Avoid ATM fees — use in-network.",
  "Keep emergency fund separate from checking.",
  "Live below your means.",
  "Read one financial book a year.",
];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState('');

  const showRandomTip = () => {
    const randomTip = financeTips[Math.floor(Math.random() * financeTips.length)];
    setCurrentTip(randomTip);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>Alex</Text>
        </View>
        <Pressable style={styles.tipButton} onPress={showRandomTip}>
          <Lightbulb size={22} color="#f59e0b" />
        </Pressable>
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

      {/* Tooltip Modal */}
      <Modal transparent animationType="fade" visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Lightbulb size={24} color="#f59e0b" />
            <Text style={styles.tipText}>{currentTip}</Text>
            <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Got it</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  tipButton: {
    backgroundColor: '#fef9c3',
    padding: 10,
    borderRadius: 20,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalBox: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '90%',
  },
  tipText: {
    fontSize: 16,
    color: '#0f172a',
    textAlign: 'center',
    marginVertical: 16,
  },
  modalButton: {
    backgroundColor: '#0891b2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});
