import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ChartPie as PieChartIcon, ShoppingBag, Coffee, Car, Chrome as Home, Utensils } from 'lucide-react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

// Adding budget limits for each category
const categories = [
  { name: 'Shopping', icon: ShoppingBag, color: '#0891b2', amount: 450.80, budgetLimit: 500 },
  { name: 'Coffee', icon: Coffee, color: '#8b5cf6', amount: 85.20, budgetLimit: 100 },
  { name: 'Transport', icon: Car, color: '#f59e0b', amount: 120.50, budgetLimit: 150 },
  { name: 'Housing', icon: Home, color: '#10b981', amount: 1200.00, budgetLimit: 1300 },
  { name: 'Food', icon: Utensils, color: '#ef4444', amount: 380.30, budgetLimit: 400 },
];

export default function ExpensesScreen() {
  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
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

        {/* <View style={styles.pieChartContainer}>
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
            center={[10, 0]}
          />
        </View> */}

        <View style={styles.categories}>
          <Text style={styles.categoriesTitle}>Spending by Category</Text>
          {categories.map((category, index) => {
            const Icon = category.icon;
            const percentage = total > 0 ? ((category.amount / total) * 100).toFixed(1) : 0;
            
            // Calculate percentage of budget used - this is what should drive the progress bar
            const budgetPercentage = category.budgetLimit > 0 ? 
              (category.amount / category.budgetLimit) * 100 : 0;
            
            // Progress bar width based on actual percentage of budget used (capped at 100%)
            const progressWidth = Math.min(budgetPercentage, 100);
            
            // Determine if this is high spending (over 90% of budget)
            const isHighSpending = budgetPercentage > 90;

            return (
              <View key={index} style={styles.categoryItem}>
                <View style={styles.categoryLeft}>
                  <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                    <Icon size={20} color={category.color} />
                  </View>
                  <View style={styles.categoryTextContainer}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryPercentage}>{percentage}% of total</Text>
                  </View>
                </View>
                
                <View style={styles.budgetInfoContainer}>
                  <Text style={styles.categoryAmount}>${category.amount.toFixed(2)}</Text>
                  <Text style={styles.budgetLimit}>of ${category.budgetLimit.toFixed(2)}</Text>
                </View>
                
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progress,
                      {
                        width: `${progressWidth}%`,
                        backgroundColor: isHighSpending ? '#ef4444' : category.color,
                      },
                    ]}
                  />
                </View>
                
                {budgetPercentage > 100 && (
                  <Text style={styles.highSpendText}>Over Budget!</Text>
                )}
                {budgetPercentage > 90 && budgetPercentage <= 100 && (
                  <Text style={styles.warningText}>Approaching Limit!</Text>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 24,
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
    marginHorizontal: 24,
    marginBottom: 24,
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
  pieChartContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
    alignItems: 'center',
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
    marginBottom: 8,
    width: '100%',
  },
  categoryTextContainer: {
    flex: 1,
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
  budgetInfoContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignSelf: 'flex-end',
    marginTop: -30,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  budgetLimit: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
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
  warningText: {
    color: '#f59e0b',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
});