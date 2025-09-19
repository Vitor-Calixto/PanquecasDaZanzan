document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================================
    // !! IMPORTANTE: MUDE AQUI O SEU NÚMERO DE WHATSAPP !!
    // Formato: 55 (código país) + 21 (DDD) + 999999999 (número)
    const numeroWhatsApp = '5521982832778';
    // =======================================================

    const cartContainer = document.getElementById('cart-container');
    const cartIcon = cartContainer.querySelector('.cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart');
    const cartCountEl = document.getElementById('cart-count');
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const finalizeBtn = document.getElementById('btn-finalize');
    const addButtons = document.querySelectorAll('.btn-adicionar');

    let cart = []; // Array para guardar os itens do carrinho

    // --- FUNÇÕES ---

    // Adiciona um item ao carrinho
    function addToCart(nome, preco) {
        // Verifica se o item já existe para incrementar a quantidade
        const itemExistente = cart.find(item => item.nome === nome);
        
        if (itemExistente) {
            itemExistente.qtd++;
        } else {
            cart.push({ nome, preco: parseFloat(preco), qtd: 1 });
        }
        
        updateCart();
        animateCartIcon();
    }

    // =======================================================
    // !! FUNÇÃO NOVA PARA REMOVER ITEM DO CARRINHO !!
    // =======================================================
    function removeFromCart(nome) {
        const itemIndex = cart.findIndex(item => item.nome === nome);

        // Se o item for encontrado no carrinho
        if (itemIndex > -1) {
            const item = cart[itemIndex];

            if (item.qtd > 1) {
                // Se a quantidade for maior que 1, apenas diminui a quantidade
                item.qtd--;
            } else {
                // Se a quantidade for 1, remove o item inteiro do array
                cart.splice(itemIndex, 1);
            }

            updateCart(); // Atualiza a exibição do carrinho
        }
    }

    // Anima o ícone do carrinho
    function animateCartIcon() {
        cartIcon.classList.add('cart-shake');
        setTimeout(() => {
            cartIcon.classList.remove('cart-shake');
        }, 500); // Duração da animação
    }

    // =======================================================
    // !! FUNÇÃO MODIFICADA PARA EXIBIR O BOTÃO DE REMOVER !!
    // =======================================================
    function updateCart() {
        cartItemsEl.innerHTML = ''; // Limpa a lista para renderizar de novo
        let total = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsEl.innerHTML = '<li>Seu carrinho está vazio.</li>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                // MODIFICADO: Adicionado um layout flex e o botão de remover
                li.className = 'cart-item'; // Adiciona uma classe para estilização
                li.innerHTML = `
                    <div class="item-info">
                        <span>${item.qtd}x ${item.nome}</span>
                        <span>R$ ${(item.preco * item.qtd).toFixed(2).replace('.',',')}</span>
                    </div>
                    <button class="remove-btn" data-nome="${item.nome}">X</button>
                `;
                cartItemsEl.appendChild(li);
                
                total += item.preco * item.qtd;
                totalItems += item.qtd;
            });
        }
        
        cartCountEl.textContent = totalItems;
        cartTotalEl.textContent = `R$ ${total.toFixed(2).replace('.',',')}`;
    }
    
    // Gera a mensagem e redireciona para o WhatsApp
    function finalizeOrder() {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        let mensagem = 'Olá, gostaria de fazer o seguinte pedido:\n\n'; //Mensagem exibida no Whatsapp
        let totalPedido = 0;

        cart.forEach(item => {
            mensagem += `*${item.qtd}x* - ${item.nome}\n`;
            totalPedido += item.preco * item.qtd;
        });

        mensagem += `\n*Total:* R$ ${totalPedido.toFixed(2).replace('.',',')}`; // Pedido anexadoma mensagem no Whatsapp

        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`; // link para abrir o Whatspp e o campo de mensagem
        
        window.open(linkWhatsApp, '_blank'); // Abre o Whatsapp no navegador
    }

    // --- EVENTOS ---

    // Adicionar item ao clicar no botão
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const nome = button.dataset.nome;
            const preco = button.dataset.preco;
            addToCart(nome, preco);
        });
    });

    // =======================================================
    // !! NOVO EVENTO PARA "ESCUTAR" CLIQUES NOS BOTÕES DE REMOVER !!
    // =======================================================
    cartItemsEl.addEventListener('click', (event) => {
        // Verifica se o elemento clicado é um botão de remover
        if (event.target.classList.contains('remove-btn')) {
            // Pega o nome do item a partir do atributo data-nome
            const nome = event.target.dataset.nome;
            removeFromCart(nome);
        }
    });
    
    // Abrir a aba do carrinho
    cartContainer.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });

    // Fechar a aba do carrinho
    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    // Finalizar pedido
    finalizeBtn.addEventListener('click', finalizeOrder);

    // Inicializa o carrinho na tela
    updateCart();
});