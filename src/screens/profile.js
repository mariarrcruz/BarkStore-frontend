import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Header, Card, Button, SmallButton, Input, Select } from '../components';
import { colors, fonts, money } from '../theme';
import { isEmail } from '../utils';
import { states } from '../data';
import { useStore, navigationRef } from '../store';

export function Profile({ navigation }) {
  const { user } = useStore();
  const items = [
    ['🐾', 'Meus pets', () => navigation.navigate('MyPets')],
    ['🔄', 'Meus planos', () => navigation.navigate('Planos')],
    ['🛍️', 'Meus pedidos', () => navigation.navigate('Orders')],
    ['📍', 'Endereços', () => navigation.navigate('Addresses')],
    ['💳', 'Formas de pagamento', () => navigation.navigate('PaymentMethods')],
    ['⚙️', 'Configurações', () => Alert.alert('Configurações', 'Em breve.')],
  ];
  return (
    <Screen>
      <Header showBack navigation={navigation} title="Meu perfil" />
      <Card style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
        <Ionicons name="person-circle-outline" size={80} color={colors.primary} />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: fonts.h3, fontWeight: '800' }}>{user.name}</Text>
          <Text style={{ color: colors.muted }}>{user.email}</Text>
          <SmallButton title="Editar perfil" onPress={() => navigation.navigate('EditProfile')} />
        </View>
      </Card>
      {items.map(([e, t, fn]) => (
        <Card key={t} onPress={fn} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
          <Text style={{ flex: 1, fontWeight: '700', fontSize: fonts.subtitle }}>{e} {t}</Text>
          <Ionicons name="chevron-forward" size={22} color={colors.primary} />
        </Card>
      ))}
      <Button title="Sair da conta" variant="danger" onPress={() => navigationRef.reset({ index: 0, routes: [{ name: 'Login' }] })} />
    </Screen>
  );
}

export function MyPets({ navigation }) {
  const { pets, plans } = useStore();
  return (
    <Screen>
      <Header showBack navigation={navigation} title="Meus Pets" />
      <Button title="+ Adicionar pet" variant="outline" onPress={() => navigation.navigate('AddPet')} style={{ marginVertical: 16, marginHorizontal: 20 }} />
      {pets.map((p) => {
        const has = plans.some((pl) => pl.petId === p.id);
        return (
          <Card key={p.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 68, height: 68, borderRadius: 34, backgroundColor: colors.tint, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 38 }}>{p.emoji}</Text></View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={{ fontWeight: '800', fontSize: fonts.h3 }}>{p.name}</Text>
              <Text style={{ color: colors.muted, fontSize: fonts.subtitle }}>{p.desc}</Text>
              <Text style={{ color: colors.primary, fontWeight: '700' }}>Editar</Text>
              <Text style={{ color: colors.muted, fontSize: 13 }}>Plano: {has ? 'Ração mensal' : 'Sem plano'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} />
          </Card>
        );
      })}
      <Text style={{ textAlign: 'center', color: colors.muted, marginTop: 16 }}>Você pode cadastrar vários pets na sua conta.</Text>
    </Screen>
  );
}

const maskDate = (t) => t.replace(/\D/g, '').slice(0, 8).replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');

export function AddPet({ navigation }) {
  const { addPet } = useStore();
  const [f, setF] = useState({ name: '', type: '', birth: '', weight: '' });
  const set = (k) => (v) => setF({ ...f, [k]: v });
  const save = () => {
    if (!f.name || !f.type) return Alert.alert('Atenção', 'Informe o nome e o tipo do pet.');
    addPet({ name: f.name, type: f.type, emoji: f.type === 'Gato' ? '🐱' : f.type === 'Cão' ? '🐶' : '🐾', desc: `${f.type}${f.weight ? ` • ${f.weight} kg` : ''}` });
    navigation.goBack();
  };
  return (
    <Screen>
      <Header showBack navigation={navigation} title="Cadastrar novo pet" />
      <Input label="Nome do pet" placeholder="Digite o nome do pet" value={f.name} onChangeText={set('name')} />
      <Select label="Tipo de pet" placeholder="Selecione o tipo" value={f.type} options={['Cão', 'Gato', 'Outro']} onChange={set('type')} />
      <Input label="Data de nascimento" icon="calendar-outline" placeholder="dd/mm/aaaa" value={f.birth} onChangeText={(t) => set('birth')(maskDate(t))} keyboardType="numeric" />
      <Input label="Peso" suffix="kg" placeholder="Digite o peso" value={f.weight} onChangeText={set('weight')} keyboardType="numeric" />
      <View style={{ alignItems: 'center', marginVertical: 8 }}>
        <View style={{ width: 110, height: 110, borderRadius: 55, backgroundColor: '#D9D9D9' }} />
        <TouchableOpacity onPress={() => Alert.alert('Foto', 'Integre expo-image-picker para escolher a foto.')}><Text style={{ color: colors.primary, marginTop: 10 }}>Adicionar foto</Text></TouchableOpacity>
      </View>
      <Button title="Salvar pet" variant="secondary" onPress={save} style={{ marginHorizontal: 20 }} />
    </Screen>
  );
}

export function Addresses({ navigation }) {
  const { addresses } = useStore();
  return (
    <Screen>
      <Header showBack navigation={navigation} title="Meus endereços" />
      {addresses.map((a) => (
        <Card key={a.id} style={{ padding: 18 }}>
          <Text style={{ fontWeight: '800', fontSize: fonts.h3 }}>{a.name}</Text>
          <Text style={{ color: colors.primary, fontSize: fonts.subtitle, marginTop: 4 }}>{a.street}, {a.number} - {a.district}</Text>
          <SmallButton title="Editar" onPress={() => Alert.alert('Editar', 'Em breve.')} />
        </Card>
      ))}
      <Button title="+ Adicionar endereço" onPress={() => navigation.navigate('AddAddress')} style={{ marginTop: 20, marginHorizontal: 20 }} />
    </Screen>
  );
}

export function AddAddress({ navigation }) {
  const { addAddress } = useStore();
  const [f, setF] = useState({ name: '', cep: '', street: '', number: '', complement: '', district: '', city: '', state: '' });
  const set = (k) => (v) => setF({ ...f, [k]: v });
  const save = () => {
    if (!f.name || !f.street || !f.number) return Alert.alert('Atenção', 'Preencha nome, rua e número.');
    addAddress(f);
    navigation.goBack();
  };
  return (
    <Screen>
      <Header showBack navigation={navigation} title="Cadastrar endereço" />
      <Input label="Nome do endereço" placeholder="Ex: Casa, Trabalho" value={f.name} onChangeText={set('name')} />
      <Input label="CEP" placeholder="Digite seu CEP" value={f.cep} onChangeText={set('cep')} keyboardType="numeric" />
      <Input label="Rua" placeholder="Digite o nome da rua" value={f.street} onChangeText={set('street')} />
      <Input label="Número" placeholder="Digite o número" value={f.number} onChangeText={set('number')} keyboardType="numeric" />
      <Input label="Complemento" placeholder="Apartamento, bloco, etc." value={f.complement} onChangeText={set('complement')} />
      <Input label="Bairro" placeholder="Digite o bairro" value={f.district} onChangeText={set('district')} />
      <Input label="Cidade" placeholder="Digite a cidade" value={f.city} onChangeText={set('city')} />
      <Select label="Estado" placeholder="Selecione o estado" value={f.state} options={states} onChange={set('state')} />
      <Button title="+ Adicionar endereço" onPress={save} style={{ marginHorizontal: 20 }} />
    </Screen>
  );
}

export function PaymentMethods({ navigation }) {
  const { cards, addCard } = useStore();
  return (
    <Screen>
      <Header showBack navigation={navigation} title="Formas de Pagamento" />
      {cards.map((c) => (
        <Card key={c.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="card-outline" size={32} color={colors.primary} />
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={{ fontWeight: '700', fontSize: fonts.subtitle }}>{c.label}</Text>
            <Text style={{ color: colors.muted, letterSpacing: 1 }}>•••• •••• •••• {c.last4}</Text>
          </View>
          <SmallButton title="Editar" onPress={() => Alert.alert('Editar', 'Em breve.')} />
        </Card>
      ))}
      <Button title="+ Adicionar forma de pagamento" variant="outline" style={{ marginTop: 16, marginHorizontal: 20 }}
        onPress={() => addCard({ label: 'Cartão de crédito', last4: String(1000 + Math.floor(Math.random() * 9000)) })} />
    </Screen>
  );
}

const maskPhone = (t) => t.replace(/\D/g, '').slice(0, 11).replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{1,4})$/, '$1-$2');

export function EditProfile({ navigation }) {
  const { user, setUser } = useStore();
  const [f, setF] = useState({ name: user.name, email: user.email, phone: user.phone || '' });
  const [err, setErr] = useState({});
  const set = (k) => (v) => { setF({ ...f, [k]: v }); setErr({ ...err, [k]: null }); };
  const save = () => {
    const e = {};
    if (f.name.trim().split(/\s+/).filter(Boolean).length < 2) e.name = 'Digite seu nome completo (nome e sobrenome).';
    if (!isEmail(f.email)) e.email = 'E-mail inválido. Ex.: nome@email.com';
    const digits = f.phone.replace(/\D/g, '');
    if (digits && (digits.length < 10 || digits.length > 11)) e.phone = 'Telefone inválido. Use DDD + número.';
    setErr(e);
    if (Object.keys(e).length) return;
    setUser({ name: f.name.trim(), email: f.email.trim(), phone: f.phone });
    Alert.alert('Perfil atualizado', 'Suas informações foram salvas.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };
  return (
    <Screen>
      <Header showBack navigation={navigation} title="Editar perfil" />
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <Ionicons name="person-circle-outline" size={96} color={colors.primary} />
        <TouchableOpacity onPress={() => Alert.alert('Foto', 'Integre expo-image-picker para trocar a foto.')}><Text style={{ color: colors.primary, fontWeight: '600' }}>Alterar foto</Text></TouchableOpacity>
      </View>
      <Input label="Nome completo" placeholder="Digite seu nome completo" value={f.name} onChangeText={set('name')} error={err.name} autoCapitalize="words" />
      <Input label="E-mail" placeholder="Digite seu e-mail" value={f.email} onChangeText={set('email')} keyboardType="email-address" error={err.email} />
      <Input label="Telefone (opcional)" placeholder="(11) 99999-9999" value={f.phone} onChangeText={(t) => set('phone')(maskPhone(t))} keyboardType="phone-pad" error={err.phone} />
      <Button title="Salvar alterações" onPress={save} style={{ marginHorizontal: 20, marginTop: 8 }} />
      <Button title="Cancelar" variant="outline" onPress={() => navigation.goBack()} style={{ marginHorizontal: 20 }} />
    </Screen>
  );
}

const statusColor = { Entregue: colors.success, 'Em preparo': colors.accent, 'A caminho': colors.primary };

export function Orders({ navigation }) {
  const { orders } = useStore();
  const [open, setOpen] = useState(null);
  return (
    <Screen>
      <Header showBack navigation={navigation} title="Meus pedidos" />
      {orders.length === 0 && (
        <View style={{ alignItems: 'center', marginVertical: 30 }}>
          <Text style={{ fontSize: 40 }}>🛍️</Text>
          <Text style={{ color: colors.muted, marginVertical: 10 }}>Você ainda não fez nenhum pedido.</Text>
          <Button title="Ir às compras" onPress={() => navigation.navigate('Produtos')} />
        </View>
      )}
      {orders.map((o) => (
        <Card key={o.id} onPress={() => setOpen(open === o.id ? null : o.id)}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: '800', fontSize: fonts.subtitle }}>Pedido #{o.id}</Text>
            <View style={{ backgroundColor: statusColor[o.status] || colors.muted, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 3 }}>
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>{o.status}</Text>
            </View>
          </View>
          <Text style={{ color: colors.muted, marginTop: 6 }}>Data do pedido: {o.date}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
            <Text style={{ color: colors.primary, fontWeight: '800', fontSize: fonts.subtitle }}>{money(o.total)}</Text>
            <Ionicons name={open === o.id ? 'chevron-up' : 'chevron-down'} size={20} color={colors.muted} />
          </View>
          {open === o.id && (
            <View style={{ borderTopWidth: 1, borderTopColor: colors.border, marginTop: 10, paddingTop: 10 }}>
              {o.items.map((i, idx) => (
                <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                  <Text style={{ flex: 1, color: colors.text }}>{i.qty}x {i.name}</Text>
                  <Text style={{ fontWeight: '600', marginLeft: 8 }}>{money(i.price * i.qty)}</Text>
                </View>
              ))}
              <Text style={{ color: colors.muted, fontSize: 12 }}>Entrega: grátis</Text>
            </View>
          )}
        </Card>
      ))}
    </Screen>
  );
}