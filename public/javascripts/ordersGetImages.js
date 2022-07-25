async function getData(url) {
	try {
		const res = await fetch(url);
		const data = await res.json();
		return data;
	} catch (e) {
		console.log(e);
	}
}

function createHtml(imgs) {
	let btnHtml = '';
	let bodyHtml = '';
	imgs.forEach((img, i) => {
		if (i === 0) {
			btnHtml +=
				`<button type="button" data-bs-target="#modal-carousel" 
                    data-bs-slide-to="0" class="active" aria-current="true">
                    </button>` + ' ';
			bodyHtml +=
				`<div class="carousel-item active">
                        <img src="${img}" class="d-block w-100" alt="...">
                        </div>` + ' ';
		} else {
			btnHtml +=
				`<button type="button" data-bs-target="#modal-carousel" 
                    data-bs-slide-to="${i}"
                    </button>` + ' ';
			bodyHtml +=
				`<div class="carousel-item">
                        <img src="${img}" class="d-block w-100" alt="...">
                        </div>` + ' ';
		}
	});
	return {
		btnHtml,
		bodyHtml
	};
}

(() => {
	'use strict';
	const modalBtns = document.querySelectorAll('.modal-button');
	const modal = document.querySelector('.modal-frame');
	const carouselBtns = document.querySelector('.carousel-btns');
	const carouselBody = document.querySelector('.carousel-body');

	// const carouselControlBths = `
	// 	<button class="carousel-control-prev" type="button" data-bs-target="#modal-carousel" data-bs-slide="prev">
    //         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    //         <span class="visually-hidden">Попередня</span>
    //     </button>
    //     <button class="carousel-control-next" type="button" data-bs-target="#modal-carousel" data-bs-slide="next">
    //         <span class="carousel-control-next-icon" aria-hidden="true"></span>
    //         <span class="visually-hidden">Наступна</span>
    //     </button>
	// `

	modalBtns.forEach(function(btn) {
		btn.addEventListener('mousedown', async (e) => {
			modal.id = btn.getAttribute('data-bs-target').substring(1);
			const [ key, order_id, status_id ] = modal.id.split('-');
			const url = `/my-orders/status?order_id=${order_id}&status_id=${status_id}`;
			const data = await getData(url);
			console.log(data.images.length)
			if (data.images.length != 0) {
				const { btnHtml, bodyHtml } = createHtml(data.images);
				carouselBtns.innerHTML = btnHtml;
				carouselBody.innerHTML = bodyHtml;
			}
		});
	});
})();
