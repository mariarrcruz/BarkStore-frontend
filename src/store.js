import React, { createContext, useContext, useState } from 'react';
import { createNavigationContainerRef } from '@react-navigation/native';
import { products, initialUser, initialPets, initialPlans, initialAddresses, initialCards, initialOrders } from './data';
import { fmtDate } from './theme';

export const navigationRef = createNavigationContainerRef();
const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

export function StoreProvider({ children }) {
  const [user, setUser] = useState(initialUser);
  const [cart, setCart] = useState([]);
  const [pets, setPets] = useState(initialPets);
  const [plans, setPlans] = useState(initialPlans);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [cards, setCards] = useState(initialCards);
  const [lastOrder, setLastOrder] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState(initialOrders);
  const toggleFavorite = (id) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const addToCart = (p, qty = 1) =>
    setCart((c) => (c.find((x) => x.id === p.id)
      ? c.map((x) => (x.id === p.id ? { ...x, qty: x.qty + qty } : x))
      : [...c, { id: p.id, qty }]));
  const changeQty = (id, d) => setCart((c) => c.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + d) } : x)));
  const removeItem = (id) => setCart((c) => c.filter((x) => x.id !== id));

  const cartItems = cart.map((i) => ({ ...products.find((p) => p.id === i.id), qty: i.qty }));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const placeOrder = () => {
    const n = Math.floor(100000 + Math.random() * 900000);
    const date = new Date();
    const items = cartItems.map((i) => ({ name: i.name, qty: i.qty, price: i.price }));
    setLastOrder({ id: `BS${n}`, date, total: subtotal });
    setOrders((o) => [{ id: `BS${n}`, date: fmtDate(date), status: 'Em preparo', total: subtotal, items }, ...o]);
    setCart([]);
  };

  const nextId = (arr) => Math.max(0, ...arr.map((x) => x.id)) + 1;
  const value = {
    user, setUser, orders, favorites, toggleFavorite, cartItems, cartCount, subtotal, addToCart, changeQty, removeItem, placeOrder, lastOrder,
    pets, addPet: (p) => setPets((a) => [...a, { ...p, id: nextId(a) }]),
    plans, addPlan: (p) => setPlans((a) => [...a, { ...p, id: nextId(a) }]),
    updatePlan: (id, patch) => setPlans((a) => a.map((p) => (p.id === id ? { ...p, ...patch } : p))),
    deletePlan: (id) => setPlans((a) => a.filter((p) => p.id !== id)),
    addresses, addAddress: (x) => setAddresses((a) => [...a, { ...x, id: nextId(a) }]),
    cards, addCard: (x) => setCards((a) => [...a, { ...x, id: nextId(a) }]),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}