const products = [
  { name: 'Blusa', price: 'R$ 20,00', description: 'Camiseta de algodão leve e confortável, ideal para o dia a dia.' },
  { name: 'Moletom', price: 'R$ 40,00', description: 'Moletom com capuz, perfeito para o inverno e looks casuais.' },
  { name: 'Vestido', price: 'R$ 30,00', description: 'Vestido elegante e fluido para ocasiões especiais.' },
  { name: 'Calça Jeans', price: 'R$ 35,00', description: 'Calça jeans de corte reto, essencial no guarda-roupa.' },
  { name: 'Camisa Polo', price: 'R$ 45,00', description: 'Camisa polo com tecido leve, ideal para um visual casual.' },
  { name: 'Jaqueta Jeans', price: 'R$ 120,00', description: 'Jaqueta jeans com lavagem moderna, ótima para meia-estação.' },
  { name: 'Calça Moletom', price: 'R$ 60,00', description: 'Calça de moletom super confortável para dias de descanso.' },
  { name: 'Saia Plissada', price: 'R$ 50,00', description: 'Saia plissada leve e versátil, combina com várias ocasiões.' }
];

let cartItems = [];

const productGrid = document.getElementById('productGrid');


products.forEach((product, index) => {
  const className = product.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/ç/g, 'c');

  productGrid.innerHTML += `
    <div class="bg-white border rounded-lg p-4 shadow text-center hover:shadow-md transition">
      <img src="./img/${className}.jpg" alt="${product.name}" class="product-image cursor-pointer" onclick="showProductDetail(${index})">
      <h3 class="text-lg font-semibold">${product.name}</h3>
      <p class="mb-2">${product.price}</p>
      <select id="sizeSelect-${index}" class="mb-2 w-full p-2 border rounded">
        <option value="">Selecione o tamanho</option>
        <option value="P">Tamanho P</option>
        <option value="M">Tamanho M</option>
        <option value="G">Tamanho G</option>
        <option value="GG">Tamanho GG</option>
      </select>
      <button onclick="addToCart('${product.name}', 'sizeSelect-${index}')" class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
        Adicionar
      </button>
    </div>
  `;
});

function addToCart(productName, sizeSelectId) {
  const sizeElement = document.getElementById(sizeSelectId);
  const size = sizeElement.value;
  if (size) {
    cartItems.push(`${productName} - Tamanho: ${size}`);
    updateCartDisplay();
    alert(`${productName} (Tamanho: ${size}) adicionado ao carrinho!`);
  } else {
    alert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
  }
}

function updateCartDisplay() {
  const cartList = document.getElementById('cartList');
  cartList.innerHTML = '';
  if (cartItems.length === 0) {
    cartList.innerHTML = '<li class="text-gray-500">Carrinho vazio.</li>';
  } else {
    cartItems.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center border p-2 rounded mb-1';
      li.innerHTML = `
        <span>${item}</span>
        <button onclick="removeFromCart(${index})" class="bg-red-500 text-white text-xs px-2 py-1 rounded">Remover</button>
      `;
      cartList.appendChild(li);
    });
  }
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartDisplay();
}


function openLoginModal() {
  document.getElementById('loginModal').classList.remove('hidden');
  document.getElementById('loginModal').classList.add('flex');
}
function closeLoginModal() {
  document.getElementById('loginModal').classList.add('hidden');
  document.getElementById('loginModal').classList.remove('flex');
}
function submitLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  alert(`Bem-vindo, ${email}!`);
  closeLoginModal();
}


function openCartModal() {
  updateCartDisplay();
  document.getElementById('cartModal').classList.remove('hidden');
  document.getElementById('cartModal').classList.add('flex');
}
function closeCartModal() {
  document.getElementById('cartModal').classList.add('hidden');
  document.getElementById('cartModal').classList.remove('flex');
}


function openCheckoutModal() {
  if (cartItems.length === 0) {
    alert('O carrinho está vazio.');
    return;
  }
  const summary = document.getElementById('checkoutSummary');
  summary.innerHTML = '';
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    summary.appendChild(li);
  });
  document.getElementById('checkoutModal').classList.remove('hidden');
  document.getElementById('checkoutModal').classList.add('flex');
}
function closeCheckoutModal() {
  document.getElementById('checkoutModal').classList.add('hidden');
  document.getElementById('checkoutModal').classList.remove('flex');
}
function submitCheckout(event) {
  event.preventDefault();
  alert('Pedido confirmado! Obrigado pela compra.');
  cartItems = [];
  updateCartDisplay();
  closeCheckoutModal();
  closeCartModal();
}


let currentProductIndex = null;


function showProductDetail(index) {
  currentProductIndex = index;
  const product = products[index];
  if (!product) return;

  const detailImage = document.getElementById('detailImage');
  const className = product.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/ç/g, 'c');
  detailImage.src = `./img/${className}.jpg`;

  document.getElementById('detailName').textContent = product.name;
  document.getElementById('detailDescription').textContent = product.description;
  document.getElementById('originalPrice').textContent = product.price.replace('R$ ', '');
  document.getElementById('promoPrice').textContent = product.price.replace('R$ ', '');
  
  document.getElementById('productDetailModal').classList.remove('hidden');
  document.getElementById('productDetailModal').classList.add('flex');
}

function closeProductDetail() {
  document.getElementById('productDetailModal').classList.add('hidden');
  document.getElementById('productDetailModal').classList.remove('flex');
}


function buyNow() {
  if (currentProductIndex === null) {
    alert("Nenhum produto selecionado.");
    return;
  }
  
  const product = products[currentProductIndex];
  let selectedSize = prompt("Selecione o tamanho (P, M, G, GG):", "M");
  
  if (selectedSize) {
    selectedSize = selectedSize.toUpperCase().trim();
    if (["P", "M", "G", "GG"].includes(selectedSize)) {
      cartItems.push(`${product.name} - Tamanho: ${selectedSize}`);
      updateCartDisplay();
      closeProductDetail();
      openCheckoutModal();
      alert(`${product.name} (Tamanho: ${selectedSize}) adicionado ao carrinho.\nVocê será redirecionado para o checkout!`);
    } else {
      alert("Tamanho inválido. Operação cancelada.");
    }
  } else {
    alert("Nenhum tamanho foi selecionado. Operação cancelada.");
  }
}
