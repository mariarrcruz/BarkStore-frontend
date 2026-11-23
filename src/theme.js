import { Platform } from 'react-native';

export const colors = {
  primary: '#2563EB',
  accent: '#F59E0B',
  bg: '#DBE8FB',
  card: '#FFFFFF',
  input: '#F7F9FC',
  border: '#CBD5E1',
  text: '#1E293B',
  muted: '#64748B',
  danger: '#EF4444',
  success: '#22C55E',
  tint: '#DBEAFE',
};

export const fonts = { h1: 28, h2: 22, h3: 18, subtitle: 16, body: 14, caption: 12 };
export const radius = { sm: 12, md: 16, lg: 20 };

export const shadow = Platform.select({
  ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  android: { elevation: 3 },
  default: { boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' },
});

export const money = (n) => `R$ ${n.toFixed(2).replace('.', ',')}`;

export const fmtDate = (d) => {
  const p = (x) => String(x).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
};
export const addDays = (days) => { const d = new Date(); d.setDate(d.getDate() + days); return d; };