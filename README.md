# Website Cecílias e Buarques — Sistema de Gestão de Integrantes

## Deploy (Vercel ou Cloudflare Pages)

1. `git init && git add . && git commit -m "primeira versão"` nesta pasta
2. Sobe pro seu repo `rpolitoc/WS-CECIBUS` no GitHub:
   ```
   git remote add origin https://github.com/rpolitoc/WS-CECIBUS.git
   git push -u origin main
   ```
3. Na Vercel ou Cloudflare Pages: "Import Project" → conecta o repo → configura:
   - Build command: `pnpm install && pnpm exec parcel build index.html --dist-dir dist`
   - Output directory: `dist`
4. Deploy. Pronto — PWA instalável no domínio que a hospedagem te der.

## Rodar localmente (opcional, pra testar antes de subir)

```
pnpm install
pnpm exec parcel index.html
```
