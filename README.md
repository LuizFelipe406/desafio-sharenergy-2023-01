# Desafio Sharenergy

   <summary><strong>👨‍💻 Como Rodar com Docker</strong></summary><br />

Neste projeto foi utilizado o docker-compose, portanto antes de começar garanta que esta usando a ultima versão disponivel:

- Clonar o repositório;
- Acessar a pasta raiz do projeto;
- Utilizar o comando: docker-compose up -d --build;
- Esse comando irá criar 3 containers: DB - rodando na porta 3002, BackEnd - rodando na porta 3001 e FrontEnd - rodando na porta 3000
- Portanto para visualizar o projeto e interagir com o FrontEnd, abra seu navegador e acesse a url: localhost:3000

Link para vídeo explicativo no Youtube: https://www.youtube.com/watch?v=F0sdBbd2F58

O Projeto também conta com testes de integração desenvolvidos para o back end siga o os passos abaixo para executa-los:

- Acesse o terminal do container backend atráves do comando: docker exec -it sharenergy_backend sh
- Execute o comando npm test
