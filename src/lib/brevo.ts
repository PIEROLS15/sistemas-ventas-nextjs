import { TransactionalEmailsApi, SendSmtpEmail, TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';

const apiKey = process.env.BREVO_API_KEY;

if (!apiKey) {
    throw new Error("Falta la variable de entorno BREVO_API_KEY");
}

const apiInstance = new TransactionalEmailsApi();
apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

interface EmailParams {
    subject: string;
    to: {
        email: string;
        name?: string;
    }[];
    htmlContent: string;
    sender?: {
        email?: string;
        name?: string;
    };
}

export async function sendEmail({ subject, to, htmlContent, sender }: EmailParams) {
    try {
        const email = new SendSmtpEmail();

        email.subject = subject;
        email.htmlContent = htmlContent;
        email.to = to.map(t => ({
            email: t.email,
            name: t.name ?? t.email
        }));
        email.sender = {
            email: sender?.email || process.env.BREVO_SENDER_EMAIL,
            name: sender?.name || process.env.BREVO_SENDER_NAME
        };

        const response = await apiInstance.sendTransacEmail(email);
        return response.body;

    } catch (err) {
        console.error("Error enviando email:", err);
        return null;
    }
}