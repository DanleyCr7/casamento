# Convites

Cada convite tem sua própria branch e seu próprio caminho no GitHub Pages:

| Branch | Endereço |
| --- | --- |
| `main` | https://festas.convidei.digital/ |
| `casamento` | https://festas.convidei.digital/casamento/ |
| `melinda` | https://festas.convidei.digital/melinda/ |
| `perola` | https://festas.convidei.digital/perola/ |

## Publicação

Edite e envie as alterações na branch do convite correspondente. O workflow
`Publish updated invitation` solicita uma publicação completa pela `main`.
Alterações na `main` também iniciam a publicação. A branch `feat/melinda`
permanece como referência histórica e não publica o site.

O workflow `.github/workflows/nextjs.yml`, mantido na `main`, fixa os commits das
três branches, exporta cada convite separadamente e reúne os resultados em um
único site. A raiz continua usando a versão da `main`, preservando os links
existentes. A publicação só acontece se todas as exportações forem concluídas.

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
