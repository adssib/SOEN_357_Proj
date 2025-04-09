import { View, Text, StyleSheet, FlatList, Pressable, Alert, TextInput, Modal } from 'react-native';
import { useState } from 'react';
import { Banknote } from 'lucide-react-native';

type BankAccount = {
  id: string;
  name: string;
  balance: number;
};

export default function BankAccountsScreen() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newBankName, setNewBankName] = useState('');

  const handleAddAccount = () => {
    if (!newBankName.trim()) {
      Alert.alert('Invalid Input', 'Please enter a bank name.');
      return;
    }

    const newAccount: BankAccount = {
      id: Math.random().toString(),
      name: newBankName.trim(),
      balance: parseFloat((Math.random() * 5000).toFixed(2)),
    };

    setAccounts([...accounts, newAccount]);
    setNewBankName('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Linked Bank Accounts</Text>

      {accounts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No accounts linked yet</Text>
          <Text style={styles.emptySubtitle}>Tap the button below to add one</Text>
        </View>
      ) : (
        <FlatList
          data={accounts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.accountCard}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Banknote size={20} color="#0f172a" style={{ marginRight: 12 }} />
                <View>
                  <Text style={styles.accountName}>{item.name}</Text>
                  <Text style={styles.accountBalance}>${item.balance.toFixed(2)}</Text>
                </View>
              </View>
            </View>
          )}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Pressable
        style={({ pressed }) => [
          styles.linkButton,
          pressed && { opacity: 0.85 },
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.linkButtonText}>+ Link a New Account</Text>
      </Pressable>

      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Bank Account</Text>
            <TextInput
              placeholder="Enter bank name"
              value={newBankName}
              onChangeText={setNewBankName}
              style={styles.input}
            />
            <View style={styles.modalActions}>
              <Pressable
                style={({ pressed }) => [
                  styles.modalButton,
                  pressed && { opacity: 0.9 },
                ]}
                onPress={handleAddAccount}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.modalButton,
                  { backgroundColor: '#e5e7eb' },
                  pressed && { opacity: 0.9 },
                ]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: '#0f172a' }]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  list: {
    marginBottom: 24,
  },
  accountCard: {
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  accountName: {
    fontSize: 16,
    color: '#0f172a',
  },
  accountBalance: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0891b2',
    marginTop: 4,
  },
  linkButton: {
    backgroundColor: '#0891b2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#0891b2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyState: {
    marginVertical: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
});
