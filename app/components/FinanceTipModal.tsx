import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { Lightbulb } from 'lucide-react-native';

interface FinanceTipModalProps {
  visible: boolean;
  onClose: () => void;
  tip: string;
}

export default function FinanceTipModal({ visible, onClose, tip }: FinanceTipModalProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Lightbulb size={24} color="#f59e0b" />
          <Text style={styles.tipText}>{tip}</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Got it!</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modal: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  tipText: {
    fontSize: 16,
    color: '#0f172a',
    textAlign: 'center',
    marginVertical: 16,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#0891b2',
    borderRadius: 8,
  },
  closeText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});
