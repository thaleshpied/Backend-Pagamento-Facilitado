# Backend API – Pagamento Facilitado

## Objetivo
Este projeto tem como objetivo a entrega de uma API RESTful como parte de um desafio técnico para a vaga de Desenvolvedor Back-end Pleno.

O foco está em demonstrar conhecimentos em desenvolvimento de APIs REST, uso do Git, capacidade analítica, organização de código e aplicação de boas práticas de desenvolvimento backend.


## Planejamento

A entrega do desafio está prevista para o prazo de uma semana. O desenvolvimento será realizado de forma incremental, priorizando arquitetura, qualidade do código (código limpo e organizado) e aderência aos requisitos propostos.

O planejamento macro está organizado nas seguintes fases:


### Fase 1 – Concepção, Análise e Setup Inicial
- Leitura e entendimento dos requisitos
- Criação do repositório
- Commit inicial com o setup do projeto utilizando o framework CodeIgniter 4
- Definição da arquitetura base do projeto


### Fase 2 – Modelagem e Base da API
- Modelagem inicial do domínio (conceitos principais do negócio)
- Estruturação das camadas da aplicação (Controllers, Services, Repositories)
- Criação dos primeiros endpoints REST
- Testes iniciais dos endpoints


### Fase 3 – Regras de Negócio
- Implementação das regras de negócio
- Validações de dados
- Tratamento de erros e exceções


### Fase 4 – Testes e Qualidade
- Implementação de testes de unidade e integração
- Revisão e refinamento do código visando manutenibilidade


### Fase 5 – Documentação e Refinamentos
- Documentação da API
- Revisão geral do projeto
- Propostas de melhorias arquiteturais
- Entrega final


## Arquitetura

O projeto seguirá uma arquitetura em camadas conforme indicado abaixo:

- **Controllers**: responsáveis por receber as requisições HTTP e delegar para os serviços
- **Services**: camada responsável pelas regras de negócio e orquestração dos fluxos
- **Models**: camada de persistência de dados
- **Exceptions**: exceções de domínio para regras de negócio
