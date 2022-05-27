const nodemailer = require('nodemailer');

module.exports.mailer = async (senderData) => {
	//let testAccount = await nodemailer.createTestAccount();

	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.MAILER_MAIL, // generated ethereal user
			pass: process.env.MAILER_PASS // generated ethereal password
		}
	});

	const input = `
    <p>Ви надіслали запит в компанію "Меблі для вас" через форму зворотнього зв'язку на нашому сайті.</p>
    <p>Дякуємо з звернення! Незабаром ми вам відповімо.</p>
    <h3>Контактні данні</h3>
    <ul>
        <li>Ім'я: ${senderData.name}</li>
        <li>Компанія: ${senderData.company}</li>
        <li>Email: ${senderData.email}</li>
        <li>Телефон: ${senderData.phone}</li>
    </ul>
    <h3>Тескт повідомлення</h3>
    <p>${senderData.message}</p>
    <br>
    <p><i>Цей лист було відправлено автоматично.</i></p>
    `;

	let message = {
		from: '"Меблі для вас" <info.meblidliavas@gmail.com>', // sender address
		to: `${senderData.email}, info.meblidliavas@gmail.com`, // list of receivers
		subject: 'Дякуємо за звернення!', // Subject line
		text: '', // plain text body
		html: input // html body
	};

	let info = await transporter.sendMail(message);

	console.log('Message sent: %s', info.messageId);
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
