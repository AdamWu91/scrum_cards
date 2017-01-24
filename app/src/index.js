const socket = io()
class scrumCards {
	constructor(props) {
		this.cardsDiv = document.getElementById('cards')
		this.resultDiv = document.getElementById('result')
		this.pointsDiv = document.getElementById('points')
		this.nextTastBtn = document.getElementById('next-task')
	  this.cardsCount = 8/2
	  this.dragOverResultDiv = false
	  this.drop = false
	  this.cardStyles = "display: inline-block;width: 200px;height: 100px;text-align: center;border: 1px solid red; margin: 10px"
	  this.createCards()
	  this.addResultEvents(this.resultDiv)
	  this.addSockedEvents()
	  this.nextTastBtn.addEventListener('click', this.reset.bind(this))
	}

	createCards() {
		for(let i = 0; i < this.cardsCount; i++) {
			let newCard = document.createElement('div')
			newCard.style=this.cardStyles
			newCard.innerHTML = i
			newCard.setAttribute("data-points", i)
			newCard.setAttribute("class", "card-" + i)
			newCard.setAttribute("draggable", true)
			this.addCardEvents(newCard)
			this.cardsDiv.appendChild(newCard)
		}
	}

	moveCardWithSocket(params = {}) {
		socket.emit('move_card', params);
	}

	updateCards(params) {
		console.log(params)
		if (params.cardId) {
			let card = document.getElementsByClassName('card-' + params.cardId)[0]
			// this.cardsDiv.removeChild(card)
			this.resultDiv.appendChild(card)
		}
		if (params.type === 'reset') {
			this.reset(false)
		}
		this.pointsDiv.innerHTML = params.points
	}

	onDragEnd(event) {
		if (this.dragOverResultDiv) {
			this.onDrop(event)
		}
	}

	onDrop(event) {
		this.moveCardWithSocket({'points': event.target.getAttribute('data-points')})
		this.dragOverResultDiv = false
	}

	onDragOver(event) {
		this.dragOverResultDiv = true
	}

	addCardEvents(element) {
		element.addEventListener('dragend', this.onDragEnd.bind(this))
	}

	addResultEvents(element) {
		element.addEventListener('dragover', this.onDragOver.bind(this))
	}

	addSockedEvents() {
		socket.on('update_cards', (params) => {
			this.updateCards(params)
		})
	}

	reset(withSocket = true) {
		if (withSocket) {
			socket.emit('reset')
		}
		
		while (this.resultDiv.firstChild) this.resultDiv.removeChild(this.resultDiv.firstChild)
		while (this.cardsDiv.firstChild) this.cardsDiv.removeChild(this.cardsDiv.firstChild)
		this.createCards()
	}
}

let cards = new scrumCards()





// btn.addEventListener('click', (event) => {
// 	console.log("klik")
// 	
// })

