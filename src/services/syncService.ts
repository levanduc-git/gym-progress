// ==========================================
// CLOUD SYNC & SUPABASE ADAPTER ABSTRACTION
// ==========================================

export interface SyncStatus {
  isOnline: boolean;
  lastSyncedAt: string | null;
  pendingChangesCount: number;
  syncInProgress: boolean;
  error: string | null;
}

class SyncService {
  private status: SyncStatus = {
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    lastSyncedAt: localStorage.getItem('gym_progress_last_synced_at') || null,
    pendingChangesCount: 0,
    syncInProgress: false,
    error: null,
  };

  private listeners: ((status: SyncStatus) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.status.isOnline = true;
        this.notify();
        this.syncWithCloud();
      });
      window.addEventListener('offline', () => {
        this.status.isOnline = false;
        this.notify();
      });
    }
  }

  public getStatus(): SyncStatus {
    return { ...this.status };
  }

  public subscribe(listener: (status: SyncStatus) => void): () => void {
    this.listeners.push(listener);
    listener(this.getStatus());
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l(this.getStatus()));
  }

  // Simulated Supabase Sync
  public async syncWithCloud(): Promise<boolean> {
    if (!this.status.isOnline || this.status.syncInProgress) return false;

    this.status.syncInProgress = true;
    this.status.error = null;
    this.notify();

    try {
      // Simulate remote network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const now = new Date().toISOString();
      this.status.lastSyncedAt = now;
      this.status.pendingChangesCount = 0;
      this.status.syncInProgress = false;
      localStorage.setItem('gym_progress_last_synced_at', now);
      this.notify();
      return true;
    } catch (err: unknown) {
      this.status.syncInProgress = false;
      this.status.error = err instanceof Error ? err.message : 'Sync failed';
      this.notify();
      return false;
    }
  }
}

export const syncService = new SyncService();
