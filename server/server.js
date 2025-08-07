import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: [
        "http://localhost:5173",
    ]
}));
app.use(express.json());

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_USER,
            subject: "Portfolio Contact Form Message",
            text: message,
            html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
        });

        res.status(200).json({ success: true });
    } catch (err) {
        console.error('Email send error:', err);
        res.status(500).json({ success: false, error: 'Failed to send email' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
