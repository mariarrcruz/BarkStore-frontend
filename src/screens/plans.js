import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Header, Card, Button, Select, ProductImage, CheckCircle, H } from '../components';
import { colors, fonts, money, fmtDate, addDays } from '../theme';
import { products, frequencies } from '../data';
import { useStore } from '../store';

const freqLabel = (days) => (frequencies.find((f) => f.days === days) || { label: `A cada ${days} dias` }).label;
const daysOf = (label) => frequencies.find((f) => f.label === label).days;
const planName = (pet) => `Plano ${pet?.name === 'Luna' ? 'da' : 'do'} ${pet?.name}`;

export function MyPlans({ navigation }) {
  const { plans, pets } = useStore();
  return (
    <Screen>
      <Header showBack navigation={navigation} title="Meus Planos" />
      {plans.map((pl) => {
        const pet = pets.find((p) => p.id === pl.petId);
        return (
          <Card key={pl.id} onPress={() => navigation.navigate('ManagePlan', { id: pl.id })} style={{ flexDirection: 'row', alignItems: 'center', padding: 18 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: fonts.h3, fontWeight: '800' }}>{pet?.emoji} {planName(pet)}</Text>
              {pl.productIds.map((id) => <Text key={id} style={{ color: colors.muted, fontSize: fonts.subtitle }}>{products.find((p) => p.id === id).name}</Text>)}
              <Text style={{ color: colors.primary, fontWeight: '600', marginTop: 6, fontSize: fonts.subtitle }}>🔄 {freqLabel(pl.days)}</Text>
              <Text style={{ color: colors.muted, fontSize: 13 }}>Próxima entrega: {pl.nextDelivery}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} />
          </Card>
        );
      })}
      <Button title="+ Criar novo plano" onPress={() => navigation.navigate('CreatePlan')} style={{ marginTop: 40, marginHorizontal: 20 }} />
    </Screen>
  );
}

function ProductPick({ selected, toggle }) {
  return products.map((p) => (
    <Card key={p.id} onPress={() => toggle(p.id)} style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
      <ProductImage product={p} size={56} />
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={{ fontWeight: '700', fontSize: fonts.subtitle }}>{p.name}</Text>
        <Text style={{ color: colors.primary, fontWeight: '600' }}>{money(p.price)}</Text>
      </View>
      <CheckCircle checked={selected.includes(p.id)} />
    </Card>
  ));
}

export function CreatePlan({ navigation, route }) {
  const { pets, addPlan } = useStore();
  const [petId, setPetId] = useState(pets[0]?.id);
  const [sel, setSel] = useState(route.params?.productId ? [route.params.productId] : [1, 2]);
  const [freq, setFreq] = useState('A cada 30 dias');
  const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const create = () => {
    if (!petId || sel.length === 0) return Alert.alert('Atenção', 'Escolha um pet e ao menos um produto.');
    const days = daysOf(freq);
    addPlan({ petId, productIds: sel, days, nextDelivery: fmtDate(addDays(days)) });
    navigation.navigate('MyPlans');
  };
  return (
    <Screen>
      <Header showBack navigation={navigation} title="Criar plano" subtitle="Monte um plano de compras para seu pet" />
      <H style={{ marginTop: 0 }}>Para qual pet?</H>
      {pets.map((p) => (
        <Card key={p.id} onPress={() => setPetId(p.id)} style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
          <View style={{ width: 54, height: 54, borderRadius: 27, backgroundColor: colors.tint, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 30 }}>{p.emoji}</Text></View>
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={{ fontWeight: '800', fontSize: fonts.h3 }}>{p.name}</Text>
            <Text style={{ color: colors.muted }}>{p.desc}</Text>
          </View>
          <CheckCircle radio checked={petId === p.id} />
        </Card>
      ))}
      <H>Escolha os produtos</H>
      <ProductPick selected={sel} toggle={toggle} />
      <H>Frequência de entrega</H>
      <Select value={freq} options={frequencies.map((f) => f.label)} onChange={setFreq} />
      <Button title="Criar meu plano →" onPress={create} />
    </Screen>
  );
}

export function ManagePlan({ navigation, route }) {
  const { plans, pets, updatePlan, deletePlan } = useStore();
  const plan = plans.find((p) => p.id === route.params.id);
  const [sel, setSel] = useState(plan?.productIds || []);
  const [freq, setFreq] = useState(freqLabel(plan?.days));
  if (!plan) return null;
  const pet = pets.find((p) => p.id === plan.petId);
  const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const save = () => {
    const days = daysOf(freq);
    updatePlan(plan.id, { productIds: sel, days, nextDelivery: days === plan.days ? plan.nextDelivery : fmtDate(addDays(days)) });
    navigation.goBack();
  };
  const del = () => Alert.alert('Excluir plano', 'Deseja realmente excluir este plano?', [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'Excluir', style: 'destructive', onPress: () => { deletePlan(plan.id); navigation.goBack(); } },
  ]);
  return (
    <Screen>
      <Header showBack navigation={navigation} title="Gerenciar Plano" />
      <Text style={{ fontSize: fonts.h3, fontWeight: '800' }}>{pet?.emoji} {planName(pet)}</Text>
      <Text style={{ color: colors.muted, marginVertical: 4 }}>{pet?.desc}</Text>
      <H>Produtos do plano</H>
      <ProductPick selected={sel} toggle={toggle} />
      <H>Frequência de entrega</H>
      <Select value={freq} options={frequencies.map((f) => f.label)} onChange={setFreq} />
      <Text style={{ color: colors.muted }}>Próxima entrega</Text>
      <Text style={{ fontSize: fonts.h3, fontWeight: '700', marginBottom: 8 }}>{plan.nextDelivery}</Text>
      <Button title="Salvar alterações" onPress={save} />
      <Button title="Excluir plano" variant="danger" onPress={del} />
    </Screen>
  );
}