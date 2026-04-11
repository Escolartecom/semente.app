import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = "Semente <ola@semente.app>"
const BASE_URL = process.env.NEXTAUTH_URL ?? "https://semente.app"

/* ── Boas-vindas pós-pagamento ─────────────────────────────────
   Enviado quando pessoa paga sem ter conta (funil do quiz).
   Link para criar a senha e acessar o dashboard.
──────────────────────────────────────────────────────────────── */
export async function sendWelcomeEmail(email: string) {
  const cadastroUrl = `${BASE_URL}/cadastro?email=${encodeURIComponent(email)}&next=${encodeURIComponent("/dashboard?upgraded=true")}`

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Seu acesso ao Desafio Semente está pronto 🌱",
    html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bem-vindo ao Desafio Semente</title>
</head>
<body style="margin:0;padding:0;background:#0b0e0c;font-family:Georgia,serif;color:#e8e0d0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0e0c;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:40px;text-align:center;">
              <p style="font-size:11px;letter-spacing:0.20em;color:#c8a55a;text-transform:uppercase;margin:0;">✦ Semente</p>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td style="padding-bottom:28px;text-align:center;">
              <h1 style="font-size:28px;font-weight:300;color:#f5f0e8;line-height:1.3;margin:0 0 16px;">
                Seu pagamento foi confirmado.<br/>
                <em style="color:#c8a55a;">Deus tem uma palavra esperando por você.</em>
              </h1>
              <p style="font-size:14px;color:#8a8a7a;line-height:1.7;margin:0;">
                Crie sua senha agora para começar o Desafio Semente — 60 dias de encontro diário com Deus, com uma palavra preparada especialmente para o seu momento.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding-bottom:40px;text-align:center;">
              <a href="${cadastroUrl}"
                style="display:inline-block;padding:16px 36px;background:#c8a55a;color:#0b0e0c;font-size:15px;font-weight:700;text-decoration:none;border-radius:8px;letter-spacing:0.04em;">
                Criar minha senha e começar
              </a>
              <p style="font-size:11px;color:#5a5a4a;margin-top:14px;">
                Ou copie e cole no navegador:<br/>
                <span style="color:#c8a55a;">${cadastroUrl}</span>
              </p>
            </td>
          </tr>

          <!-- Separador -->
          <tr>
            <td style="border-top:1px solid #1e2420;padding:32px 0;text-align:center;">
              <p style="font-size:13px;color:#5a5a4a;line-height:1.7;margin:0;">
                O Desafio começa no momento em que você acessar.<br/>
                Cada dia, uma semente plantada. Ao final de 60 dias,<br/>
                uma vida que você não vai mais reconhecer.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center;padding-top:16px;">
              <p style="font-size:11px;color:#3a3a2a;margin:0;">
                © 2025 Semente · <a href="${BASE_URL}" style="color:#3a3a2a;">semente.app</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  })
}

/* ── Lembrete diário ───────────────────────────────────────────
   Enviado todo dia para usuários premium que ainda não geraram
   o devocional do dia.
──────────────────────────────────────────────────────────────── */
export async function sendDailyReminderEmail(email: string, name: string) {
  const gerarUrl = `${BASE_URL}/gerar`

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Sua semente de hoje está esperando 🌱",
    html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#0b0e0c;font-family:Georgia,serif;color:#e8e0d0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0e0c;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:40px;text-align:center;">
              <p style="font-size:11px;letter-spacing:0.20em;color:#c8a55a;text-transform:uppercase;margin:0;">✦ Semente</p>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td style="padding-bottom:28px;text-align:center;">
              <h1 style="font-size:26px;font-weight:300;color:#f5f0e8;line-height:1.35;margin:0 0 16px;">
                ${name ? `${name.split(" ")[0]}, a` : "A"} sua palavra de hoje<br/>
                <em style="color:#c8a55a;">ainda não foi recebida.</em>
              </h1>
              <p style="font-size:14px;color:#8a8a7a;line-height:1.7;margin:0;">
                Deus tem algo preparado para o que você está vivendo hoje. Leva menos de 2 minutos.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding-bottom:40px;text-align:center;">
              <a href="${gerarUrl}"
                style="display:inline-block;padding:16px 36px;background:#c8a55a;color:#0b0e0c;font-size:15px;font-weight:700;text-decoration:none;border-radius:8px;letter-spacing:0.04em;">
                Receber minha semente de hoje
              </a>
            </td>
          </tr>

          <!-- Versículo do dia -->
          <tr>
            <td style="border-left:2px solid #c8a55a;padding:0 0 32px 20px;">
              <p style="font-size:14px;font-style:italic;color:#8a8a7a;line-height:1.75;margin:0 0 8px;">
                "Cada manhã ele desperta, desperta o meu ouvido para ouvir como os que são ensinados."
              </p>
              <p style="font-size:11px;color:#c8a55a;letter-spacing:0.10em;margin:0;font-weight:600;">
                ISAÍAS 50:4
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #1e2420;padding:24px 0 0;text-align:center;">
              <p style="font-size:11px;color:#3a3a2a;margin:0;">
                © 2025 Semente · <a href="${BASE_URL}/perfil" style="color:#3a3a2a;">cancelar lembretes</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  })
}
