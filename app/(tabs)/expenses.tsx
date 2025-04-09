import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { 
  ChartPie as PieChartIcon, 
  ShoppingBag, 
  Coffee, 
  Car, 
  Chrome as Home, 
  Utensils,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowUpDown,
  Filter,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

// Adding budget limits, trends and more data for each category
const categories = [
  { 
    name: 'Shopping', 
    icon: ShoppingBag, 
    color: '#0891b2', 
    amount: 450.80, 
    budgetLimit: 500,
    trend: 'up',
    transactions: [
      { date: '2025-04-05', amount: 125.30, merchant: 'Amazon' },
      { date: '2025-04-12', amount: 89.99, merchant: 'Target' },
      { date: '2025-04-18', amount: 235.51, merchant: 'Best Buy' }
    ]
  },
  { 
    name: 'Coffee', 
    icon: Coffee, 
    color: '#8b5cf6', 
    amount: 85.20, 
    budgetLimit: 100,
    trend: 'down',
    transactions: [
      { date: '2025-04-02', amount: 4.50, merchant: 'Starbucks' },
      { date: '2025-04-07', amount: 6.75, merchant: 'Peet\'s Coffee' },
      { date: '2025-04-10', amount: 5.25, merchant: 'Starbucks' },
      { date: '2025-04-15', amount: 5.50, merchant: 'Local Cafe' },
      { date: '2025-04-19', amount: 4.75, merchant: 'Starbucks' }
    ]
  },
  { 
    name: 'Transport', 
    icon: Car, 
    color: '#f59e0b', 
    amount: 120.50, 
    budgetLimit: 150,
    trend: 'down',
    transactions: [
      { date: '2025-04-01', amount: 45.00, merchant: 'Gas Station' },
      { date: '2025-04-13', amount: 55.50, merchant: 'Gas Station' },
      { date: '2025-04-15', amount: 20.00, merchant: 'Parking' }
    ]
  },
  { 
    name: 'Housing', 
    icon: Home, 
    color: '#10b981', 
    amount: 1200.00, 
    budgetLimit: 1300,
    trend: 'same',
    transactions: [
      { date: '2025-04-01', amount: 1200.00, merchant: 'Rent' }
    ]
  },
  { 
    name: 'Food', 
    icon: Utensils, 
    color: '#ef4444', 
    amount: 380.30, 
    budgetLimit: 400,
    trend: 'up',
    transactions: [
      { date: '2025-04-03', amount: 85.45, merchant: 'Grocery Store' },
      { date: '2025-04-09', amount: 45.60, merchant: 'Restaurant' },
      { date: '2025-04-14', amount: 105.20, merchant: 'Grocery Store' },
      { date: '2025-04-17', amount: 58.90, merchant: 'Restaurant' },
      { date: '2025-04-22', amount: 85.15, merchant: 'Grocery Store' }
    ]
  },
];

export default function ExpensesScreen() {
  const [activeFilter, setActiveFilter] = useState<'week' | 'month' | 'year'>('month');
  const [sortBy, setSortBy] = useState<'amount' | 'name' | 'percentage'>('amount');
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  
  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budgetLimit, 0);
  const remainingBudget = totalBudget - total;
  const daysLeftInMonth = 21; // Example - would calculate based on current date
  const dailyBudgetRemaining = (remainingBudget / daysLeftInMonth).toFixed(2);
  
  // Find most expensive category
  const mostExpensiveCategory = [...categories].sort((a, b) => b.amount - a.amount)[0];
  
  // Sort categories based on selection
  const sortedCategories = [...categories].sort((a, b) => {
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'percentage') {
      const percentA = a.amount / a.budgetLimit;
      const percentB = b.amount / b.budgetLimit;
      return percentB - percentA;
    }
    return 0;
  });

  const toggleCategoryExpand = (index: number): void => {
    if (expandedCategory === index) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(index);
    }
  };

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
        
        {/* Summary Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.summaryCardsContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>Total Spent</Text>
            <Text style={styles.summaryCardValue}>${total.toFixed(2)}</Text>
            <Text style={styles.summaryCardSubtitle}>of ${totalBudget.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>Highest Expense</Text>
            <Text style={styles.summaryCardValue}>{mostExpensiveCategory.name}</Text>
            <Text style={styles.summaryCardSubtitle}>${mostExpensiveCategory.amount.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>Days Left</Text>
            <Text style={styles.summaryCardValue}>{daysLeftInMonth}</Text>
            <Text style={styles.summaryCardSubtitle}>in April</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>Daily Budget</Text>
            <Text style={styles.summaryCardValue}>${dailyBudgetRemaining}</Text>
            <Text style={styles.summaryCardSubtitle}>remaining/day</Text>
          </View>
        </ScrollView>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <View style={styles.filterTabs}>
            <TouchableOpacity 
              style={[styles.filterTab, activeFilter === 'week' && styles.activeFilterTab]}
              onPress={() => setActiveFilter('week')}
            >
              <Text style={[styles.filterTabText, activeFilter === 'week' && styles.activeFilterTabText]}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterTab, activeFilter === 'month' && styles.activeFilterTab]}
              onPress={() => setActiveFilter('month')}
            >
              <Text style={[styles.filterTabText, activeFilter === 'month' && styles.activeFilterTabText]}>Month</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterTab, activeFilter === 'year' && styles.activeFilterTab]}
              onPress={() => setActiveFilter('year')}
            >
              <Text style={[styles.filterTabText, activeFilter === 'year' && styles.activeFilterTabText]}>Year</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.sortButton}>
            <ArrowUpDown size={16} color="#64748b" />
            <Text style={styles.sortButtonText}>Sort</Text>
          </TouchableOpacity>
        </View>

        {/* Total Card with Budget Progress */}
        <View style={styles.totalCard}>
          <View style={styles.totalHeader}>
            <PieChartIcon size={24} color="#0f172a" />
            <Text style={styles.totalTitle}>Budget Overview</Text>
          </View>
          <View style={styles.budgetProgressContainer}>
            <View style={styles.budgetProgress}>
              <View 
                style={[
                  styles.budgetProgressFill, 
                  { width: `${Math.min((total / totalBudget) * 100, 100)}%` }
                ]}
              />
            </View>
            <View style={styles.budgetLabels}>
              <Text style={styles.budgetLabel}>${total.toFixed(2)} spent</Text>
              <Text style={styles.budgetLabel}>${remainingBudget.toFixed(2)} left</Text>
            </View>
          </View>
          <View style={styles.savingsContainer}>
            <Text style={styles.savingsTitle}>Monthly Savings Goal</Text>
            <View style={styles.savingsProgressOuter}>
              <View style={[styles.savingsProgressInner, { width: '65%' }]} />
            </View>
            <Text style={styles.savingsAmount}>$325 of $500</Text>
          </View>
        </View>
{/* 
        <View style={styles.pieChartContainer}>
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
          <View style={styles.categoriesHeader}>
            <Text style={styles.categoriesTitle}>Spending by Category</Text>
            <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
              <Filter size={16} color="#64748b" />
            </TouchableOpacity>
          </View>
          
          {sortedCategories.map((category, index) => {
            const Icon = category.icon;
            const percentage = total > 0 ? ((category.amount / total) * 100).toFixed(1) : 0;
            
            // Calculate percentage of budget used 
            const budgetPercentage = category.budgetLimit > 0 ? 
              (category.amount / category.budgetLimit) * 100 : 0;
            
            // Progress bar width based on actual percentage of budget used (capped at 100%)
            const progressWidth = Math.min(budgetPercentage, 100);
            
            // Determine if this is high spending (over 90% of budget)
            const isHighSpending = budgetPercentage > 90;
            
            const isExpanded = expandedCategory === index;
          return( 
            <View key={index} style={styles.categoryItem}>
              <TouchableOpacity 
                style={styles.categoryItemHeader}
                onPress={() => toggleCategoryExpand(index)}
              >
                <View style={styles.categoryLeft}>
                  <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                    <Icon size={20} color={category.color} />
                  </View>
                  <View style={styles.categoryTextContainer}>
                    <View style={styles.categoryNameRow}>
                      <Text style={styles.categoryName}>{category.name}</Text>
                      {category.trend === 'up' && <TrendingUp size={16} color="#ef4444" style={styles.trendIcon} />}
                      {category.trend === 'down' && <TrendingDown size={16} color="#10b981" style={styles.trendIcon} />}
                    </View>
                    <Text style={styles.categoryPercentage}>{percentage}% of total</Text>
                  </View>
                </View>
                
                <View style={styles.categoryRight}>
                  {/* Removed categoryAmount and budgetLimit from this section */}
                  {isExpanded ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
                </View>
              </TouchableOpacity>

              <View style={styles.progressBar}>
                <View
                  style={[styles.progress, {
                    width: `${progressWidth}%`,
                    backgroundColor: isHighSpending ? '#ef4444' : category.color,
                  }]}
                />
              </View>

              {budgetPercentage > 100 && (
                <View style={styles.warningContainer}>
                  <AlertCircle size={14} color="#ef4444" />
                  <Text style={styles.highSpendText}>Over Budget!</Text>
                </View>
              )}
              {budgetPercentage > 90 && budgetPercentage <= 100 && (
                <View style={styles.warningContainer}>
                  <AlertCircle size={14} color="#f59e0b" />
                  <Text style={styles.warningText}>Approaching Limit!</Text>
                </View>
              )}

            {/* Expanded transactions list */}
            {isExpanded && (
              <View style={styles.transactionsContainer}>
                <Text style={styles.transactionsTitle}>Recent Transactions</Text>
                {category.transactions.map((transaction, tIndex) => (
                  <View key={tIndex} style={styles.transactionItem}>
                    <View>
                      <Text style={styles.transactionMerchant}>{transaction.merchant}</Text>
                      <Text style={styles.transactionDate}>{transaction.date}</Text>
                    </View>
                    <Text style={styles.transactionAmount}>${transaction.amount.toFixed(2)}</Text>
                  </View>
                ))}
                
              {/* Display categoryAmount and budgetLimit only when expanded */}
              <View style={styles.budgetInfoContainer}>
                <Text style={styles.categoryAmount}>${category.amount.toFixed(2)}</Text>
                <Text style={styles.budgetLimit}>/ ${category.budgetLimit.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllButtonText}>View All Transactions</Text>
              </TouchableOpacity>
           </View>
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
    marginBottom: 16,
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
  summaryCardsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryCardTitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  summaryCardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  summaryCardSubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 2,
  },
  filterTab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  activeFilterTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  filterTabText: {
    fontSize: 14,
    color: '#64748b',
  },
  activeFilterTabText: {
    color: '#0f172a',
    fontWeight: '500',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  sortButtonText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  totalCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 24,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  totalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 8,
  },
  budgetProgressContainer: {
    marginBottom: 24,
  },
  budgetProgress: {
    height: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 6,
    marginBottom: 8,
  },
  budgetProgressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 6,
  },
  budgetLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  budgetLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  savingsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  savingsTitle: {
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 12,
  },
  savingsProgressOuter: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginBottom: 8,
  },
  savingsProgressInner: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 4,
  },
  savingsAmount: {
    fontSize: 14,
    color: '#64748b',
    alignSelf: 'flex-end',
  },
  pieChartContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  categories: {
    paddingHorizontal: 24,
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  filterButton: {
    padding: 4,
  },
  categoryItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  categoryItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
    paddingHorizontal: 10, // Add horizontal padding for space
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Ensure it aligns to the right and doesn't get cut off
    width: 120, // Give enough space for the numbers
  },
  categoryTextContainer: {
    flex: 1,
  },
  categoryNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensure it aligns properly and doesn't cut off
  },
  categoryIcon: {
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 40, // Make sure it doesn't get cut off if the space is tight
  },
  categoryName: {
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 4,
  },
  trendIcon: {
    marginLeft: 6,
  },
  categoryPercentage: {
    fontSize: 14,
    color: '#64748b',
  },
  budgetInfoContainer: {
    flexDirection: 'row',        // Ensures items are aligned horizontally
    alignItems: 'center',        // Vertically aligns items in the center
    justifyContent: 'flex-end',  // Ensures the items are aligned to the right
    flex: 1,                     // Ensures it takes available space
  },

  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginRight: 30, 
    marginTop: 10,
    // Adjusted margin for spacing between amount and budget limit
  },
  budgetLimit: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    width: '100%',
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  highSpendText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  warningText: {
    color: '#f59e0b',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  transactionsContainer: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    paddingBottom: 24, // Extra padding at the bottom for better spacing
  },
  transactionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  transactionMerchant: {
    fontSize: 14,
    color: '#0f172a',
  },
  transactionDate: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  viewAllButton: {
    marginTop: 16,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  viewAllButtonText: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '500',
  },
});