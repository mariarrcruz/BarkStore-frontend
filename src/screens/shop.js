import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Screen, AppHeader, BackRow, SearchBar, CategoryCarousel, ProductCard, Card, Button, Stepper, ProductImage, H } from '../components';
import { colors, fonts, money, radius } from '../theme';
import { categories, products, images } from '../data';
import { useStore } from '../store';
import { norm } from '../utils';

// Busca por nome, nome curto ou categoria, sem diferenciar acentos/maiúsculas
const filterProducts = (q, cat) => {
  const n = norm(q.trim());
  return products.filter((p) => {
    const cats = p.categories.map((id) => (categories.find((c) => c.id === id) || {}).title || '').join(' ');
    const hay = norm(`${p.name} ${p.shortName} ${cats}`);
    return (!n || hay.includes(n)) && (!cat || p.categories.includes(cat));
  });
};

function Banner({ onPress }) {
  return (
    <View style={{ height: 150, backgroundColor: '#EDC557', borderRadius: radius.lg, overflow: 'hidden', marginVertical: 8 }}>
      <Image source={images.cat} resizeMode="contain" style={{ position: 'absolute', right: 0, bottom: 0, height: 150, width: 134 }} />
      <View style={{ padding: 18, width: '62%' }}>
        <Text style={{ color: '#fff', fontSize: 12 }}>Oferta ilimitada</Text>
        <Text style={{ color: '#fff', fontSize: 30, fontWeight: '800', marginVertical: 2 }}>30% Off</Text>
        <Text style={{ color: '#fff', fontSize: 11 }}>nutrição premium para o seu pet</Text>
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#fff', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16, alignSelf: 'flex-start', marginTop: 12 }}>
          <Text style={{ fontWeight: '700', fontSize: 12 }}>Comprar agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const SectionTitle = ({ title, onSeeAll }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, marginBottom: 10 }}>
    <Text style={{ fontSize: fonts.h3, fontWeight: '800' }}>{title}</Text>
    {onSeeAll && <TouchableOpacity onPress={onSeeAll}><Text style={{ color: colors.muted, fontSize: 12 }}>ver tudo</Text></TouchableOpacity>}
  </View>
);

export function Home({ navigation }) {
  const { plans, favorites, toggleFavorite, addToCart } = useStore();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState(null);
  const filtered = filterProducts(q, cat);
  const list = q.trim() || cat ? filtered : filtered.filter((p) => p.featured);
  const next = plans[0];
  const nextProduct = next && products.find((p) => p.id === next.productIds[0]);
  return (
    <Screen>
      <AppHeader navigation={navigation} />
      <SearchBar value={q} onChangeText={setQ} onSubmit={() => navigation.navigate('Produtos', { screen: 'Products', params: { q } })} />
      <Banner onPress={() => navigation.navigate('Produtos')} />

      <SectionTitle title="Categorias" onSeeAll={() => setCat(null)} />
      <CategoryCarousel categories={categories} active={cat} onSelect={setCat} />

      <SectionTitle title="Produtos em destaque" onSeeAll={() => navigation.navigate('Produtos')} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {list.map((p) => (
          <ProductCard key={p.id} product={p} width={160}
            favorite={favorites.includes(p.id)} onToggleFavorite={() => toggleFavorite(p.id)}
            onAddToCart={() => addToCart(p, 1)}
            onPress={() => navigation.navigate('ProductDetail', { id: p.id })} />
        ))}
        {list.length === 0 && <Text style={{ color: colors.muted }}>Nenhum produto encontrado.</Text>}
      </ScrollView>

      <SectionTitle title="Seu Plano" />
      <Card onPress={() => navigation.navigate('Planos')}>
        <Text style={{ fontWeight: '600' }}>🐾 Próxima entrega 🐾</Text>
        <Text style={{ fontWeight: '700', fontSize: fonts.subtitle, marginTop: 8 }}>
          {nextProduct ? `${nextProduct.shortName} • em 15 dias` : 'Você ainda não tem planos'}
        </Text>
      </Card>
    </Screen>
  );
}

export function Products({ navigation, route }) {
  const { favorites, toggleFavorite, addToCart } = useStore();
  const [q, setQ] = useState((route.params && route.params.q) || '');
  const [cat, setCat] = useState(null);
  useEffect(() => { if (route.params && route.params.q !== undefined) setQ(route.params.q); }, [route.params && route.params.q]);
  const list = filterProducts(q, cat);
  const filtering = q.trim() !== '' || cat !== null;
  return (
    <Screen>
      <AppHeader navigation={navigation} />
      <Text style={{ fontSize: fonts.h2, fontWeight: '800', textAlign: 'center', marginTop: 16 }}>Produtos</Text>
      <SearchBar value={q} onChangeText={setQ} />
      <SectionTitle title="Categorias" onSeeAll={() => setCat(null)} />
      <CategoryCarousel categories={categories} active={cat} onSelect={setCat} />
      <H>{filtering ? 'Resultados' : 'Todos os produtos'}</H>
      {filtering && (
        <Text style={{ color: colors.muted, marginBottom: 10 }}>
          {list.length} resultado(s){q.trim() ? ` para "${q.trim()}"` : ''}
        </Text>
      )}
      {list.length === 0 && (
        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <Text style={{ fontSize: 40 }}>🔍</Text>
          <Text style={{ color: colors.muted, marginVertical: 8 }}>Nenhum produto encontrado.</Text>
          <Button title="Limpar busca" variant="outline" onPress={() => { setQ(''); setCat(null); }} />
        </View>
      )}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {list.map((p) => (
          <ProductCard key={p.id} product={p} width="48%" noMargin
            favorite={favorites.includes(p.id)} onToggleFavorite={() => toggleFavorite(p.id)}
            onAddToCart={() => addToCart(p, 1)}
            onPress={() => navigation.navigate('ProductDetail', { id: p.id })} />
        ))}
      </View>
    </Screen>
  );
}

export function ProductDetail({ navigation, route }) {
  const p = products.find((x) => x.id === route.params.id);
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);
  return (
    <Screen>
      <AppHeader navigation={navigation} />
      <BackRow navigation={navigation} />
      <Card style={{ alignItems: 'center', marginHorizontal: 30, marginTop: 6 }}><ProductImage product={p} size={220} /></Card>
      <Text style={{ fontSize: fonts.h2, fontWeight: '800' }}>{p.name}</Text>
      <Text style={{ color: colors.muted, fontWeight: '600', marginVertical: 6 }}>
        <Text style={{ color: '#F59E0B' }}>★★★★★</Text> {String(p.rating).replace('.', ',')} ({p.reviews} avaliações)
      </Text>
      <Text style={{ fontSize: fonts.h2, fontWeight: '800', color: colors.primary }}>{money(p.price)}</Text>
      <Text style={{ fontSize: fonts.subtitle, color: colors.text, marginVertical: 10 }}>{p.description}</Text>
      <Text style={{ fontWeight: '700', fontSize: fonts.subtitle, marginBottom: 8 }}>Quantidade</Text>
      <Stepper value={qty} onMinus={() => setQty(Math.max(1, qty - 1))} onPlus={() => setQty(qty + 1)} />
      <Button title="Adicionar ao carrinho" variant="secondary" style={{ marginTop: 16 }} onPress={() => { addToCart(p, qty); navigation.navigate('Cart'); }} />
      <Text style={{ textAlign: 'center', color: colors.muted, marginTop: 8 }}>Quer receber este produto regularmente?</Text>
      <Button title="Adicionar ao meu plano" variant="outline" onPress={() => navigation.navigate('CreatePlan', { productId: p.id })} />
    </Screen>
  );
}