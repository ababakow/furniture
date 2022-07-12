const { mailer } = require('./nodemailer');

module.exports.mailWriteToUs = async (data) => {
	const input = `
    <p>Ви надіслали запит в компанію "Меблі для вас" через форму зворотнього зв'язку на нашому сайті.</p>
    <p>Дякуємо з звернення! Незабаром ми вам відповімо.</p>
    <h3>Контактні данні</h3>
    <ul>
        <li>Ім'я: ${data.name}</li>
        
        <li>Email: ${data.email}</li>
        <li>Телефон: ${data.phone}</li>
    </ul>
    <h3>Тескт повідомлення</h3>
    <p>${data.message}</p>
    <br>
    <p><i>Цей лист було відправлено автоматично.</i></p>
    `;

	let message = {
		from: '"Меблі для вас" <info.meblidliavas@gmail.com>', // sender address
		to: `${data.email}`, // list of receivers
		bcc: 'info.meblidliavas@gmail.com',
		subject: 'Дякуємо за звернення!', // Subject line
		text: '', // plain text body
		html: input // html body
	};

	await mailer(message);
};

module.exports.mailCallBack = async (data) => {
	const input = `
    <h1>Запит на зворотній дзвінок.</h1>
    <h3>Контактні данні</h3>
    <p>Телефон: <a href="tel:${data.callBackPhone}">${data.callBackPhone}<a></p>
    `;

	let message = {
		from: '"Меблі для вас" <info.meblidliavas@gmail.com>', // sender address
		to: `info.meblidliavas@gmail.com`, // list of receivers
		// bcc: 'info.meblidliavas@gmail.com',
		subject: 'Запит на зворотній дзвінок', // Subject line
		text: '', // plain text body
		html: input // html body
	};
	await mailer(message);
};
