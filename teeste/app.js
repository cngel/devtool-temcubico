let stores = [
    { id: 1, name: 'Papelaria Santa Ana', description: 'Materiais escolares de qualidade', owner: 'Maria Silva', productCount: 12 },
    { id: 2, name: 'Livraria Saber', description: 'Livros didáticos e paradidáticos', owner: 'João Santos', productCount: 25 },
    { id: 3, name: 'Uniformes Plus', description: 'Uniformes escolares completos', owner: 'Ana Costa', productCount: 8 },
    { id: 4, name: 'Tech Estudante', description: 'Eletrônicos e acessórios para estudantes', owner: 'Carlos Mendes', productCount: 15 }
];

let products = [
    { id: 1, name: 'Caderno Universitário 10 Matérias', price: 25.90, category: 'Material Escolar', storeName: 'Papelaria Santa Ana', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&h=200&fit=crop', description: 'Caderno espiral com 200 folhas' },
    { id: 2, name: 'Kit Canetas Coloridas', price: 15.50, category: 'Material Escolar', storeName: 'Papelaria Santa Ana', image: 'https://images.unsplash.com/photo-1586864387634-27b14e2c353b?w=300&h=200&fit=crop', description: 'Conjunto com 12 canetas coloridas' },
    { id: 3, name: 'Livro de Matemática - 9º Ano', price: 89.90, category: 'Livros', storeName: 'Livraria Saber', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop', description: 'Livro didático completo com exercícios' },
    { id: 4, name: 'Uniforme Completo - Tamanho M', price: 120.00, category: 'Uniformes', storeName: 'Uniformes Plus', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=200&fit=crop', description: 'Camisa, calça e jaqueta' },
    { id: 5, name: 'Calculadora Científica', price: 45.00, category: 'Eletrônicos', storeName: 'Tech Estudante', image: 'https://images.unsplash.com/photo-1611867967258-7f9b3e96a2d7?w=300&h=200&fit=crop', description: 'Calculadora com funções avançadas' },
    { id: 6, name: 'Mochila Escolar Grande', price: 79.90, category: 'Material Escolar', storeName: 'Papelaria Santa Ana', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop', description: 'Mochila resistente com vários compartimentos' },
    { id: 7, name: 'Dicionário de Português', price: 55.00, category: 'Livros', storeName: 'Livraria Saber', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=200&fit=crop', description: 'Dicionário completo atualizado' },
    { id: 8, name: 'Tênis Esportivo', price: 95.00, category: 'Uniformes', storeName: 'Uniformes Plus', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop', description: 'Tênis confortável para educação física' }
];

let filters = {
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 1000
};

// Funções auxiliares
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

// Navegação
function switchScreen(screenName) {
    $$('.screen').forEach(screen => screen.classList.remove('active'));
    $(`#${screenName}Screen`).classList.add('active');
    
    $$('.nav-item').forEach(item => item.classList.remove('active'));
    $(`.nav-item[data-screen="${screenName}"]`)?.classList.add('active');
}

// Modals
function openModal(modalId) {
    $(`#${modalId}`).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    $(`#${modalId}`).classList.remove('active');
    document.body.style.overflow = '';
}

// Renderizar produtos
function renderProducts() {
    const grid = $('#productsGrid');
    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category === '' || p.category === filters.category;
        const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: #8e8e93;">
                <p>Nenhum produto encontrado</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(p => `
        <div class="product-card">
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}">
            </div>
            
            <div class="product-info">
                <h3 class="product-name">${p.name}</h3>
                <p class="product-store">${p.storeName}</p>
                <div class="product-footer">
                    <span class="product-price">AOA ${p.price.toFixed(2)}</span>
                    <span class="product-category">${p.category}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Renderizar lojas
function renderStores() {
    const list = $('#storesList');
    list.innerHTML = stores.map(s => `
        <div class="store-card">
            <div class="store-header">
                <h3 class="store-name">${s.name}</h3>
                <span class="store-count">${s.productCount} produtos</span>
            </div>
            <p class="store-description">${s.description}</p>
            <p class="store-owner">Por ${s.owner}</p>
        </div>
    `).join('');
}

// Atualizar select de lojas
function updateStoreSelect() {
    const select = $('#productStore');
    select.innerHTML = '<option value="">Selecione uma loja</option>' +
        stores.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Navegação inferior
    $$('.nav-item[data-screen]').forEach(item => {
        item.addEventListener('click', () => {
            switchScreen(item.dataset.screen);
        });
    });

    // Botão adicionar
    $('#addBtn').addEventListener('click', () => {
        openModal('addMenuModal');
    });

    // Busca
    $('#searchInput').addEventListener('input', (e) => {
        filters.search = e.target.value;
        renderProducts();
    });

    // Filtro de categoria
    $$('.category-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            $$('.category-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            filters.category = chip.dataset.category;
            renderProducts();
        });
    });

    // Botão filtro de preço
    $('#priceFilterBtn').addEventListener('click', () => {
        openModal('priceRangeModal');
    });

    // Modal add menu
    $('#btnCreateStore').addEventListener('click', () => {
        closeModal('addMenuModal');
        openModal('createStoreModal');
    });

    $('#btnCreateProduct').addEventListener('click', () => {
        closeModal('addMenuModal');
        updateStoreSelect();
        openModal('createProductModal');
    });

    // Fechar modals
    $$('.modal-backdrop, .modal-close').forEach(el => {
        el.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) closeModal(modal.id);
        });
    });

    // Form criar loja
    $('#storeForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newStore = {
            id: stores.length + 1,
            name: $('#storeName').value,
            owner: $('#storeOwner').value,
            description: $('#storeDescription').value,
            productCount: 0
        };
        stores.push(newStore);
        renderStores();
        updateStoreSelect();
        $('#storeForm').reset();
        closeModal('createStoreModal');
    });

    // Form criar produto
    $('#productForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const storeName = $('#productStore').value;
        const newProduct = {
            id: products.length + 1,
            name: $('#productName').value,
            price: parseFloat($('#productPrice').value),
            category: $('#productCategory').value,
            storeName: storeName,
            description: $('#productDescription').value,
            image: $('#productImage').value || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop'
        };
        products.push(newProduct);
        
        // Atualizar contador de produtos da loja
        const store = stores.find(s => s.name === storeName);
        if (store) store.productCount++;
        
        renderProducts();
        renderStores();
        $('#productForm').reset();
        closeModal('createProductModal');
    });

    // Filtro de preço
    const minRange = $('#minRange');
    const maxRange = $('#maxRange');
    const minInput = $('#minPriceInput');
    const maxInput = $('#maxPriceInput');
    const minLabel = $('#minPriceLabel');
    const maxLabel = $('#maxPriceLabel');

    function updatePriceInputs() {
        minInput.value = minRange.value;
        maxInput.value = maxRange.value;
    }

    function updatePriceRanges() {
        minRange.value = minInput.value;
        maxRange.value = maxInput.value;
    }

    minRange.addEventListener('input', () => {
        if (parseInt(minRange.value) > parseInt(maxRange.value) - 10) {
            minRange.value = parseInt(maxRange.value) - 10;
        }
        updatePriceInputs();
    });

    maxRange.addEventListener('input', () => {
        if (parseInt(maxRange.value) < parseInt(minRange.value) + 10) {
            maxRange.value = parseInt(minRange.value) + 10;
        }
        updatePriceInputs();
    });

    minInput.addEventListener('input', updatePriceRanges);
    maxInput.addEventListener('input', updatePriceRanges);

    $('#applyPriceFilter').addEventListener('click', () => {
        filters.minPrice = parseInt(minInput.value);
        filters.maxPrice = parseInt(maxInput.value);
        minLabel.textContent = filters.minPrice;
        maxLabel.textContent = filters.maxPrice;
        renderProducts();
        closeModal('priceRangeModal');
    });

    // Renderização inicial
    renderProducts();
    renderStores();
    updateStoreSelect();
});
