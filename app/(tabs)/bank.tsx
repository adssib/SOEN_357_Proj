import { View, Text, StyleSheet, FlatList, Pressable, Alert, TextInput, Modal } from 'react-native';
import { useState } from 'react';

type BankAccount = {
  id: string;
  name: string;
  balance: number;
};

export default function BankAccountsScreen() {
  const [accounts, setAccounts] = useState<BankAccount[]>([

  ]);

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
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.accountCard}>
            <Text style={styles.accountName}>{item.name}</Text>
            <Text style={styles.accountBalance}>${item.balance.toFixed(2)}</Text>
          </View>
        )}
        style={styles.list}
      />
      <Pressable style={styles.linkButton} onPress={() => setModalVisible(true)}>
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
              <Pressable style={styles.modalButton} onPress={handleAddAccount}>
                <Text style={styles.modalButtonText}>Add</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, { backgroundColor: '#e5e7eb' }]} onPress={() => setModalVisible(false)}>
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
});
