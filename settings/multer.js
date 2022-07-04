const multer = require('multer');
const fs = require('fs');
const { mkdir } = require('fs/promises');

module.exports.fileFilter = (req, file, cb) => {
	if ((file.mimetype == file.mimetype) == 'image/jpg' || file.mimetype == 'image/jpeg') {
		cb(null, true);
	} else {
		cb(null, false);
		return cb(new Error('Для завантаження допустими лише .jpg та .jpeg формати зображень!'));
	}
};

module.exports.storage = (DIR) => {
	return multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, DIR);
		},
		filename: (req, file, cb) => {
			const fileName = Date.now() + '.' + file.mimetype.split('/')[1];
			cb(null, fileName);
		}
	});
};

module.exports.storageStatus = (DIR) => {
	return multer.diskStorage({
		destination: async (req, file, cb) => {
			const dir = DIR + '/' + req.params.id;
			if (!fs.existsSync(dir)) {
				await mkdir(dir);
			}
			cb(null, dir);
		},
		filename: (req, file, cb) => {
			const fileName = Date.now() + '.' + file.mimetype.split('/')[1];
			cb(null, fileName);
		}
	});
};
