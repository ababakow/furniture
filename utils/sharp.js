const sharp = require('sharp');

const fs = require('fs');
const { mkdir } = require('fs/promises');

module.exports.normaliseImage = async (originalUrl, name, options = { sm: false, md: false, hd: false }) => {
	try {
		if (options.sm) {
			const dir = originalUrl.replace(name, 'sm/');
			if (!fs.existsSync(dir)) {
				await mkdir(dir);
			}
			await sharp(originalUrl).resize(405, 270).toFile(dir + name);
		}
		if (options.md) {
			const dir = originalUrl.replace(name, 'md/');
			if (!fs.existsSync(dir)) {
				await mkdir(dir);
			}
			await sharp(originalUrl).resize(960, 640).toFile(dir + name);
		}
		if (options.hd) {
			const dir = originalUrl.replace(name, 'hd/');
			if (!fs.existsSync(dir)) {
				await mkdir(dir);
			}
			await sharp(originalUrl).resize(1920, 1280).toFile(dir + name);
		}
	} catch (e) {
		throw e;
	}
};
