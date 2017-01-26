const html = require('choo/html')
const socket = io()

module.exports = function (state, prev, send) {
	let selectedCards = state.app.selectedCards
	let dragOverSelectedPointsBox = false


	let dropCard = (data = {}) => {
		dragOverSelectedPointsBox = false
		data.user = state.app.user
		send('app:add', data)
		console.log("drop")
	}

	let onDragEndCard = (event) => {
		if (dragOverSelectedPointsBox) {
			let card = event.target,
					point = parseInt(card.getAttribute('data-point'))
			dropCard({'point': point})
		}
	}

	let onDragOver = (event) => {
		dragOverSelectedPointsBox = true
	}

	let onDragLeave = (event) => {
		// ponieważ wykonuję się przed dropem
		setTimeout(() => { dragOverSelectedPointsBox = false }, 110)
	}

	let generateSelectedCards = (cards = []) => {
		let tmp = []
		cards.forEach((card) => {
			tmp.push(
				html`
					<div class="card card-${card.point}" draggable="true">
						${card.point}
						<br>
						Od kogo: ${card.user}
					</div>
				`
			)
		})
		return tmp
	}

	let generateCards = () => {
		let cards = []
		for(let i = 0; i <= 4; i++) {
			cards.push(
				html`
					<div class="card card-${i}" draggable="true" ondragend=${ onDragEndCard } data-point=${ i }>
						${ i }
					</div>
				`
			)
		}
	  return cards
	}

  return html`
  	<div>
			<div class="cards-wrap" id="selected-card" ondragover=${ onDragOver } ondragleave=${ onDragLeave }>
				${ generateSelectedCards(selectedCards) }
			</div>
	  	<div class="cards-wrap" id="user-cards">
	  		 ${generateCards()}
		  </div>
		</div>
  `
}