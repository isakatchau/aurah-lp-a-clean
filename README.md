# AURAH · Landing Page — Versão A (Clean)

Landing page de conversão da **AURAH Marketing & Vendas**, construída a partir do conteúdo oficial de apresentação da empresa e dos princípios do *Conversion Playbook for Marketing Agency Websites* (V4, WebFX, NoGood, Disruptive, Single Grain, NP Digital).

Esta é a **Versão A — Clean**: sem elementos 3D. Mais rápida, mais sóbria, funciona igual em qualquer dispositivo. É a versão base.

> Para a variante com camada 3D (pirâmide rotacionando, tilt nos cards, cursor magnético, mesh gradient animado, reveals scroll-driven), veja o repositório [`aurah-lp-b-3d`](https://github.com/isakatchau/aurah-lp-b-3d).

---

## Como abrir

É um arquivo HTML único, sem build step. Duas opções:

**1. Abrir direto no navegador**

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

**2. Rodar um servidor local** (recomendado para testar responsividade real)

```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .

# VS Code
# Extensão "Live Server" → clicar "Go Live"
```

Depois acessar `http://localhost:8080`.

---

## Estrutura da página

Segue o blueprint de 12 seções do playbook de conversão:

1. **Nav fixa** — logo, menu, CTA WhatsApp
2. **Hero** — "O nosso negócio é impulsionar o seu" + CTA primário + trust badges
3. **Strip de plataformas** — Instagram, Facebook, TikTok, Meta Ads, Google Ads
4. **Pain section** — "Presença digital sem resultado é custo"
5. **Método AURAH** — 4 passos: Diagnóstico · Estratégia · Execução · Otimização
6. **Serviços** — Gestão de Redes Sociais + Tráfego Pago
7. **Diferenciais** — 6 compromissos
8. **Para quem** — "combina se..." / "não é pra você se..."
9. **Fundador** — Raul Arruda
10. **FAQ** — 6 objeções clássicas respondidas
11. **CTA final** — bloco laranja com WhatsApp
12. **Footer** — contato, redes, navegação

---

## Tecnologia

- **HTML5 + CSS puro + JS vanilla** (zero dependência runtime além de Google Fonts)
- **Fontes:** Inter (corpo) + Space Grotesk (títulos)
- **Paleta:** gradient laranja (`#F25A0B` / `#FF7A2E` / `#8F2E05`) sobre off-white quente (`#FAF7F4`)
- **Responsivo:** mobile-first, breakpoints em 480px / 720px / 860px / 960px
- **Acessibilidade:** `prefers-reduced-motion` respeitado, semântica HTML correta, contraste AA
- **Performance:** arquivo único ~45 KB, zero requests externos além do Google Fonts

---

## Identidade da marca

Cores e linguagem visual inspiradas no Linktree oficial da AURAH (gradient laranja + tipografia branca + logo piramidal).

- **Instagram:** [@aurah.co](https://instagram.com/aurah.co)
- **WhatsApp:** [+55 11 98405-8674](https://wa.me/5511984058674)
- **E-mail:** aurah.mktdigital@gmail.com

---

## Customização rápida

Todas as cores, espaçamentos e tamanhos estão em variáveis CSS no topo do arquivo:

```css
:root{
  --orange-500: #F25A0B;   /* laranja principal */
  --orange-600: #E04A08;
  --ink:        #0F0F0F;   /* texto */
  --bg:         #FAF7F4;   /* fundo */
  --radius:     18px;
  --container:  1200px;
}
```

Trocar o número do WhatsApp: buscar `5511984058674` no HTML e substituir. O mesmo para Instagram, e-mail e links de navegação.

---

## Deploy

Como é HTML estático, deploy é instantâneo em qualquer hospedagem:

- **Vercel** → `vercel deploy`
- **Netlify** → arrastar a pasta em [app.netlify.com](https://app.netlify.com)
- **GitHub Pages** → Settings → Pages → Source: `main` branch / root
- **Cloudflare Pages** → conectar este repo

---

## Licença

Código e conteúdo produzidos para uso exclusivo da AURAH Marketing & Vendas.

© 2025 AURAH · Marketing & Vendas
