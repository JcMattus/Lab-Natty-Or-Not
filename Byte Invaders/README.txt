# 🎮 Byte Invaders

**Bem-vindo ao Byte Invaders!** Prepare-se para uma aventura arcade retro repleta de ação, upgrades e chefões épicos. 🚀👾

---

## 📦 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/byte-invaders.git
   ```
2. Entre na pasta do projeto:

   ```bash
   cd byte-invaders
   ```
3. Abra o `index.html` no navegador (não precisa de servidor). 🌐

---

## 🕹️ Controles

* **Movimentação:** mova o mouse horizontalmente para mover a nave. 🎯
* **Tiro automático:** sempre ativo. 🔫
* **Boosts:** colete power-ups para alterar o tipo de tiro. 💎

---

## 🚀 Funcionalidades Principais

* **Tiros Variados:** single, double, triple. 🎯
* **Boosts / Power-Ups:** formatos distintos para cada tipo (double, triple). 💎
* **Formações de Inimigos:** 4 linhas fixas, colunas crescentes por fase. 👾
* **Dificuldade Progressiva:** HP dos inimigos aumenta a cada 3 fases.
* **Chefe Dinâmico:** a cada 10 fases um novo chefe aparece, com variações visuais e vida proporcional:

  * Fase 10 → `boss_variation1.png` (HP 100)
  * Fase 20 → `boss_variation2.png` (HP 200)
  * Fase 30 → `boss_variation3.png` (HP 300)
  * Fase 40 → `boss_variation4.png` (HP 400)
  * Fase 50 → `boss_variation5.png` (HP 500)
  * Fase 60 → `boss_variation6.png` (HP 600)
  * Fase 70 → `boss_variation7.png` (HP 700)
  * Fase 80 → `boss_variation8.png` (HP 800)
  * Fase 90 → `boss_variation9.png` (HP 900)
  * Fase 100 → `boss_variation10.png` (HP 1000)
* **Movimentação Suave:** nave segue o mouse de forma fluida. 🖱️
* **Barra de Vida do Chefão:** exibe progresso até derrota. ❤️‍🔥
* **Placar de Top-5:** pontuações e fases, persistido no `localStorage`. 🏆🚩

---

## 🎨 Sprites & Assets

Todos os sprites estão na pasta `sprites/`:

```
sprites/
├── player_ship.png
├── enemy_bug.png
├── enemy_error.png
├── enemy_comment.png
├── enemy_firewall.png
├── enemy_boss.png
│
├── shot_single.png
├── shot_double.png
├── shot_triple.png
│
├── boost_double.png
├── boost_triple.png
│
├── fx_explosion.png
├── fx_explosion_boss.png
├── fx_boost_collect.png
│
├── background_full.png
│
├── hud_score.png
│
├── boss_variation1.png
├── boss_variation2.png
├── boss_variation3.png
├── boss_variation4.png
├── boss_variation5.png
├── boss_variation6.png
├── boss_variation7.png
├── boss_variation8.png
├── boss_variation9.png
└── boss_variation10.png
```

> Todos com fundo transparente, exceto `background_full.png`. 🎨

---

## 📜 Histórico de Versões

* **v1.0:** Versão inicial com tiro manual e inimigos estáticos. 🔰
* **v1.1:** Tiro automático. 🔫
* **v1.2:** Boosts e múltiplos tipos de tiro. 💥
* **v1.3:** Movimentação suave e descida ajustada. 🛠️
* **v1.4:** Fundo integrado (background + chão). 🌌
* **v1.5:** Remoção de tiros e boosts quadruple/laser. 🧹
* **v1.6:** Preload de sprites. ⚡
* **v1.7:** Barra de vida do chefão. ❤️‍🔥
* **v1.8:** Placar de Top-5 pontuações e fases. 🏆🚩
* **v2.0:** Chefe dinâmico a cada 10 fases com 10 variações e vida proporcional. 🚀

---

## 🤝 Contribuições

Pull requests e issues são bem-vindos! 🐛✨

---

## 🎉 Agradecimentos

Obrigado por jogar Byte Invaders! Boa sorte nas galáxias digitais. 🌠

© 2025 Julio Cesar Mattus. Todos os direitos reservados.
