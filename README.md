# Casorio

Site estático com 2 páginas para lista de presentes de casamento:

- Página principal com sugestão de presentes e botão de reserva.
- Página de carrinho fictício mostrando itens já reservados.
- Valores formatados em euro (pt-PT).
- Confirmação por WhatsApp com mensagem pronta.
- Dados de pagamento por MB Way e transferência bancária (IBAN).

## Estrutura

- `index.html`: lista de presentes.
- `carrinho.html`: carrinho fictício.
- `styles.css`: estilos das páginas.
- `data.js`: base de presentes e funções de persistência.
- `main.js`: lógica da página principal.
- `cart.js`: lógica da página do carrinho.

## Como publicar no GitHub Pages

1. Faça push do repositório para o GitHub.
2. No GitHub, abra **Settings** do repositório.
3. Entre em **Pages**.
4. Em **Build and deployment**, escolha:
	- **Source**: `Deploy from a branch`
	- **Branch**: `main` (ou `master`) e pasta `/ (root)`
5. Salve e aguarde o deploy.

A URL publicada ficará no formato:

`https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/`

## Observações

- O carrinho é fictício e usa `localStorage` do navegador.
- As reservas existem apenas no navegador/dispositivo de quem acessa.

## Personalização rápida

Edite o objeto `CONTACT_CONFIG` em `data.js` para definir:

- Número de WhatsApp (formato internacional, ex: 3519XXXXXXXX)
- MB Way
- IBAN (ex: PT50XXXXX)