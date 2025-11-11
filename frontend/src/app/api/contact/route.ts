import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

import { contactSchema } from "@/lib/contact";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const smtpHost = process.env.SMTP_HOST ?? "smtp.gmail.com";
const smtpPort =
  process.env.SMTP_PORT !== undefined
    ? Number(process.env.SMTP_PORT)
    : 465;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM;
const contactRecipient = process.env.CONTACT_RECIPIENT_EMAIL;

if (!smtpUser || !smtpPass) {
  console.warn("[contact] SMTP_USER または SMTP_PASS が設定されていません。");
}

if (!contactRecipient) {
  console.warn("[contact] CONTACT_RECIPIENT_EMAIL が設定されていません。");
}

const createTransporter = () =>
  smtpUser && smtpPass
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })
    : null;

export async function POST(request: Request) {
  try {
    const raw = (await request.json()) as unknown;
    const data =
      raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
    const payload = {
      name: typeof data.name === "string" ? data.name : "",
      email: typeof data.email === "string" ? data.email : "",
      organization:
        typeof data.organization === "string" ? data.organization : "",
      message: typeof data.message === "string" ? data.message : "",
    };

    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json(
        {
          message:
            issue?.message ?? "入力内容に誤りがあります。もう一度確認してください。",
        },
        { status: 400 }
      );
    }

    const { name, email, organization, message } = parsed.data;

    const transporter = createTransporter();
    if (!transporter || !contactRecipient) {
      return NextResponse.json(
        {
          message:
            "メール送信設定が完了していません。管理者にご連絡ください。",
        },
        { status: 500 }
      );
    }

    const timestamp = new Date().toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    });

    const fromAddress = smtpFrom ?? smtpUser;

    const adminText = [
      "新しいお問い合わせを受信しました。",
      "",
      `日時: ${timestamp}`,
      `氏名: ${name}`,
      `メール: ${email}`,
      `所属: ${organization || "（未入力）"}`,
      "",
      "▼ 内容",
      message,
    ].join("\n");

    const adminHtml = [
      "<p>新しいお問い合わせを受信しました。</p>",
      `<p><strong>日時:</strong> ${escapeHtml(timestamp)}</p>`,
      `<p><strong>氏名:</strong> ${escapeHtml(name)}</p>`,
      `<p><strong>メール:</strong> ${escapeHtml(email)}</p>`,
      `<p><strong>所属:</strong> ${escapeHtml(organization || "（未入力）")}</p>`,
      "<p><strong>▼ 内容</strong></p>",
      `<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
    ].join("");

    const userText = [
      `${name} 様`,
      "",
      "この度はお問い合わせいただきありがとうございます。",
      "以下の内容で受け付けいたしました。",
      "",
      "――――――――――――――――――――――",
      `日時: ${timestamp}`,
      `氏名: ${name}`,
      `メール: ${email}`,
      `所属: ${organization || "（未入力）"}`,
      "",
      "▼ 内容",
      message,
      "――――――――――――――――――――――",
      "",
      "担当者より2営業日以内にご連絡いたしますので、今しばらくお待ちください。",
      "",
      "※このメールに心当たりがない場合は、恐れ入りますが本メールの破棄をお願いいたします。",
    ].join("\n");

    const userHtml = [
      `<p>${escapeHtml(name)} 様</p>`,
      "<p>この度はお問い合わせいただきありがとうございます。以下の内容で受け付けいたしました。</p>",
      "<hr />",
      `<p><strong>日時:</strong> ${escapeHtml(timestamp)}</p>`,
      `<p><strong>氏名:</strong> ${escapeHtml(name)}</p>`,
      `<p><strong>メール:</strong> ${escapeHtml(email)}</p>`,
      `<p><strong>所属:</strong> ${escapeHtml(organization || "（未入力）")}</p>`,
      "<p><strong>▼ 内容</strong></p>",
      `<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
      "<hr />",
      "<p>担当者より2営業日以内にご連絡いたしますので、今しばらくお待ちください。</p>",
      "<p>※このメールに心当たりがない場合は、恐れ入りますが本メールの破棄をお願いいたします。</p>",
    ].join("");

    await transporter.sendMail({
      from: fromAddress,
      to: contactRecipient,
      replyTo: `${name} <${email}>`,
      subject: `【お問い合わせ】${name} 様より`,
      text: adminText,
      html: adminHtml,
    });

    await transporter.sendMail({
      from: fromAddress,
      to: email,
      subject: "お問い合わせありがとうございます",
      text: userText,
      html: userHtml,
    });

    return NextResponse.json({
      message: "送信が完了しました。追ってご連絡いたします。",
    });
  } catch (error) {
    console.error("[contact] Failed to process request:", error);
    return NextResponse.json(
      {
        message:
          "内部エラーが発生しました。しばらく時間を置いてから再度お試しください。",
      },
      { status: 500 }
    );
  }
}

