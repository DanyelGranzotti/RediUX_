<p align="center">
  <img src="https://raw.githubusercontent.com/RediUX/RediUX/8a699d5e7859c1cd5d53c3a241a5bb358cd431ce/assets/favicon.svg" alt="Logo do RediUX">
</p>

<p align="center">
<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
</p>

## ️📖 Sobre o Projeto

O RediUX é uma aplicação web projetada para o compartilhamento de conteúdo educacional na área de User Experience (UX). Este repositório digital serve como uma plataforma centralizada onde materiais didáticos, como aulas, artigos, postagens e diversos tipos de mídia, são disponibilizados para enriquecer o processo de aprendizagem dos alunos.

## 🧑🏾‍💻 Desenvolvedores e Responsabilidades

- **[Luiz Eduardo](https://github.com/Luiz-Eduardo-BL)**: Tech Lead
- **[Jeferson Augusto](https://www.linkedin.com/in/jeferson-augusto-41a349294/)**: Desenvolvedor
- **[Danyel Granzotti](https://www.linkedin.com/in/danyel-granzotti/)**: Desenvolvedor
## 🛠️ Tecnologias Utilizadas

- **JavaScript**: Node.js no BackEnd e React no FrontEnd
- **Docker**: Para criação e gerenciamento dos ambientes de desenvolvimento e produção

## ▶️ Como Rodar o Projeto

Para iniciar sua jornada com o RediUX, siga os passos abaixo:

1. Clone o repositório com o comando: 

``` shell
git clone https://github.com/RediUX/RediUX_.git
```

2. Construa o ambiente utilizando Docker com: 

```shell
docker-compose build
```

3. Inicie os serviços em modo 'detached' com: 

```shell
docker-compose up -d
```

4. Verifique os contêineres ativos com: 

```shell
docker ps
```

5. Acesse o projeto localmente via 

```shell
localhost:8080
```

6. Em caso de alterações no código, reinicie os serviços com: 

```shell
docker-compose up -d
```

Um novo build será necessário somente se houver mudanças nas configurações do Docker ou nas dependências que exijam reconstrução do contêiner.

Siga os passos com atenção para assegurar a correta configuração do projeto.

## 📑 Documentação Importante

- **Código de Conduta:** [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md)
- **Guia de Contribuição:** [CONTRIBUTING](CONTRIBUTING.md)
- **Licença de Uso:** [LICENSE](LICENSE.md)
- **Segurança:** [SECURITY](SECURITY.md)
- **Template de Pull Request:** [PULL_REQUEST_TEMPLATE](.github/PULL_REQUEST_TEMPLATE.md)
- **Template de Issue:** [ISSUE_TEMPLATE](.github/ISSUE_TEMPLATE.md)
- **Padroes de Commits:** [COMMITS_GUIDE](https://github.com/RediUX/Padroes-de-Commits/blob/main/README.md)

## 📌 Branches

- `main`: Código estável e pronto para produção.
- `developer`: Desenvolvimento e testes.

Contribua para o RediUX e ajude a moldar o futuro do aprendizado em User Experience!
