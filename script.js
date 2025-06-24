
let products = [
  { name: 'Blusa', price: 'R$ 20,00', description: 'Camiseta de algodao leve e confortavel, ideal para o dia a dia.' },
  { name: 'Moletom', price: 'R$ 40,00', description: 'Moletom com capuz, perfeito para o inverno e looks casuais.' },
  { name: 'Vestido', price: 'R$ 30,00', description: 'Vestido elegante e fluido para ocasioes especiais.' },
  { name: 'Calca Jeans', price: 'R$ 35,00', description: 'Calca jeans de corte reto, essencial no guarda-roupa.' },
  { name: 'Camisa Polo', price: 'R$ 45,00', description: 'Camisa polo com tecido leve, ideal para um visual casual.' },
  { name: 'Jaqueta Jeans', price: 'R$ 120,00', description: 'Jaqueta jeans com lavagem moderna, otima para meia-estacao.' },
  { name: 'Calca Moletom', price: 'R$ 60,00', description: 'Calca de moletom super confortavel para dias de descanso.' },
  { name: 'Saia Plissada', price: 'R$ 50,00', description: 'Saia plissada leve e versatil, combina com varias ocasioes.' }
];

let cartItems = [];

function renderProducts(filteredList = products) {
  const productGrid = document.getElementById('productGrid');
  productGrid.innerHTML = '';

  filteredList.forEach((product, index) => {
    const className = product.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
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
        <button onclick="addToCart('${product.name}', 'sizeSelect-${index}')" class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Adicionar</button>
      </div>
    `;
  });
}

renderProducts();

function filterProducts() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase();
  const filtered = products.filter(product => product.name.toLowerCase().includes(searchValue));
  renderProducts(filtered);
}

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
      cartList.innerHTML += `
        <li class="flex justify-between items-center border p-2 rounded mb-1">
          <span>${item}</span>
          <button onclick="removeFromCart(${index})" class="bg-red-500 text-white text-xs px-2 py-1 rounded">Remover</button>
        </li>
      `;
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
    alert('O carrinho esta vazio.');
    return;
  }
  const summary = document.getElementById('checkoutSummary');
  summary.innerHTML = '';
  cartItems.forEach(item => {
    summary.innerHTML += `<li>${item}</li>`;
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

function showProductDetail(index) {
  const product = products[index];
  const detailImage = document.getElementById('detailImage');
  const className = product.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-').replace(/ç/g, 'c');

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
  if (currentProductIndex === null) return;
  const product = products[currentProductIndex];
  let selectedSize = prompt("Selecione o tamanho (P, M, G, GG):", "M");
  if (selectedSize) {
    selectedSize = selectedSize.toUpperCase().trim();
    if (["P", "M", "G", "GG"].includes(selectedSize)) {
      cartItems.push(`${product.name} - Tamanho: ${selectedSize}`);
      updateCartDisplay();
      closeProductDetail();
      openCheckoutModal();
      alert(`${product.name} (Tamanho: ${selectedSize}) adicionado ao carrinho.`);
    } else {
      alert("Tamanho invalido.");
    }
  }
}

function openAddProductModal() {
  document.getElementById('addProductModal').classList.remove('hidden');
  document.getElementById('addProductModal').classList.add('flex');
}

function closeAddProductModal() {
  document.getElementById('addProductModal').classList.add('hidden');
  document.getElementById('addProductModal').classList.remove('flex');
}

function submitNewProduct(event) {
  event.preventDefault();
  const name = document.getElementById('newProductName').value;
  let price = document.getElementById('newProductPrice').value;
  const description = document.getElementById('newProductDescription').value;

  if (!price.startsWith('R$')) {
    price = 'R$ ' + price;
  }

  products.push({ name, price, description });
  renderProducts();
  closeAddProductModal();
  alert('Produto adicionado com sucesso!');
}

let currentProductIndex = null;
