const nodemailer = require('nodemailer');

// module.exports.mailer = async (senderData) => {
module.exports.mailer = async (message) => {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: process.env.MAILER_MAIL,
			pass: process.env.MAILER_PASS,
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			refreshToken: process.env.OAUTH_REFRESH_TOKEN
		}
	});

	// const input = `
	// <p>Ви надіслали запит в компанію "Меблі для вас" через форму зворотнього зв'язку на нашому сайті.</p>
	// <p>Дякуємо з звернення! Незабаром ми вам відповімо.</p>
	// <h3>Контактні данні</h3>
	// <ul>
	//     <li>Ім'я: ${senderData.name}</li>

	//     <li>Email: ${senderData.email}</li>
	//     <li>Телефон: ${senderData.phone}</li>
	// </ul>
	// <h3>Тескт повідомлення</h3>
	// <p>${senderData.message}</p>
	// <br>
	// <p><i>Цей лист було відправлено автоматично.</i></p>
	// `;

	// let message = {
	// 	from: '"Меблі для вас" <info.meblidliavas@gmail.com>', // sender address
	// 	to: `${senderData.email}`, // list of receivers
	// 	bcc: 'info.meblidliavas@gmail.com',
	// 	subject: 'Дякуємо за звернення!', // Subject line
	// 	text: '', // plain text body
	// 	html: input // html body
	// };

	const info = await transporter.sendMail(message);

	console.log('Message sent: %s', info.messageId);
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
