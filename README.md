# Lab-Natty-Or-Not

# 🎮 Byte Invaders 😉

## 📒 Descrição
Byte Invaders é um shooter arcade retro inspirado em Space Invaders, totalmente rodando no navegador. O jogador controla uma nave que se move suavemente seguindo o mouse, com disparo automático e vários tipos de projéteis. Inimigos em formações dinâmicas descem em 4 linhas fixas, colunas que crescem a cada fase e chefões especiais a cada dez fases, cada um com visual único e barra de energia. Um placar persistente de top‐5 pontuações e top‐5 fases fica sempre à vista do jogador. 🌌👾

## 🤖 Tecnologias Utilizadas
- **HTML5 Canvas & JavaScript**: motor de jogo, lógica de atualização e desenho na tela.  
- **LocalStorage**: para persistir Top-5 pontuações e fases mesmo após fechar o jogo.  
- **OpenAI (ChatGPT + image_gen)**: geração dos scripts, lógica de game loop e criação inicial de sprites.  
- **Python / PIL**: corte e tratamento de sprite sheets para variações do boss e power-ups.  
- **Ferramentas de design pixel art**: ajustes manuais e finalização dos ícones e efeitos (explosões, boosts).  

## 🧐 Processo de Criação
1. **Planejamento de mecânicas**: definimos tiro automático, tipos de projétil (single, double, triple), power-ups e formação de inimigos.  
2. **Iteração de código**: construímos o loop principal, update/draw, colisões e sistema de fases.  
3. **Design de arte**: geramos sprites com IA e refinamos cores/formas; recortamos variações do chefão usando Python.  
4. **Layout e UI**: criamos um grid CSS para centralizar canvas, adicionar placares laterais, título e rodapé.  
5. **Testes e ajustes**: ajustamos taxa de drop, explodimos power-ups não coletados e calibramos velocidades e espaçamentos.  

## 🚀 Resultados
- **Jogo completo** que roda em qualquer navegador moderno, sem dependências externas.  
- **Experiência fluida**, com movimento suave, fases progressivas e chefões variados.  
- **Interface clara**: placar de pontuações e fases sempre visíveis, HUD de pontos integrado.  
- **Arte coesa**: sprites em pixel art com fundo transparente, efeitos visuais e tema retro.  

## 💭 Reflexão 
Criar um jogo “natty” com o apoio de IA foi um desafio de equilíbrio: a IA acelerou muito a geração de código e arte, mas exigiu revisão cuidadosa para manter consistência e estilo. Ajustar centralização, responsividade e pequenos detalhes (drop rate, explosões, layout) mostrou que, mesmo com IA, a parte humana de refinamento e testes é fundamental. 😊🚀

