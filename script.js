document.addEventListener('DOMContentLoaded', () => {
    
    const numeroWhatsApp = '5521982832778';

    const cartContainer = document.getElementById('cart-container');
    const cartIcon = cartContainer.querySelector('.cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart');
    const cartCountEl = document.getElementById('cart-count');
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const finalizeBtn = document.getElementById('btn-finalize');
    const addButtons = document.querySelectorAll('.btn-adicionar');

    // =======================================================
    // Recupera o carrinho salvo no localStorage (ou cria vazio)
    // =======================================================
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // --- FUNÇÕES ---

    // Salva o carrinho no localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Adiciona um item ao carrinho
    function addToCart(nome, preco) {
        const itemExistente = cart.find(item => item.nome === nome);
        if (itemExistente) {
            itemExistente.qtd++;
        } else {
            cart.push({ nome, preco: parseFloat(preco), qtd: 1 });
        }
        updateCart();
        animateCartIcon();
        saveCart();
    }

    // Remove um item do carrinho
    function removeFromCart(nome) {
        const itemIndex = cart.findIndex(item => item.nome === nome);
        if (itemIndex > -1) {
            const item = cart[itemIndex];
            if (item.qtd > 1) {
                item.qtd--;
            } else {
                cart.splice(itemIndex, 1);
            }
            updateCart();
            saveCart();
        }
    }

    // Anima o ícone do carrinho
    function animateCartIcon() {
        cartIcon.classList.add('cart-shake');
        setTimeout(() => {
            cartIcon.classList.remove('cart-shake');
        }, 500);
    }

    // Atualiza a interface do carrinho
    function updateCart() {
        cartItemsEl.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsEl.innerHTML = '<li>Seu carrinho está vazio.</li>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.className = 'cart-item';
                li.innerHTML = `
                    <div class="item-info">
                        <span>${item.qtd}x ${item.nome}</span>
                        <span>R$ ${(item.preco * item.qtd).toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button class="remove-btn" data-nome="${item.nome}">X</button>
                `;
                cartItemsEl.appendChild(li);
                total += item.preco * item.qtd;
                totalItems += item.qtd;
            });
        }

        cartCountEl.textContent = totalItems;
        cartTotalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    // Finaliza o pedido via WhatsApp
    function finalizeOrder() {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        let mensagem = 'Olá, gostaria de fazer o seguinte pedido:\n\n';
        let totalPedido = 0;

        cart.forEach(item => {
            mensagem += `*${item.qtd}x* - ${item.nome}\n`;
            totalPedido += item.preco * item.qtd;
        });

        mensagem += `\n*Total:* R$ ${totalPedido.toFixed(2).replace('.', ',')}`;
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(linkWhatsApp, '_blank');
    }

    // --- EVENTOS ---

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nome = button.dataset.nome;
            const preco = button.dataset.preco;
            addToCart(nome, preco);
        });
    });

    cartItemsEl.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const nome = event.target.dataset.nome;
            removeFromCart(nome);
        }
    });
    
    cartContainer.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });

    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    finalizeBtn.addEventListener('click', finalizeOrder);

    // =======================================================
    // Inicializa a interface com o carrinho salvo
    // =======================================================
    updateCart();
});
