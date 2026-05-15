const urlAPI = 'http://localhost:3000/api/ultima-velocidade';
const elVelocidade = document.getElementById('vel');
const elStatus = document.getElementById('status');

// Função que busca os dados do servidor Node.js
async function atualizarPainel() {
    try {
        const resposta = await fetch(urlAPI);
        if (!resposta.ok) throw new Error('Erro na requisição');
        
        const dados = await resposta.json();
        
        // Atualiza a velocidade na tela com uma casa decimal
        elVelocidade.textContent = dados.velocidade.toFixed(1);
        
        // Atualiza o status visual
        elStatus.textContent = "Online";
        elStatus.className = "status-online"; // Certifique-se de ter essa classe no CSS
        
    } catch (erro) {
        console.error('Falha ao conectar com o servidor:', erro);
        elStatus.textContent = "Servidor Offline";
        elStatus.className = "status-offline"; // Crie uma classe vermelha no CSS para o erro
    }
}

// Executa a função a cada 1000 milissegundos (1 segundo)
setInterval(atualizarPainel, 1000);

// Executa logo ao carregar a página pela primeira vez
atualizarPainel();