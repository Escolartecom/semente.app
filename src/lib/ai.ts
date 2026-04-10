import OpenAI from "openai"

let _openai: OpenAI | null = null
function getOpenAI() {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }
  return _openai
}

export interface DevotionalInput {
  feeling?: string
  userInput?: string
}

export interface DevotionalOutput {
  title: string
  verse: string
  verseReference: string
  reflection: string
  practicalApp: string
  prayer: string
}

export async function generateDevotional(
  input: DevotionalInput
): Promise<DevotionalOutput> {
  const feeling = input.feeling || "indefinido"
  const userInput = input.userInput || ""
const generationId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const prompt = `
Você é um escritor cristão pastoral, sensível, profundo e bíblico.

Crie um devocional original, EXCLUSIVAMENTE em português do Brasil, com linguagem humana, acolhedora, espiritual e nada genérica.

REGRAS ABSOLUTAS:
- Escreva APENAS em português do Brasil. Zero palavras em outros idiomas.
- Gere um texto NOVO e DIFERENTE a cada chamada
- Nunca repita literalmente devocionais anteriores
- Pode usar versículos bíblicos conhecidos, mas a reflexão, aplicação e oração devem ser originais
- O tom deve ser premium, profundo, íntimo e edificante
- Não escreva como robô
- Não use emojis
- Não use aspas desnecessárias
- Responda SOMENTE em JSON válido
- Não inclua markdown
- Não inclua texto fora do JSON
- Todos os campos do JSON devem conter APENAS texto em português do Brasil

Dê preferência a versículos do Novo Testamento, especialmente palavras de Jesus, cartas apostólicas e textos que transmitam graça, esperança e acolhimento.
Evite linguagem muito arcaica ou difícil de compreender.
Quando usar Antigo Testamento, escolha textos mais emocionais e acessíveis (Salmos, Provérbios).

Contexto do usuário:
Sentimento: ${feeling}
Texto livre: ${userInput}
ID único desta geração: ${generationId}

Considere que este devocional é único para este momento da vida da pessoa.
Traga palavras que pareçam específicas, íntimas e direcionadas, como se Deus estivesse falando diretamente com ela agora.
Evite generalizações.

A primeira frase da reflexão deve prender completamente a atenção, como uma verdade direta, profunda ou impactante.

Use linguagem natural, como uma conversa íntima, evitando tom excessivamente formal ou religioso.

O campo "practicalApp" deve ser uma aplicação prática objetiva, clara e em português correto — 2 a 4 frases simples e diretas sobre o que a pessoa pode fazer hoje.

IMPORTANTE:
Mesmo que o sentimento seja exatamente o mesmo de outras vezes, gere um devocional novo, com título, reflexão, aplicação e oração diferentes.
Evite repetir estrutura, frases, aberturas e encerramentos.

Retorne exatamente neste formato JSON:
{
  "title": "Título do devocional",
  "verse": "Versículo completo",
  "verseReference": "Referência bíblica",
  "reflection": "Reflexão espiritual em 2 ou 3 parágrafos",
  "practicalApp": "Aplicação prática objetiva e útil",
  "prayer": "Oração final profunda e acolhedora"
}
`

  const response = await getOpenAI().chat.completions.create({
  model: "gpt-4.1-mini",
  temperature: 0.95,
  response_format: {
    type: "json_schema",
    json_schema: {
      name: "devotional_output",
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          verse: { type: "string" },
          verseReference: { type: "string" },
          reflection: { type: "string" },
          practicalApp: { type: "string" },
          prayer: { type: "string" },
        },
        required: [
          "title",
          "verse",
          "verseReference",
          "reflection",
          "practicalApp",
          "prayer",
        ],
      },
    },
  },
  messages: [
    {
      role: "system",
      content:
        "Você escreve devocionais cristãos profundos, bíblicos, sensíveis e originais em português do Brasil.",
    },
    {
      role: "user",
      content: prompt,
    },
  ],
})

  const content = response.choices[0]?.message?.content

if (!content) {
  throw new Error("A IA não retornou conteúdo.")
}

const parsed = JSON.parse(content)

return {
  title: parsed.title,
  verse: parsed.verse,
  verseReference: parsed.verseReference,
  reflection: parsed.reflection,
  practicalApp: parsed.practicalApp,
  prayer: parsed.prayer,
}
}