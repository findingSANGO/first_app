import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { Text, Surface, Button, Card, Chip, Portal, Dialog } from 'react-native-paper';
import axios from 'axios';

interface Request {
  id: string;
  type: 'second_entry' | 'out_pass';
  reason: string;
  date: string;
  time: string;
  duration?: string;
  status: 'pending' | 'approved' | 'rejected';
  employeeName: string;
  employeeId: string;
}

export const ApprovalScreen = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/requests/pending');
      setRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId: string) => {
    try {
      await axios.post(`http://localhost:3000/api/requests/${requestId}/approve`);
      setRequests(requests.filter(req => req.id !== requestId));
      setDialogVisible(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error('Failed to approve request:', error);
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await axios.post(`http://localhost:3000/api/requests/${requestId}/reject`);
      setRequests(requests.filter(req => req.id !== requestId));
      setDialogVisible(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchRequests().finally(() => setRefreshing(false));
  }, []);

  const showDialog = (request: Request) => {
    setSelectedRequest(request);
    setDialogVisible(true);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Surface style={styles.surface}>
        <Text variant="headlineSmall" style={styles.title}>
          Pending Approvals
        </Text>

        {requests.length === 0 ? (
          <Text style={styles.emptyText}>No pending requests</Text>
        ) : (
          requests.map(request => (
            <Card
              key={request.id}
              style={styles.card}
              onPress={() => showDialog(request)}
            >
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text variant="titleMedium">{request.employeeName}</Text>
                  <Chip
                    mode="outlined"
                    style={styles.typeChip}
                  >
                    {request.type === 'second_entry' ? 'Second Entry' : 'Out Pass'}
                  </Chip>
                </View>

                <Text style={styles.reason}>{request.reason}</Text>

                <View style={styles.details}>
                  <Text>Date: {new Date(request.date).toLocaleDateString()}</Text>
                  <Text>Time: {new Date(request.time).toLocaleTimeString()}</Text>
                  {request.duration && (
                    <Text>Duration: {request.duration} hours</Text>
                  )}
                </View>
              </Card.Content>
            </Card>
          ))
        )}

        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}
          >
            <Dialog.Title>Review Request</Dialog.Title>
            <Dialog.Content>
              {selectedRequest && (
                <>
                  <Text variant="bodyLarge">Employee: {selectedRequest.employeeName}</Text>
                  <Text variant="bodyMedium" style={styles.dialogReason}>
                    {selectedRequest.reason}
                  </Text>
                  <Text variant="bodyMedium">
                    Date: {new Date(selectedRequest.date).toLocaleDateString()}
                  </Text>
                  <Text variant="bodyMedium">
                    Time: {new Date(selectedRequest.time).toLocaleTimeString()}
                  </Text>
                  {selectedRequest.duration && (
                    <Text variant="bodyMedium">
                      Duration: {selectedRequest.duration} hours
                    </Text>
                  )}
                </>
              )}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
              <Button
                onPress={() => selectedRequest && handleReject(selectedRequest.id)}
                textColor="#B00020"
              >
                Reject
              </Button>
              <Button
                mode="contained"
                onPress={() => selectedRequest && handleApprove(selectedRequest.id)}
              >
                Approve
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    margin: 16,
    padding: 16,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
  },
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeChip: {
    backgroundColor: 'transparent',
  },
  reason: {
    marginBottom: 12,
    color: '#666',
  },
  details: {
    gap: 4,
  },
  dialogReason: {
    marginVertical: 16,
    color: '#666',
  },
}); 