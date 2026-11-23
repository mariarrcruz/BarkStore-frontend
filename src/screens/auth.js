import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Logo, Input, Button } from '../components';
import { colors, fonts } from '../theme';
import { useStore } from '../store';
import { images } from '../data';
import { isEmail } from '../utils';

const Title = ({ t, sub }) => (
  <View style={{ alignItems: 'center', marginVertical: 24 }}>
    <Text style={{ fontSize: fonts.h1, fontWeight: '800', color: colors.text }}>{t}</Text>
    <Text style={{ fontSize: fonts.subtitle, color: colors.muted, textAlign: 'center', marginTop: 8 }}>{sub}</Text>
  </View>
);
const Divider = () => <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 24, marginHorizontal: 30 }} />;

export function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState({});
  const { setUser, user } = useStore();
  const enter = () => {
    const e = {};
    if (!email.trim()) e.email = 'Informe seu e-mail.';
    else if (!isEmail(email)) e.email = 'E-mail inválido. Ex.: nome@email.com';
    if (!pass) e.pass = 'Informe sua senha.';
    else if (pass.length < 6) e.pass = 'A senha deve ter ao menos 6 caracteres.';
    setErr(e);
    if (Object.keys(e).length) return;
    setUser({ ...user, email: email.trim() });
    navigation.replace('Main');
  };
  return (
    <Screen padBottom={30}>
      <View style={{ alignItems: 'center', marginTop: 10 }}><Logo /></View>
      <Title t="Bem-vindo de volta!" sub={'Entre na sua conta\npara continuar'} />
      <Input label="E-mail" icon="at" placeholder="Digite seu e-mail" value={email} onChangeText={(v) => { setEmail(v); setErr({ ...err, email: null }); }} keyboardType="email-address" error={err.email} />
      <Input label="Senha" icon={show ? 'eye-off-outline' : 'eye-outline'} rightPress={() => setShow(!show)} placeholder="Digite sua senha" value={pass} onChangeText={(v) => { setPass(v); setErr({ ...err, pass: null }); }} secureTextEntry={!show} error={err.pass} />
      <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => Alert.alert('Recuperar senha', 'Enviaremos um link para o seu e-mail.')}>
        <Text style={{ color: colors.primary, fontWeight: '700' }}>Esqueci minha senha?</Text>
      </TouchableOpacity>
      <Button title="Entrar" onPress={enter} style={{ marginTop: 36, marginHorizontal: 20 }} />
      <Divider />
      <Text style={{ textAlign: 'center', color: colors.muted }}>
        Ainda não tem uma conta? <Text style={{ color: colors.primary, fontWeight: '700' }} onPress={() => navigation.navigate('Register')}>Cadastre-se</Text>
      </Text>
    </Screen>
  );
}

export function Register({ navigation }) {
  const [f, setF] = useState({ name: '', email: '', pass: '', pass2: '' });
  const [err, setErr] = useState({});
  const { setUser } = useStore();
  const set = (k) => (v) => { setF({ ...f, [k]: v }); setErr({ ...err, [k]: null }); };
  const create = () => {
    const e = {};
    if (f.name.trim().split(/\s+/).filter(Boolean).length < 2) e.name = 'Digite seu nome completo (nome e sobrenome).';
    if (!f.email.trim()) e.email = 'Informe seu e-mail.';
    else if (!isEmail(f.email)) e.email = 'E-mail inválido. Ex.: nome@email.com';
    if (f.pass.length < 6) e.pass = 'A senha deve ter ao menos 6 caracteres.';
    if (!f.pass2) e.pass2 = 'Confirme sua senha.';
    else if (f.pass !== f.pass2) e.pass2 = 'As senhas não conferem.';
    setErr(e);
    if (Object.keys(e).length) return;
    setUser({ name: f.name.trim(), email: f.email.trim(), phone: '' });
    navigation.replace('Main');
  };
  return (
    <Screen padBottom={30}>
      <View style={{ alignItems: 'center' }}><Logo /></View>
      <Title t="Crie sua conta" sub={'Preencha seus dados\npara começar'} />
      <Input label="Nome completo" placeholder="Digite seu nome completo" value={f.name} onChangeText={set('name')} error={err.name} autoCapitalize="words" />
      <Input label="E-mail" placeholder="Digite seu e-mail" value={f.email} onChangeText={set('email')} keyboardType="email-address" error={err.email} />
      <Input label="Senha" placeholder="Digite sua senha" value={f.pass} onChangeText={set('pass')} secureTextEntry error={err.pass} />
      <Input label="Confirmar senha" placeholder="Digite sua senha novamente" value={f.pass2} onChangeText={set('pass2')} secureTextEntry error={err.pass2} />
      <Button title="Criar conta" onPress={create} style={{ marginHorizontal: 20, marginTop: 10 }} />
      <Divider />
      <Text style={{ textAlign: 'center', color: colors.muted }}>
        Já tem uma conta? <Text style={{ color: colors.primary, fontWeight: '700' }} onPress={() => navigation.navigate('Login')}>Entrar</Text>
      </Text>
    </Screen>
  );
}

export function Splash({ navigation }) {
  const { width } = useWindowDimensions();
  const w = Math.min(width, 480);
  const dogW = w * 0.82;
  const dogH = dogW * (458 / 412);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E3ECF9' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{ color: colors.muted, fontWeight: '700', marginRight: 20 }}>Entrar</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={{ color: colors.muted, fontWeight: '700' }}>Cadastrar</Text></TouchableOpacity>
        </View>

        <View style={{ width: dogW + 30, height: dogH + 40, marginTop: 10 }}>
          <View style={{ position: 'absolute', top: 0, right: 0, width: dogW * 0.7, height: dogW * 0.75, backgroundColor: colors.primary, borderTopLeftRadius: 120, borderTopRightRadius: 90, borderBottomLeftRadius: 80, borderBottomRightRadius: 140 }} />
          <View style={{ position: 'absolute', bottom: 0, left: 0, width: dogW * 0.5, height: dogW * 0.42, backgroundColor: colors.primary, borderTopLeftRadius: 60, borderTopRightRadius: 100, borderBottomLeftRadius: 90, borderBottomRightRadius: 70 }} />
          <View style={{ position: 'absolute', top: dogH * 0.2, left: 8, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.primary }} />
          <View style={{ position: 'absolute', top: dogH * 0.3, left: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary }} />
          <View style={{ position: 'absolute', top: dogH * 0.45, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary }} />
          <View style={{ position: 'absolute', bottom: 6, left: dogW * 0.5, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary }} />
          <Image source={images.dog} resizeMode="contain" style={{ position: 'absolute', top: 10, left: 15, width: dogW, height: dogH }} />
        </View>

        <Text style={{ fontSize: 26, fontWeight: '800', color: colors.text, textAlign: 'center', marginTop: 24 }}>Bem-vindo à nossa pet shop</Text>
        <Text style={{ color: colors.muted, textAlign: 'center', fontSize: fonts.body, marginTop: 10, lineHeight: 20, paddingHorizontal: 10 }}>
          Encontre tudo o que seu pet precisa para viver uma vida mais feliz e saudável. Rações, acessórios, cuidados e muito mais em um só lugar.
        </Text>

        <TouchableOpacity onPress={() => navigation.replace('Main')} activeOpacity={0.85}
          style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: 28 }}>
          <Ionicons name="arrow-forward" size={30} color="#fff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}