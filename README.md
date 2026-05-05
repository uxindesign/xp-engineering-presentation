
# Apresentação - XP Engineering

Apresentação interativa em React/Vite. O projeto original está disponível no Figma:
https://www.figma.com/design/LCkruRFucEFhu3hfPHgLPk/Apresenta%C3%A7%C3%A3o---XP-Engineering.

## Rodando localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Publicando no GitHub Pages

Este projeto já inclui o workflow `.github/workflows/deploy.yml`.

1. Crie um repositório no GitHub.
2. Envie este projeto para a branch `main`.
3. No GitHub, acesse `Settings > Pages`.
4. Em `Build and deployment`, selecione `GitHub Actions`.
5. Faça push na branch `main`.

Depois do workflow concluir, o link ficará disponível em:

```text
https://SEU_UTILIZADOR.github.io/NOME_DO_REPOSITORIO/
```
