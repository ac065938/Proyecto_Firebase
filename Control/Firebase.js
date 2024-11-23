import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Configuración de Firebase
const config = {
    apiKey: "AIzaSyBit9wMY89wG9cb_PQ7psu4TuQCwe_4yRk",
    authDomain: "apptec-f6536.firebaseapp.com",
    databaseURL: "https://apptec-f6536-default-rtdb.firebaseio.com",
    projectId: "apptec-f6536",
    storageBucket: "apptec-f6536.appspot.com",
    messagingSenderId: "568050770676",
    appId: "1:568050770676:web:c9f4ce038232fbe8ea74a1",
    measurementId: "G-LMYBGXQK2Q"
};

// Inicializa Firebase si no ha sido inicializado previamente
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

// Instancia de Firestore
const db = firebase.firestore();

// Instancia de autenticación
const auth = firebase.auth();

// Instancia de almacenamiento
const storage = firebase.storage(); // Corregido: usa () para obtener la instancia

// Proveedor de autenticación con Google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Función para subir una imagen
const uploadImage = async (nucontrol, imageBlob) => {
    try {
        // Crea una referencia al archivo en el almacenamiento
        const ref = storage.ref(`Image/${nucontrol}`);

        // Sube la imagen
        await ref.put(imageBlob);

        console.log('Imagen subida correctamente');
    } catch (error) {
        console.error('Error al subir la imagen: ', error);
    }
};

// Exporta las instancias y la función
export {
    db,  // Exporta db en lugar de "conexion"
    auth,
    googleAuthProvider,
    storage,
    uploadImage, // Exporta la función para subir imágenes
    firebase // Exporta firebase si necesitas usar otras funcionalidades
};
