import { useState, useEffect, useCallback } from 'react';

export interface WebhookData {
  id: string;
  timestamp: Date;
  data: any;
}

// Global webhook data store
let webhookDataStore: WebhookData[] = [];
let listeners: ((data: WebhookData) => void)[] = [];

// Function to add webhook data (call this when webhook data is received)
export const addWebhookData = (data: any) => {
  const webhookData: WebhookData = {
    id: Date.now().toString(),
    timestamp: new Date(),
    data: data
  };
  
  webhookDataStore.push(webhookData);
  
  // Notify all listeners
  listeners.forEach(listener => listener(webhookData));
};

// Hook to listen for webhook data
export const useWebhookData = () => {
  const [webhookData, setWebhookData] = useState<WebhookData[]>(webhookDataStore);

  const handleNewWebhookData = useCallback((newData: WebhookData) => {
    setWebhookData(prev => [...prev, newData]);
  }, []);

  useEffect(() => {
    listeners.push(handleNewWebhookData);
    
    return () => {
      listeners = listeners.filter(listener => listener !== handleNewWebhookData);
    };
  }, [handleNewWebhookData]);

  return webhookData;
};

// Expose globally for manual integration
(window as any).addWebhookData = addWebhookData;