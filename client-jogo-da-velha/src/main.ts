import "phaser";
import {phaserConfig} from './core/config'

try {
	const game = new Phaser.Game(phaserConfig)
} catch(e) {
	console.log(e)
}