## Sistema Inteligente de Velocidade

Ecossistema de Internet das Coisas (IoT) para telemetria em tempo real, integrando hardware embarcado, API em Node.js e painel web monitorado.

---

### 🛠️ Componentes do Sistema

* **Firmware (ESP32-S3):** Desenvolvido em C/C++ utilizando interrupções de hardware (`attachInterrupt`) para capturar com precisão os pulsos magnéticos de um Sensor Hall. Realiza o cálculo da velocidade em km/h com base na circunferência da roda e envia os dados via requisições HTTP POST em formato JSON através da rede Wi-Fi.
* **Backend e Banco de Dados:** API desenvolvida em Node.js com Express que disponibiliza rotas de ingestão (`POST /api/velocidade`) e de consulta (`GET /api/ultima-velocidade`). Os dados de telemetria são persistidos em um banco de dados relacional MySQL.
* **Dashboard Web:** Interface desenvolvida com HTML5, CSS3 e JavaScript estruturado. O frontend realiza um consumo assíncrono (Polling com `setInterval` a cada 1 segundo) via Fetch API para atualizar dinamicamente o valor do velocímetro digital, exibição do odômetro e o status de conectividade do sistema.
