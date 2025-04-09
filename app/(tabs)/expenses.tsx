import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ChartPie as PieChartIcon, ShoppingBag, Coffee, Car, Chrome as Home, Utensils } from 'lucide-react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

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
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 100,
        paddingTop: 60,
      }}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: '#fff' }}
    >
      <View style={{ paddingHorizontal: 24 }}>
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

      <View style={{ marginHorizontal: 24, marginBottom: 24 }}>
        <PieChart
          data={categories.map(cat => ({
            name: cat.name,
            population: cat.amount,
            color: cat.color,
            legendFontColor: '#334155',
            legendFontSize: 14,
          }))}
          width={screenWidth - 48}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(15, 23, 42, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          hasLegend={true}
        />
      </View>

      <View style={styles.categories}>
        <Text style={styles.categoriesTitle}>Spending by Category</Text>
        {categories.map((category, index) => {
          const Icon = category.icon;
          const percentage = total > 0 ? ((category.amount / total) * 100).toFixed(1) : 0; // Prevent division by zero
          // Ensure percentage is a number by parsing it, if it's a string.
          const numericPercentage = typeof percentage === 'string' ? parseFloat(percentage.replace('%', '')) : percentage;

          // Now use numericPercentage for comparison.
          const progressWidth = numericPercentage > 100 ? 100 : numericPercentage;
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
              <View style={styles.progressBar}>

              <View
                style={[
                  styles.progress,
                  {
                    width: progressWidth, // Use the number directly for width.
                    backgroundColor: category.color,
                  }
                ]}
              />
              </View>
              {numericPercentage > 50 && (
                <Text style={styles.highSpendText}>Warning: High Spend!</Text>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 24,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  progressBar: {
    height: 8,
    width: '100%',
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    marginTop: 8,
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
  highSpendText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
});
