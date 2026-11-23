export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const norm = (v) => String(v).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();