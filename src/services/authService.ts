const DEMO_USER_KEY = 'unipedia_demo_session_v1';

export interface DemoUser {
  id: string;
  name: string;
  emailOrIdentifier: string;
  provider: 'local_guest' | 'telegram_demo' | 'vk_demo' | 'yandex_demo';
  createdAt: string;
}

type AuthListener = (user: DemoUser | null) => void;

class AuthService {
  private currentUser: DemoUser | null = null;
  private listeners: Set<AuthListener> = new Set();
  private isInitialized: boolean = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = window.localStorage.getItem(DEMO_USER_KEY);
        if (stored) {
          this.currentUser = JSON.parse(stored);
        }
      } catch (e) {
        console.warn('[AuthService] Failed to load demo session:', e);
      }
    }
  }

  public getCurrentUser(): DemoUser | null {
    return this.currentUser;
  }

  public loginLocalDemo(name: string, emailOrIdentifier: string, provider: DemoUser['provider'] = 'local_guest'): DemoUser {
    const user: DemoUser = {
      id: `usr-demo-${Date.now()}`,
      name: name.trim() || 'Гость лаборатории',
      emailOrIdentifier: emailOrIdentifier.trim() || 'demo@unipedia-lab.local',
      provider,
      createdAt: new Date().toISOString()
    };

    this.currentUser = user;
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
      } catch {}
    }
    this.emit();
    return user;
  }

  public logout(): void {
    this.currentUser = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(DEMO_USER_KEY);
      } catch {}
    }
    this.emit();
  }

  private emit() {
    this.listeners.forEach(l => l(this.currentUser));
  }

  public subscribe(listener: AuthListener): () => void {
    this.listeners.add(listener);
    listener(this.currentUser);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const authService = new AuthService();
