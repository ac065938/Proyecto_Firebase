import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

// Usuario ficticio
const mockUser = {
    email: 'ac065938@gmail.com',
    password: 'contra1',
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
    const navigation = useNavigation();

    const handleLogin = () => {
        // Verifica las credenciales con el usuario ficticio
        if (email === mockUser.email && password === mockUser.password) {
            Alert.alert('Login', 'Inicio de sesión exitoso.');
            // Limpiar campos después del inicio de sesión exitoso
            setEmail('');
            setPassword('');
            navigation.navigate('Home'); // Redirige a la pantalla 'Home' después del login exitoso
        } else {
            Alert.alert('Inicio de sesión fallida', 'Correo electrónico o contraseña incorrectos.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Ajuste del teclado para iOS y Android
        >
            <ScrollView
                contentContainerStyle={styles.innerContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>Login</Text>
                <Image
                    source={require('../imagenes/180px2.jpg')} 
                    style={styles.image}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, styles.passwordInput]}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity 
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <MaterialCommunityIcons 
                            name={showPassword ? 'eye' : 'eye-off'} 
                            size={24} 
                            color="#007bff" 
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    innerContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    image: {
        width: 100, // Ajusta el tamaño de la imagen según sea necesario
        height: 100,
        borderRadius: 50, // Borde circular
        marginBottom: 20,
    },
    input: {
        width: '100%',
        maxWidth: 300,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        maxWidth: 300,
    },
    passwordInput: {
        flex: 1,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -19 }],
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 9,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Login;
