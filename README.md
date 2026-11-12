# Convites

O convite do Isaac usa a `main` como fonte e é publicado na raiz e em `/isaac`.
Os demais convites mantêm suas próprias branches e caminhos no GitHub Pages:

| Convite | Branch fonte | Endereço |
| --- | --- | --- |
| Isaac | `main` | https://festas.convidei.digital/ |
| Isaac | `main` | https://festas.convidei.digital/isaac/ |
| Casamento | `casamento` | https://festas.convidei.digital/casamento/ |
| Melinda | `melinda` | https://festas.convidei.digital/melinda/ |
| Pérola | `perola` | https://festas.convidei.digital/perola/ |

## Nome do convidado

O convite da `main` recebe o nome pelo parâmetro `nome`, por exemplo:
`https://festas.convidei.digital/isaac/?nome=Nome%20do%20convidado`.
O mesmo parâmetro funciona na raiz. O nome aparece no envelope, no cabeçalho
após a abertura e no registro de confirmação de presença. Sem um nome informado,
o convite usa “Você”. A seção e o botão de mimos permanecem removidos.

O nome deve ficar após `?nome=`, e não como um novo caminho: a publicação
estática não cria páginas individuais para convidados. Para nomes com espaços
ou caracteres especiais, gere o parâmetro com `URLSearchParams`.

## Publicação

Edite e envie as alterações na branch do convite correspondente. O workflow
`Publish updated invitation` solicita uma publicação completa pela `main`.
Alterações na `main` também iniciam a publicação dos dois endereços do Isaac.
Não é necessária uma branch `isaac`. A branch `feat/melinda`
permanece como referência histórica e não publica o site.

O workflow `.github/workflows/nextjs.yml`, mantido na `main`, fixa quatro fontes:
o commit da `main` que iniciou a execução e os commits atuais de `casamento`,
`melinda` e `perola`. Ele gera cinco exportações: duas do mesmo commit da `main`,
com os prefixos da raiz e de `/isaac`, e uma de cada convite restante. Os
artefatos têm nomes separados por destino e são reunidos em um único site,
preservando os caminhos existentes. A publicação só acontece se todas as cinco
exportações forem concluídas.

Para publicar novamente sem novos commits, execute `Deploy invitations to Pages`
na aba Actions, selecionando a branch `main`. Não execute o workflow antigo
diretamente em branches históricas, pois ele publica apenas um convite.

As branches de convite precisam manter `.github/workflows/publish-invitation.yml`
para solicitar a publicação. Não é necessário mesclar o conteúdo dos convites
na `main`. O ambiente `github-pages` continua permitindo publicação apenas pela
`main`; nenhum token pessoal ou segredo novo é necessário para os workflows.

## Caminhos e desenvolvimento

`NEXT_PUBLIC_BASE_PATH` define o caminho do convite durante a compilação. Sem
essa variável, o projeto continua funcionando na raiz em desenvolvimento.
`NEXT_PUBLIC_SITE_URL` define a origem pública usada nos metadados de
compartilhamento, sem incluir o caminho do convite.

O workflow obtém o domínio e o caminho do repositório da configuração do Pages.
Assim, também respeita o prefixo do repositório ao usar um endereço `github.io`.
Imagens, áudio, fundos e arquivos do Next.js usam o prefixo da respectiva versão.

A confirmação de presença mantém a integração existente com o Firebase.
Esta configuração separa a publicação dos convites, sem migrar os dados.
