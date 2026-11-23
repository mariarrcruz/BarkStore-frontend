import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius, shadow, money } from '../theme';
import { images } from '../data';
import { useStore } from '../store';

export function Logo({ size = 1 }) {
  return <Image source={images.logo} style={{ width: 150 * size, height: 164 * size }} resizeMode="contain" />;
}

export function Screen({ children, scroll = true, padBottom = 110 }) {
  const inner = { width: '100%', maxWidth: 560, alignSelf: 'center' };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      {scroll ? (
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: padBottom }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={inner}>{children}</View>
        </ScrollView>
      ) : (
        <View style={{ flex: 1, padding: 20 }}><View style={[inner, { flex: 1 }]}>{children}</View></View>
      )}
    </SafeAreaView>
  );
}

export function Header({ showBack, title, subtitle, right, navigation }) {
  return (
    <View>
      <View style={s.headerRow}>
        <View style={s.side}>
          {showBack && (
            <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
              <Ionicons name="arrow-back" size={30} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
        <Logo size={0.8} />
        <View style={[s.side, { alignItems: 'flex-end' }]}>{right}</View>
      </View>
      {title ? <Text style={s.title}>{title}</Text> : null}
      {subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export function IconButton({ name, onPress, badge = 0 }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[s.iconBtn, shadow]}>
      <Ionicons name={name} size={22} color="#111" />
      {badge > 0 && (
        <View style={s.badge}><Text style={s.badgeTxt}>{badge}</Text></View>
      )}
    </TouchableOpacity>
  );
}

export function AppHeader({ navigation }) {
  const { user, favorites, cartCount } = useStore();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Logo size={0.33} />
      <View style={{ flex: 1, marginLeft: 10, marginRight: 8 }}>
        <Text numberOfLines={1} style={{ fontSize: fonts.h3, fontWeight: '600', color: colors.text }}>Bem-vindo(a)!</Text>
        <Text numberOfLines={1} style={{ color: colors.muted }}>{user.name}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconButton name="heart-outline" onPress={() => Alert.alert('Favoritos', favorites.length ? `Você tem ${favorites.length} produto(s) favorito(s).` : 'Você ainda não favoritou nenhum produto.')} />
        <View style={{ marginHorizontal: 8 }}><IconButton name="bag-outline" badge={cartCount} onPress={() => navigation.navigate('Cart')} /></View>
        <IconButton name="person-outline" onPress={() => navigation.navigate('Perfil')} />
      </View>
    </View>
  );
}

export function BackRow({ navigation, title }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 6 }}>
      <TouchableOpacity onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Início'))} hitSlop={10} style={{ marginRight: 12 }}>
        <Ionicons name="arrow-back" size={28} color={colors.primary} />
      </TouchableOpacity>
      {title ? <Text style={{ fontSize: fonts.h1, fontWeight: '800', color: colors.text }}>{title}</Text> : null}
    </View>
  );
}

export function Button({ title, onPress, variant = 'primary', style, disabled }) {
  const v = {
    primary: { bg: colors.primary, fg: '#fff', border: colors.primary },
    secondary: { bg: colors.accent, fg: '#fff', border: colors.accent },
    outline: { bg: colors.input, fg: colors.primary, border: colors.primary },
    danger: { bg: colors.input, fg: colors.danger, border: colors.danger },
  }[variant];
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.85}
      style={[{ backgroundColor: v.bg, borderColor: v.border, borderWidth: 2, borderRadius: radius.sm, paddingVertical: 15, alignItems: 'center', marginVertical: 6, opacity: disabled ? 0.5 : 1 }, style]}>
      <Text style={{ color: v.fg, fontSize: fonts.subtitle, fontWeight: '700' }}>{title}</Text>
    </TouchableOpacity>
  );
}

export function SmallButton({ title, icon = 'pencil', onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={s.small}>
      <Ionicons name={icon} size={12} color="#fff" />
      <Text style={{ color: '#fff', fontWeight: '600', marginLeft: 4, fontSize: 13 }}>{title}</Text>
    </TouchableOpacity>
  );
}

export function Input({ label, icon, rightPress, onChangeText, placeholder, value, secureTextEntry, keyboardType, suffix, error, autoCapitalize = 'none' }) {
  return (
    <View style={{ marginBottom: 14 }}>
      {label ? <Text style={s.label}>{label}</Text> : null}
      <View style={[s.input, error ? { borderColor: colors.danger, borderWidth: 1.5 } : null]}>
        <TextInput style={{ flex: 1, fontSize: fonts.subtitle, color: colors.text }} placeholder={placeholder} placeholderTextColor={colors.muted}
          value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} keyboardType={keyboardType} autoCapitalize={autoCapitalize} />
        {suffix ? <Text style={{ color: colors.muted }}>{suffix}</Text> : null}
        {icon ? (
          <TouchableOpacity onPress={rightPress} disabled={!rightPress}>
            <Ionicons name={icon} size={20} color={colors.primary} />
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={{ color: colors.danger, fontSize: 12, marginTop: 4 }}>{error}</Text> : null}
    </View>
  );
}

export function SearchBar({ value, onChangeText, onSubmit, placeholder = 'Buscar produtos...' }) {
  return (
    <View style={[s.search, shadow]}>
      <Ionicons name="search" size={20} color="#9CA3AF" />
      <TextInput
        style={{ flex: 1, marginLeft: 12, fontSize: fonts.subtitle, fontStyle: 'italic', fontWeight: '600', color: colors.text }}
        placeholder={placeholder} placeholderTextColor="#9CA3AF"
        value={value} onChangeText={onChangeText}
        returnKeyType="search" onSubmitEditing={onSubmit} autoCorrect={false}
      />
      {value ? (
        <TouchableOpacity onPress={() => onChangeText('')} hitSlop={10}>
          <Ionicons name="close-circle" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export function Select({ label, value, options, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ marginBottom: 14 }}>
      {label ? <Text style={s.label}>{label}</Text> : null}
      <TouchableOpacity style={s.input} onPress={() => setOpen(!open)}>
        <Text style={{ flex: 1, fontSize: fonts.subtitle, color: value ? colors.text : colors.muted }}>{value || placeholder}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color={colors.muted} />
      </TouchableOpacity>
      {open && (
        <View style={[s.dropdown, shadow]}>
          <ScrollView style={{ maxHeight: 180 }} nestedScrollEnabled>
            {options.map((o) => (
              <TouchableOpacity key={o} style={{ padding: 12 }} onPress={() => { onChange(o); setOpen(false); }}>
                <Text style={{ fontSize: fonts.subtitle, color: colors.text }}>{o}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export function Card({ children, style, onPress }) {
  const C = onPress ? TouchableOpacity : View;
  return <C onPress={onPress} activeOpacity={0.85} style={[{ backgroundColor: colors.card, borderRadius: radius.md, padding: 16, marginBottom: 14 }, shadow, style]}>{children}</C>;
}

export function ProductImage({ product, size, height = 120 }) {
  const box = { width: size || '100%', height: size || height, borderRadius: radius.sm, backgroundColor: product.bg || '#E5E7EB', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' };
  if (product.image) return <View style={box}><Image source={product.image} style={{ width: '88%', height: '88%' }} resizeMode="contain" /></View>;
  return <View style={box}><Text style={{ fontSize: (size || height) * 0.5 }}>{product.emoji}</Text></View>;
}

export function ProductCard({ product, onPress, onAddToCart, width, favorite, onToggleFavorite, noMargin }) {
  return (
    <Card onPress={onPress} style={{ width, padding: 10, marginRight: noMargin ? 0 : 12, borderRadius: radius.lg }}>
      <View>
        <ProductImage product={product} height={120} />
        {onToggleFavorite && (
          <TouchableOpacity onPress={onToggleFavorite} style={s.heart} hitSlop={8}>
            <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={18} color={favorite ? colors.danger : colors.text} />
          </TouchableOpacity>
        )}
      </View>
      <Text numberOfLines={3} style={{ fontWeight: '700', fontSize: 11, marginTop: 8, minHeight: 42, color: colors.text }}>{product.name}</Text>
      <Text style={{ fontSize: 12, marginTop: 4 }}><Text style={{ color: '#F59E0B' }}>★ </Text><Text style={{ fontWeight: '600' }}>{String(product.rating).replace('.', ',')}</Text></Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
        <Text style={{ fontWeight: '800', fontSize: 14 }}>{money(product.price)}</Text>
        {onAddToCart && (
          <TouchableOpacity onPress={onAddToCart} style={s.addBtn} hitSlop={6}><Ionicons name="add" size={20} color="#fff" /></TouchableOpacity>
        )}
      </View>
    </Card>
  );
}

export function CategoryPill({ title, emoji, color, isActive, onPress, width, style }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}
      style={[{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 30, padding: 8, borderWidth: 2, borderColor: isActive ? colors.primary : 'transparent', width }, shadow, style]}>
      <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: color, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 18 }}>{emoji}</Text></View>
      <Text numberOfLines={1} style={{ flex: 1, marginLeft: 12, marginRight: 8, fontStyle: 'italic', fontWeight: '600', fontSize: fonts.body, color: colors.text }}>{title}</Text>
    </TouchableOpacity>
  );
}

export function CategoryCarousel({ categories, active, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} snapToInterval={225} decelerationRate="fast"
      contentContainerStyle={{ paddingVertical: 6, paddingHorizontal: 2 }}>
      {categories.map((c) => (
        <CategoryPill key={c.id} title={c.title} emoji={c.emoji} color={c.color} width={215} style={{ marginRight: 10 }}
          isActive={active === c.id} onPress={() => onSelect(active === c.id ? null : c.id)} />
      ))}
    </ScrollView>
  );
}

export function CategoryCard({ title, emoji, image, isActive, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}
      style={[{ width: '48%', backgroundColor: isActive ? colors.primary : colors.card, borderRadius: radius.md, paddingVertical: 24, alignItems: 'center', marginBottom: 14 }, shadow]}>
      {image ? <Image source={image} style={{ width: 24, height: 24 }} /> : null}
      <Text style={{ fontWeight: '700', fontSize: fonts.subtitle, color: isActive ? '#fff' : colors.text }}>{emoji} {title}</Text>
    </TouchableOpacity>
  );
}

export function Stepper({ value, onMinus, onPlus }) {
  return (
    <View style={s.stepper}>
      <TouchableOpacity onPress={onMinus} hitSlop={8}><Text style={s.stepBtn}>-</Text></TouchableOpacity>
      <Text style={{ fontSize: 18, fontWeight: '600', marginHorizontal: 18 }}>{value}</Text>
      <TouchableOpacity onPress={onPlus} hitSlop={8}><Text style={s.stepBtn}>+</Text></TouchableOpacity>
    </View>
  );
}

export function CheckCircle({ checked, radio }) {
  return (
    <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: checked ? colors.primary : 'transparent', borderWidth: 2, borderColor: checked ? colors.primary : colors.border, alignItems: 'center', justifyContent: 'center' }}>
      {checked && <Ionicons name={radio ? 'ellipse' : 'checkmark'} size={radio ? 10 : 16} color="#fff" />}
    </View>
  );
}

export function Row({ left, right, bold }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 6 }}>
      {typeof left === 'string' ? <Text style={{ color: bold ? colors.text : colors.muted, fontSize: fonts.subtitle }}>{left}</Text> : left}
      {typeof right === 'string' ? <Text style={{ fontWeight: '700', fontSize: fonts.subtitle }}>{right}</Text> : right}
    </View>
  );
}

export const H = ({ children, style }) => <Text style={[{ fontSize: fonts.h3, fontWeight: '800', color: colors.text, marginTop: 14, marginBottom: 10 }, style]}>{children}</Text>;

const s = StyleSheet.create({
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  side: { width: 44 },
  title: { fontSize: fonts.h1, fontWeight: '800', color: colors.text, marginTop: 8, marginBottom: 8 },
  subtitle: { fontSize: fonts.subtitle, color: colors.muted, marginBottom: 12 },
  label: { fontSize: fonts.subtitle, fontWeight: '600', color: colors.text, marginBottom: 6 },
  input: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.input, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 16, height: 52 },
  dropdown: { backgroundColor: '#fff', borderRadius: radius.sm, marginTop: 4, borderWidth: 1, borderColor: colors.border },
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 26, paddingHorizontal: 18, height: 52, marginVertical: 14 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: -4, right: -4, backgroundColor: colors.accent, borderRadius: 9, minWidth: 18, height: 18, paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center' },
  badgeTxt: { color: '#fff', fontSize: 11, fontWeight: '700' },
  heart: { position: 'absolute', top: 6, right: 6, backgroundColor: '#fff', borderRadius: 14, width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  small: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: colors.primary, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 6, marginTop: 6 },
  stepper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 16, paddingVertical: 8, alignSelf: 'flex-start' },
  stepBtn: { fontSize: 22, fontWeight: '700', color: colors.text, paddingHorizontal: 4 },
  addBtn: { backgroundColor: colors.primary, borderRadius: 14, width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
});