# Semente — Devocional Diário com IA

App SaaS de devocional personalizado com inteligência artificial. O usuário informa como está se sentindo e recebe um devocional com versículo, reflexão, aplicação prática e oração.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** + componentes UI custom
- **NextAuth.js v5** (JWT, Credentials provider)
- **Prisma v7** + SQLite (local) via libsql adapter
- **Fontes:** Playfair Display + Inter via next/font/google
- **Toasts:** Sonner

## Rodar localmente

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

O arquivo `.env` já está configurado para desenvolvimento local:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="semente-app-secret-key-change-in-production-32chars"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY=""   # opcional — para IA real
```

### 3. Criar o banco de dados

```bash
npm run db:push
```

### 4. Iniciar o servidor

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## Páginas

| URL | Descrição |
|-----|-----------|
| `/` | Landing page |
| `/login` | Login |
| `/cadastro` | Cadastro |
| `/dashboard` | Dashboard do usuário |
| `/gerar` | Gerar novo devocional |
| `/devocionais` | Histórico de devocionais |
| `/perfil` | Perfil e configurações |

## API Routes

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/auth/register` | POST | Criar conta |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handlers |
| `/api/devotional/generate` | POST | Gerar devocional |
| `/api/devotional/list` | GET | Listar devocionais |
| `/api/devotional/list?id=X` | DELETE | Excluir devocional |
| `/api/devotional/save` | PATCH | Salvar/remover dos salvos |

---

## Integrar IA real (Claude ou OpenAI)

Edite `src/lib/ai.ts` — a função `generateDevotional()` já tem a interface pronta:

```ts
// Substitua o mock por uma chamada real:
export async function generateDevotional(input: DevotionalInput): Promise<DevotionalOutput> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{
      role: "system",
      content: "Você é um pastor cristão experiente..."
    }, {
      role: "user",
      content: `O usuário está se sentindo: ${input.feeling}. ${input.userInput}`
    }],
  })
  // parse e retornar DevotionalOutput
}
```

## Migrar para PostgreSQL (produção)

1. Trocar `DATABASE_URL` para string PostgreSQL no `.env`
2. Mudar provider no `prisma/schema.prisma`: `provider = "postgresql"`
3. Atualizar `src/lib/db.ts` para usar `@prisma/adapter-pg` ou conexão direta
4. Rodar `npm run db:push`

## Integrar Stripe (pagamentos)

O sistema de planos (`user.plan = "free" | "premium"`) já está no banco. Para integrar:

1. Instalar `stripe` e `@stripe/stripe-js`
2. Criar webhook para atualizar `user.plan` após pagamento
3. Implementar a tela de upgrade no `/perfil`

## Comandos úteis

```bash
npm run dev          # servidor de desenvolvimento
npm run build        # build de produção
npm run db:push      # sincronizar schema com o banco
npm run db:studio    # abrir Prisma Studio (GUI do banco)
npm run db:generate  # gerar Prisma Client
```
