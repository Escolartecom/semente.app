"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const S = {
  serif: { fontFamily: "var(--font-playfair), Georgia, serif" } as React.CSSProperties,
}

const PRAYERS = [
  {
    category: "Ansiedade",
    icon: "🌊",
    description: "Quando a mente não para e o coração acelera sem motivo.",
    prayer: `Senhor, minha mente está cheia de pensamentos que não consigo controlar. O peso do que pode acontecer está me sufocando, e eu não sei como silenciar esse barulho interno.

Mas eu sei que Tu és maior do que meus medos. Tua paz excede todo entendimento — e eu preciso dela agora. Não da paz que o mundo oferece, mas daquela que só vem de Ti.

Ensina-me a lançar sobre Ti toda a minha ansiedade, sabendo que tens cuidado de mim. Que eu possa respirar fundo e lembrar: Tu estás no controle. Eu não preciso carregar isso sozinho.

Amém.`,
    verse: "\"Não andeis ansiosos por coisa alguma, mas em tudo...\" — Filipenses 4:6",
  },
  {
    category: "Luto",
    icon: "🕊️",
    description: "Quando a dor da perda parece maior do que as palavras podem expressar.",
    prayer: `Deus, estou com um vazio que não consigo preencher. A dor que sinto agora é real, e eu não tenho forças para fingir que está tudo bem.

Tu que conheces cada lágrima, que guardas cada uma delas — olha para mim hoje. Não me peça para ser forte. Me dê força. Não me peça para seguir em frente. Me carrega.

Que a Tua presença seja real neste silêncio. Que eu possa sentir que não estou sozinho nessa dor. E que, mesmo sem entender, eu possa confiar que Tu estás aqui.

Amém.`,
    verse: "\"O Senhor está perto dos que têm o coração quebrantado...\" — Salmos 34:18",
  },
  {
    category: "Família",
    icon: "🏠",
    description: "Quando as relações mais importantes estão pesadas ou quebradas.",
    prayer: `Senhor, Tu que criaste a família — olha para a minha hoje. Há feridas que não sei como curar. Há silêncios que me machucam. Há palavras ditas que não deveriam ter sido, e palavras não ditas que precisavam ter sido.

Entra onde eu não consigo entrar. Cura onde as minhas mãos não alcançam. Traz unidade onde há divisão, e misericórdia onde há mágoa.

Que eu seja instrumento de paz antes de ser instrumento de razão. E que a Tua graça seja maior do que qualquer erro cometido.

Amém.`,
    verse: "\"Sede bondosos uns para com os outros, compassivos...\" — Efésios 4:32",
  },
  {
    category: "Propósito",
    icon: "🧭",
    description: "Quando você não sabe para onde ir ou o que fazer com sua vida.",
    prayer: `Deus, estou perdido. Não sei o que quero, não sei o que Tu queres de mim, e essa incerteza está me paralisando.

Fala comigo. Não precisa ser um sinal grandioso — só me dá clareza. Uma luz para o próximo passo. Não preciso enxergar o caminho inteiro, só o próximo passo.

Molda meus desejos para que sejam os Teus. Que eu não persiga o que parece certo aos meus olhos, mas o que é certo diante de Ti. E que eu tenha coragem de seguir quando Tu indicares o caminho.

Amém.`,
    verse: "\"Confia no Senhor de todo o teu coração...\" — Provérbios 3:5-6",
  },
  {
    category: "Cura",
    icon: "🌿",
    description: "Quando o corpo ou a alma precisam de restauração.",
    prayer: `Senhor, estou fraco. Meu corpo cansa. Minha alma sangra. E há dias em que eu não sei se estou lutando ou apenas sobrevivendo.

Tu és o Deus que cura — não apenas corpos, mas corações. Não apenas doenças, mas mágoas antigas que nunca foram tratadas.

Toca onde dói. Restaura o que foi quebrado. E onde a cura não vem da forma que espero, dá-me a graça de confiar na Tua soberania e descansar na Tua força quando a minha acabar.

Amém.`,
    verse: "\"Ele cura os quebrantados de coração...\" — Salmos 147:3",
  },
  {
    category: "Perdão",
    icon: "🤍",
    description: "Quando o peso da culpa ou da mágoa de outra pessoa está te aprisionando.",
    prayer: `Deus, há algo que não consigo soltar. Ou a culpa pelo que fiz, ou a mágoa pelo que me fizeram. De qualquer forma, estou preso.

Tu que perdoaste o imperdoável — ensina-me o que é perdão de verdade. Não o esquecimento forçado, mas a libertação real. Não ignorar o que aconteceu, mas não ser mais escravo disso.

Onde sou eu quem precisa ser perdoado: que eu receba Tua graça sem me afastar dela. Onde sou eu quem precisa perdoar: que Tua misericórdia flua por mim para alcançar o outro.

Amém.`,
    verse: "\"Sede bondosos uns para com os outros...perdoando-vos mutuamente.\" — Efésios 4:32",
  },
]

export default function ClamorPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login")
  }, [status, router])

  if (status === "loading") return null

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

      {/* Header */}
      <div>
        <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ink-3)", marginBottom: 20 }}>
          <ArrowLeft size={13} /> Início
        </Link>

        <div style={{ marginBottom: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "var(--bg)",
            background: "var(--gold)", padding: "3px 10px", borderRadius: 20,
          }}>
            Clamor
          </span>
        </div>

        <h1 style={{ ...S.serif, fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 300, color: "var(--text)", lineHeight: 1.1, marginBottom: 8 }}>
          Orações para quando<br />as palavras faltam.
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-3)", lineHeight: 1.6 }}>
          Há momentos em que o coração sabe o que precisa, mas a boca não encontra as palavras. Estas orações foram escritas para esses momentos.
        </p>
      </div>

      {/* Grid de categorias */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {PRAYERS.map((p) => (
          <div
            key={p.category}
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "clamp(24px, 4vw, 36px)",
            }}
          >
            {/* Categoria */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 18 }}>{p.icon}</span>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "var(--gold)", textTransform: "uppercase" }}>
                {p.category}
              </p>
            </div>

            <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 24, lineHeight: 1.5 }}>
              {p.description}
            </p>

            {/* Oração */}
            <div style={{ borderLeft: "2px solid rgba(200,165,90,0.3)", paddingLeft: 20, marginBottom: 20 }}>
              {p.prayer.split("\n\n").map((para, i) => (
                <p key={i} style={{
                  ...S.serif,
                  fontSize: 14,
                  fontStyle: "italic",
                  color: "var(--text-2)",
                  lineHeight: 1.9,
                  marginBottom: i < p.prayer.split("\n\n").length - 1 ? 16 : 0,
                  fontWeight: 300,
                }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Versículo */}
            <p style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.08em" }}>
              {p.verse}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}
