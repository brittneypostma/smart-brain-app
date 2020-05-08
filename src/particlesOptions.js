export const particlesOptions = {
	particles: {
		interactivity: {
			detect_on: 'canvas',
			// activate
			events: {
				onhover: {
					enable: true,
					mode: ['grab', 'bubble']
				},
				onclick: {
					enable: true,
					mode: 'push'
				},
				resize: true
			},
			// configure
			modes: {
				grab: {
					distance: 400,
					line_linked: {
						opacity: 0.7
					}
				},
				bubble: {
					distance: 600,
					size: 12,
					duration: 1,
					opacity: 0.8,
					speed: 2
				},
				repulse: {
					distance: 400,
					duration: 0.4
				},
				push: {
					particles_nb: 20 // How many you want added
				},
				remove: {
					particles_nb: 10
				}
			}
		},
		number: {
			value: 80,
			density: {
				enable: true,
				value_area: 800
			}
		},
		opacity: {
			value: 0.7,
			random: true
		},
		move: {
			enable: true,
			speed: 7,
			random: true,
			straight: false, // Whether they'll shift left and right while moving.
			out_mode: 'out', // What it'll do when it reaches the end of the canvas, either "out" or "bounce".
			bounce: false,
			attract: {
				// Make them start to clump together while moving.
				enable: true,
				rotateX: 600,
				rotateY: 1200
			}
		},
		size: {
			value: 2,
			random: true,
			anim: {
				enable: false,
				speed: 200
			}
		},
		repulse: {
			distance: 200,
			duration: 0.4
		},
		push: {
			particles_nb: 4
		},
		remove: {
			particles_nb: 2
		},
		bubble: {
			distance: 400,
			size: 40,
			duration: 2,
			opacity: 8,
			speed: 3
		},
		attract: {
			enable: false,
			rotateX: 600,
			rotateY: 1200
		}
	}
}
