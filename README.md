
# 🥞 Panquecas-da-Zanzan

Um site simples e estilizado para a panquecaria **Panquecas da Zanzan**, desenvolvido em **HTML, CSS e JavaScript**, com suporte a carrinho de compras e integração direta com o **WhatsApp** para finalizar pedidos.

---

## 🚀 Funcionalidades

- Exibição de cardápio com imagens e preços.
- Carrossel de fotos das panquecas.
- Páginas individuais para cada produto.
- Carrinho de compras interativo:
  - Adicionar e remover itens.
  - Exibição dinâmica do valor total.
- Finalização de pedidos via WhatsApp.

---

## 📂 Estrutura do Projeto

```
.
├── index.html       # Página inicial com galeria e carrinho
├── p1.html ... p6.html  # Páginas de detalhes de cada panqueca
├── style.css        # Estilos globais do site
├── script.js        # Lógica do carrinho de compras e integração com WhatsApp
└── img/             # Imagens utilizadas no site
```

---

## ⚙️ Como Usar

1. Baixe ou clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/panquecas-da-zanzan.git
   ```

2. Abra o arquivo `index.html` no navegador.

3. Para que a finalização do pedido funcione corretamente:
   - Edite o arquivo **`script.js`**
   - Substitua o número de WhatsApp na linha:
     ```js
     const numeroWhatsApp = '55SEUNUMEROAQUI';
     ```
   - Formato esperado: `55` + DDD + número.  
     Exemplo: `5521999999999`

---

## 🖼️ Pré-visualização

![Preview do Site](img/CSC_0610[1].JPG)

---

## 📌 Tecnologias Utilizadas

- **HTML5**
- **CSS3** (com **Bootstrap** para layout responsivo)
- **JavaScript** (DOM e integração com WhatsApp)
- **Font Awesome** (ícones)

---

## ✨ Créditos

Feito com ❤ e muita calda pela equipe **Panquecas da Zanzan**.

