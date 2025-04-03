// Import the functions you need from the SDKs you need
import productos from '../productos.json';

import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy2rODRT7PlDMpeCKy6O1YfHDge39tYCg",
  authDomain: "coderhouse-eccomerce-morua.firebaseapp.com",
  projectId: "coderhouse-eccomerce-morua",
  storageBucket: "coderhouse-eccomerce-morua.firebasestorage.app",
  messagingSenderId: "670253352693",
  appId: "1:670253352693:web:10f31f4511a766397967bc",
  measurementId: "G-LLP23L279G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para obtener todos los productos
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const productos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
}

// Función para obtener un producto por ID
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, 'items', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Producto no encontrado');
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
}

// Función para obtener productos por categoría
export const getProductsByCategory = async (categoria) => {
  try {
    const q = query(
      collection(db, 'items'),
      where('categoria', '==', categoria.toLowerCase())
    );
    
    const querySnapshot = await getDocs(q);
    const productos = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return productos;
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    throw error;
  }
}

// Función para agregar productos a la base de datos
export async function upProducts() {
  const itemsCollectionRef = collection(db, 'items');
  
  try {
    // Cargar cada producto del JSON
    for (const producto of productos.productos) {
      const newItem = {
        nombre: producto.nombre,
        precio: producto.precio,
        categoria: producto.categoria,
        descripcion: producto.descripcion,
        destacado: producto.destacado || false,
        estilo: producto.estilo,
        src: producto.src,
        stock: parseInt(producto.stock)
      };
      
      const docRef = await addDoc(itemsCollectionRef, newItem);
      console.log(`Producto "${producto.nombre}" creado con ID: ${docRef.id}`);
    }
    
    console.log("¡Todos los productos fueron cargados exitosamente!");
  } catch (err) {
    console.error("Error al crear el documento: ", err);
  }
}

// Función para crear una nueva orden de compra
export const createOrder = async (orderData) => {
  try {
    const ordersCollection = collection(db, 'orders');
    
    // Añadir timestamp del servidor para tener una fecha consistente
    const orderWithTimestamp = {
      ...orderData,
      Fecha: serverTimestamp()
    };
    
    const docRef = await addDoc(ordersCollection, orderWithTimestamp);
    console.log("Orden creada con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw error;
  }
};

// Función para obtener órdenes por sessionId
export const getOrdersBySessionId = async (sessionId) => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('sessionId', '==', sessionId)
    );
    
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return orders;
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    throw error;
  }
};