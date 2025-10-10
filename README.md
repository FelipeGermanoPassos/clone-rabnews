## WoW News (integração com Blizzard API)

Este repositório agora inclui um exemplo de integração com a API da Blizzard (Battle.net) para recuperar
notícias do World of Warcraft e exibi-las em uma página.

Como usar (desenvolvimento):

- Crie um aplicativo em https://develop.battle.net para obter `Client ID` e `Client Secret`.
- Adicione-as em `config/.env.development`:

```
BLIZZARD_CLIENT_ID=seu_id_aqui
BLIZZARD_CLIENT_SECRET=seu_secret_aqui
BLIZZARD_REGION=us
```

- Inicie os serviços do docker (se quiser o banco local):

```bash
npm run services:up
```

- Rode o servidor Next.js:

```bash
npm run dev
```

- Acesse a página de notícias em `http://localhost:3000/wow-news`.

Se as credenciais não estiverem configuradas, a rota `/api/v1/wow/news` retornará um item mock para
desenvolvimento.
