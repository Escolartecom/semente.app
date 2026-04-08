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

const devotionalTemplates = [
  {
    feelings: ["ansioso", "preocupado", "com medo"],
    title: "Paz que Excede o Entendimento",
    verse: "Não andeis ansiosos por coisa alguma; antes, em tudo, pela oração e pela súplica, com ações de graças, apresentai os vossos pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e as vossas mentes em Cristo Jesus.",
    verseReference: "Filipenses 4:6-7",
    reflection: "A ansiedade é uma das lutas mais humanas que existem. Ela chega silenciosa, preenche nossa mente com cenários que ainda não aconteceram, e nos rouba o presente. Mas Deus, em Sua infinita sabedoria, não nos diz para ignorar as dificuldades — Ele nos convida a trazê-las a Ele. Há uma diferença profunda entre preocupação e oração: a preocupação carrega o peso sozinha, enquanto a oração entrega esse peso nas mãos do Pai.\n\nQuando apresentamos nossos pedidos com ações de graças — mesmo em meio à tempestade — estamos declarando nossa confiança em quem Deus é, não apenas em como as circunstâncias estão. É um ato de fé que transforma nossa perspectiva.",
    practicalApp: "Hoje, escreva em um papel as três coisas que mais estão te preocupando. Ao lado de cada uma, escreva uma razão para ser grato nesse momento. Em seguida, ore sobre cada item, entregando-o conscientemente nas mãos de Deus. Cada vez que a ansiedade retornar, respire fundo e repita: 'Eu confio em Ti'.",
    prayer: "Pai, confesso que tenho carregado um peso que não é meu para carregar. Hoje, coloco diante de Ti cada preocupação, cada medo, cada incerteza. Obrigado por ser maior do que tudo que me assombra. Que a Tua paz, que não tem explicação humana, venha guardar meu coração agora. Em nome de Jesus, amém.",
  },
  {
    feelings: ["triste", "desanimado", "sozinho"],
    title: "Ele Está Perto dos de Coração Quebrantado",
    verse: "O Senhor está perto dos que têm o coração quebrantado e salva os de espírito abatido.",
    verseReference: "Salmos 34:18",
    reflection: "Há dias em que o peso da tristeza parece impossível de carregar. Dias em que as palavras não chegam, o sorriso não sai, e a solidão ocupa todo o espaço. Nesses momentos, é fácil imaginar que Deus está distante, ocupado demais com outras coisas.\n\nMas a Palavra nos diz o oposto: é exatamente quando nosso coração se parte que Deus se aproxima mais. Ele não se afasta da dor — Ele caminha em direção a ela. Jesus chorou diante do túmulo de Lázaro. Ele conhece a dor humana por dentro. E é esse mesmo Jesus que está ao seu lado agora.",
    practicalApp: "Permita-se sentir o que está sentindo sem julgamento. Escreva uma carta honesta para Deus contando exatamente como se sente — sem censura. Depois, entre em contato com alguém de confiança: um amigo, familiar, ou pastor. A solidão se rompe com conexão.",
    prayer: "Senhor, meu coração está pesado hoje. Não tenho força para fingir que está tudo bem. Mas acredito que Tu estás aqui comigo nesse momento. Sente-Te perto de mim. Fala à minha alma que sou amado, que não estou só. Restaura minha alegria, pouco a pouco. Eu confio em Ti. Amém.",
  },
  {
    feelings: ["grato", "feliz", "abençoado"],
    title: "O Dom da Gratidão",
    verse: "Alegrai-vos sempre no Senhor; outra vez digo, alegrai-vos! Seja conhecida de todos os homens a vossa moderação. O Senhor está próximo.",
    verseReference: "Filipenses 4:4-5",
    reflection: "A gratidão é um dos estados de alma mais transformadores que existem. Quando nosso coração transborda de reconhecimento pelo que Deus tem feito, algo muda em nós — nossa perspectiva se expande, nossa fé se fortalece, e nossa visão se clareia.\n\nCelebrar as bênçãos de Deus não é arrogância — é adoração. É reconhecer que toda boa dádiva vem do Pai das luzes. E há algo profético na gratidão: quando você é fiel no reconhecimento do pouco, Deus sabe que pode confiar a você o muito.",
    practicalApp: "Hoje é um dia para celebrar. Escreva 10 coisas pelas quais você é genuinamente grato — pequenas e grandes. Compartilhe sua alegria: envie uma mensagem para alguém que contribuiu para suas bênçãos. E encontre uma forma prática de abençoar outra pessoa com o transbordamento do que você recebeu.",
    prayer: "Pai, hoje meu coração quer apenas Te agradecer. Obrigado por cada detalhe da Tua bondade na minha vida. Obrigado por noites que se tornaram manhãs, por portas que se abriram, por pessoas que colocaste no meu caminho. Que eu nunca me acostume com Tuas bênçãos. Que cada dia eu Te encontre fresco e novo. Amém.",
  },
  {
    feelings: ["perdido", "sem direção", "confuso"],
    title: "A Lâmpada Para os Meus Pés",
    verse: "A tua palavra é lâmpada que ilumina os meus passos e luz que clareia o meu caminho.",
    verseReference: "Salmos 119:105",
    reflection: "Nem sempre conseguimos enxergar o caminho todo à nossa frente. Às vezes, a vida nos coloca em encruzilhadas onde cada opção parece nebulosa, e a sensação de não saber para onde ir pode ser paralisante.\n\nMas repare na imagem do salmo: uma lâmpada ilumina os passos — não o caminho inteiro. Deus raramente nos revela o plano completo de uma só vez. Ele pede que confiemos passo a passo, decisão a decisão. Seu papel é caminhar; o papel Dele é iluminar.",
    practicalApp: "Identifique a próxima decisão — não todas as futuras, só a próxima. Passe 15 minutos em silêncio, lendo um trecho de Provérbios ou Salmos. Anote o que vier ao seu coração. Converse com um mentor sábio. E dê o próximo passo com o que você já sabe, não o que ainda não sabe.",
    prayer: "Senhor, não sei para onde ir. Minhas próprias estratégias não me trouxeram clareza. Hoje me rendo à Tua direção. Fala claramente ao meu coração. Abre portas que ninguém pode fechar, e fecha aquelas que não são para mim. Eu confio no Teu plano, mesmo quando não consigo ver o caminho. Guia-me, Pai. Amém.",
  },
  {
    feelings: ["cansado", "esgotado", "sobrecarregado"],
    title: "Forças Renovadas Como Águias",
    verse: "Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias, correrão e não se cansarão, andarão e não se fatigarão.",
    verseReference: "Isaías 40:31",
    reflection: "O cansaço espiritual e emocional é real, e Deus não nos pede para fingir que não estamos exaustos. Na verdade, foi exatamente para os que já não têm mais forças próprias que Isaías escreveu estas palavras. 'Os que esperam no Senhor' — não os que nunca cansam, mas os que, cansados, ainda escolhem esperar em Deus.\n\nEsperar aqui não é passividade — é posicionamento. É colocar sua alma diante de Deus como uma planta que se posiciona diante do sol. E quando você se posiciona em Deus, Ele não apenas repõe o que foi gasto — Ele renova. Transforma. Eleva.",
    practicalApp: "Dê permissão a si mesmo para descansar hoje — sem culpa. Identifique o que mais está te drenando e pergunte: 'Isso é minha responsabilidade ou estou carregando algo que não é meu?' Passe tempo na natureza, em silêncio, ou ouvindo adoração. O descanso é sagrado.",
    prayer: "Pai, estou cansado. Minha alma está pesada e minhas forças chegaram ao limite. Não tenho mais nada a dar de mim mesmo. Mas o que me sobra, entrego a Ti. Renova-me. Não com energia artificial, mas com a Tua presença que sustenta. Que eu encontre em Ti o descanso que o mundo não pode dar. Amém.",
  },
  {
    feelings: ["esperançoso", "expectante", "crente"],
    title: "Fé: A Certeza do que Não Se Vê",
    verse: "Ora, a fé é a certeza de coisas que se esperam, a convicção de fatos que não se veem.",
    verseReference: "Hebreus 11:1",
    reflection: "Há algo poderoso em escolher acreditar quando o olho não pode ver. A esperança não é ingenuidade — é uma declaração de que Deus é maior do que as circunstâncias presentes. Quando você mantém sua fé em meio ao que ainda não se concretizou, você está participando de algo que transcende a lógica humana.\n\nA fé que move montanhas não é a que nunca duvidou — é a que duvidou e ainda assim escolheu crer. Sua expectativa hoje é um ato de adoração.",
    practicalApp: "Escreva em algum lugar visível a promessa específica que você está crendo. Ore sobre ela com especificidade. Aja como quem já crê — faça um passo concreto em direção ao que você está esperando de Deus.",
    prayer: "Senhor, hoje escolho acreditar. Escolho crer no Teu caráter, nas Tuas promessas, no Teu plano. Mesmo quando não consigo ver, mesmo quando os sinais parecem contrários, minha fé está ancorada em quem Tu és. Que essa esperança não me decepcione. Amém.",
  },
]

function getTemplateByFeeling(feeling?: string, userInput?: string): typeof devotionalTemplates[0] {
  const text = ((feeling || "") + " " + (userInput || "")).toLowerCase()

  for (const template of devotionalTemplates) {
    if (template.feelings.some((f) => text.includes(f))) {
      return template
    }
  }

  const randomIndex = Math.floor(Math.random() * devotionalTemplates.length)
  return devotionalTemplates[randomIndex]
}

export async function generateDevotional(
  input: DevotionalInput
): Promise<DevotionalOutput> {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const template = getTemplateByFeeling(input.feeling, input.userInput)

  return {
    title: template.title,
    verse: template.verse,
    verseReference: template.verseReference,
    reflection: template.reflection,
    practicalApp: template.practicalApp,
    prayer: template.prayer,
  }
}
