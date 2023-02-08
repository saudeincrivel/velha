import { Scene } from "phaser"

export default class StandardScene extends Scene {
	private pegavelObject?: Phaser.GameObjects.Arc
	constructor() {
		super('StandardScene')
	}

	preload() { }

	create() {



		//verticais
		this.add.rectangle(700, 400, 10, 600, 100085000)
		this.add.rectangle(900, 400, 10, 600, 100085000)

		//horizontais
		this.add.rectangle(800, 300, 600, 10, 100085000)
		this.add.rectangle(800, 500, 600, 10, 100085000)



		const forma = this.add.circle(200, 200, 50, 600)
		forma.setInteractive()

		forma.on('pointerdown', () => {
			this.pegavelObject = forma
		})
		forma.on('pointerup', () => {
			this.pegavelObject = undefined
		})
	}


	update() {
		if (this.pegavelObject) {
			this.pegavelObject.setPosition(this.input.mousePointer.x, this.input.mousePointer.y)
		}
	}
}