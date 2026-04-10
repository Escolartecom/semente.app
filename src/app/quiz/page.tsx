"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { ArrowRight, ArrowLeft } from "lucide-react"

const questions = [
  {
    id: "feeling",
    question: "Como você está chegando hoje?",
    subtitle: "Seja honesto. Não tem resposta certa ou errada.",
    options: [
      { label: "Cansado e sem forças", value: "esgotado" },
      { label: "Ansioso, com o coração agitado", value: "ansioso" },
      { label: "Perdido, sem saber o próximo passo", value: "perdido" },
      { label: "Magoado ou decepcionado", value: "magoado" },
      { label: "Grato, mas querendo crescer", value: "grato" },
      { label: "Em paz, buscando mais profundidade", value: "em paz" },
    ],
  },
  {
    id: "area",
    question: "Qual área da sua vida está mais pesada agora?",
    subtitle: "Onde você mais precisa de uma palavra de Deus.",
    options: [
      { label: "Saúde — minha ou de alguém que amo", value: "saúde" },
      { label: "Relacionamentos e família", value: "relacionamentos e família" },
      { label: "Trabalho, finanças ou propósito", value: "trabalho e propósito" },
      { label: "Minha vida espiritual", value: "vida espiritual" },
      { label: "Emoções — ansiedade, tristeza ou solidão", value: "emoções difíceis" },
      { label: "Estou passando por uma perda", value: "luto e perda" },
    ],
  },
  {
    id: "relationship",
    question: "Como tem sido sua relação com Deus ultimamente?",
    subtitle: "Não precisa ser perfeito. Só precisa ser verdadeiro.",
    options: [
      { label: "Distante — sinto que Ele não me ouve", value: "distante de Deus" },
      { label: "Presente nos momentos difíceis, mas inconsistente", value: "inconsistente" },
      { label: "Quero me aproximar, mas não sei como", value: "quer se aproximar" },
      { label: "Tenho orado, mas falta profundidade", value: "busca profundidade" },
      { label: "Estou bem — quero ir ainda mais fundo", value: "deseja crescer" },
    ],
  },
  {
    id: "barrier",
    question: "O que mais te impede de ter um momento com Deus todo dia?",
    subtitle: "Sem julgamento. Queremos entender você de verdade.",
    options: [
      { label: "A correria do dia a dia", value: "correria" },
      { label: "Não sei por onde começar", value: "não sei por onde começar" },
      { label: "Me sinto distante e não sei como voltar", value: "distância espiritual" },
      { label: "Falta de constância", value: "falta de constância" },
      { label: "Não encontro algo que fale comigo de verdade", value: "falta de conexão" },
    ],
  },
  {
    id: "need",
    question: "O que você mais precisa ouvir de Deus hoje?",
    subtitle: "Escolha o que mais ressoa com o seu coração.",
    options: [
      { label: "Que tudo vai ficar bem", value: "esperança de que tudo vai ficar bem" },
      { label: "Que Deus não me esqueceu", value: "que Deus não me esqueceu e está presente" },
      { label: "Que estou no caminho certo", value: "direção e confirmação de que estou no caminho certo" },
      { label: "Que sou amado, mesmo com minhas falhas", value: "graça e amor incondicional mesmo com minhas falhas" },
      { label: "Que existe propósito no que estou vivendo", value: "que existe propósito e significado no que estou vivendo" },
    ],
  },
  {
    id: "commitment",
    question: "Se Deus falasse com você todo dia por 60 dias, você estaria disposto a ouvir?",
    subtitle: "Esse é o coração do Desafio Semente.",
    options: [
      { label: "Sim. Estou pronto para isso", value: "comprometido" },
      { label: "Acho que sim — quero ver primeiro", value: "cauteloso" },
      { label: "Tenho dificuldade com constância, mas quero tentar", value: "motivado" },
      { label: "Nunca tentei algo assim, mas estou aberto", value: "aberto" },
    ],
  },
]

const S = {
  serif: { fontFamily: "var(--font-playfair), Georgia, serif" } as React.CSSProperties,
}

export default function QuizPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selected, setSelected] = useState<string | null>(null)

  const question = questions[step]
  const progress = ((step + 1) / questions.length) * 100

  function handleNext() {
    if (!selected) return
    const newAnswers = { ...answers, [question.id]: selected }
    setAnswers(newAnswers)
    setSelected(null)
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      const params = new URLSearchParams(newAnswers)
      router.push(`/quiz/resultado?${params.toString()}`)
    }
  }

  function handleBack() {
    if (step > 0) {
      setStep(s => s - 1)
      setSelected(answers[questions[step - 1].id] || null)
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <div style={{ padding: "24px clamp(16px, 4vw, 40px)", borderBottom: "1px solid var(--border-2)" }}>
        <Logo size="sm" variant="light" />
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: "var(--border-2)" }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "var(--gold)",
          transition: "width 0.4s ease",
        }} />
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px clamp(16px, 4vw, 40px)",
      }}>
        <div style={{ width: "100%", maxWidth: 520 }}>

          {/* Step indicator */}
          <p style={{
            fontSize: 11,
            color: "var(--gold)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 24,
            fontWeight: 500,
          }}>
            {step + 1} de {questions.length}
          </p>

          {/* Question */}
          <h1 style={{
            ...S.serif,
            fontSize: "clamp(22px, 4vw, 32px)",
            fontWeight: 300,
            color: "var(--text)",
            lineHeight: 1.2,
            marginBottom: 8,
          }}>
            {question.question}
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-3)", marginBottom: 32, lineHeight: 1.5 }}>
            {question.subtitle}
          </p>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
            {question.options.map((opt) => {
              const isSelected = selected === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => setSelected(opt.value)}
                  style={{
                    padding: "15px 20px",
                    borderRadius: 8,
                    border: isSelected ? "1px solid var(--gold)" : "1px solid var(--border)",
                    background: isSelected ? "rgba(200,165,90,0.08)" : "var(--bg-2)",
                    color: isSelected ? "var(--gold)" : "var(--text-2)",
                    fontSize: 14,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontWeight: isSelected ? 500 : 400,
                  }}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {step > 0 ? (
              <button
                onClick={handleBack}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  color: "var(--text-3)",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <ArrowLeft size={13} />
                Voltar
              </button>
            ) : <div />}

            <button
              onClick={handleNext}
              disabled={!selected}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                borderRadius: 7,
                background: selected ? "var(--gold)" : "rgba(255,255,255,0.06)",
                color: selected ? "var(--bg)" : "var(--text-3)",
                fontSize: 13,
                fontWeight: 600,
                cursor: selected ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                border: "none",
              }}
            >
              {step < questions.length - 1 ? "Continuar" : "Receber minha semente"}
              <ArrowRight size={13} />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
