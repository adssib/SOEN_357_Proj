import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ChartPie as PieChartIcon, ShoppingBag, Coffee, Car, Chrome as Home, Utensils } from 'lucide-react-native';

const categories = [
  { name: 'Shopping', icon: ShoppingBag, color: '#0891b2', amount: 450.80 },
  { name: 'Coffee', icon: Coffee, color: '#8b5cf6', amount: 85.20 },
  { name: 'Transport', icon: Car, color: '#f59e0b', amount: 120.50 },
  { name: 'Housing', icon: Home, color: '#10b981', amount: 1200.00 },
  { name: 'Food', icon: Utensils, color: '#ef4444', amount: 380.30 },
];

export default function ExpensesScreen() {
  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Monthly Expenses</Text>
        <Text style={styles.subtitle}>April 2025</Text>
      </View>

      <View style={styles.totalCard}>
        <View style={styles.totalHeader}>
          <PieChartIcon size={24} color="#0f172a" />
          <Text style={styles.totalTitle}>Total Spent</Text>
        </View>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </View>

      <View style={styles.categories}>
        <Text style={styles.categoriesTitle}>Spending by Category</Text>
        {categories.map((category, index) => {
          const Icon = category.icon;
          const percentage = ((category.amount / total) * 100).toFixed(1);
          
          return (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.categoryLeft}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <Icon size={20} color={category.color} />
                </View>
                <View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryPercentage}>{percentage}%</Text>
                </View>
              </View>
              <Text style={styles.categoryAmount}>${category.amount.toFixed(2)}</Text>
            </View>
          );
        })}
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
  totalCard: {
    margin: 24,
    padding: 24,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
  },
  totalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalTitle: {
    fontSize: 16,
    color: '#0f172a',
    marginLeft: 8,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0f172a',
  },
  categories: {
    padding: 24,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 4,
  },
  categoryPercentage: {
    fontSize: 14,
    color: '#64748b',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
});