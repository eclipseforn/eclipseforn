// Firebase SDKs precisam estar no HTML antes desse arquivo!

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDAnBNdufwLlMW4bZHK0mUgncmIezNSMTg",
  authDomain: "minha-loja-digital1.firebaseapp.com",
  projectId: "minha-loja-digital1",
  storageBucket: "minha-loja-digital1.firebasestorage.app",
  messagingSenderId: "119834670597",
  appId: "1:119834670597:web:36edb828d7fdded6678e6c"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Conecta ao Firestore
const db = firebase.firestore();


// ===============================
// CADASTRAR PRODUTO (ADMIN)
// ===============================
function cadastrarProduto(nome, preco) {
  db.collection("produtos").add({
    nome: nome,
    preco: parseFloat(preco),
    criadoEm: new Date()
  })
  .then(() => {
    alert("Produto cadastrado com sucesso!");
  })
  .catch((error) => {
    alert("Erro: " + error);
  });
}


// ===============================
// LISTAR PRODUTOS (SITE)
// ===============================
function carregarProdutos() {
  const lista = document.getElementById("lista-produtos");
  if (!lista) return;

  lista.innerHTML = "";

  db.collection("produtos").get().then((snapshot) => {
    snapshot.forEach((doc) => {
      const data = doc.data();

      lista.innerHTML += `
        <div style="border:1px solid #ccc;padding:10px;margin:10px;border-radius:8px;">
          <h3>${data.nome}</h3>
          <p><strong>R$ ${data.preco}</strong></p>
        </div>
      `;
    });
  });
}

// Carrega automaticamente quando abrir a página
document.addEventListener("DOMContentLoaded", carregarProdutos);
