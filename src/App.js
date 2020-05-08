import React, { Component } from 'react'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import Navigation from './components/Navigation/Navigation'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import { particlesOptions } from './particlesOptions'
import './App.css'

const app = new Clarifai.App({
	apiKey: process.env.REACT_APP_API_KEY
})

class App extends Component {
	constructor() {
		super()
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false
		}
	}

	onRouteChange = route => {
		if (route === 'signout') {
			this.setState({ isSignedIn: false })
		} else if (route === 'home') {
			this.setState({ isSignedIn: true })
		}
		this.setState({ route: route })
	}

	calculateFaceLocation = data => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box
		const image = document.getElementById('inputImage')
		const width = Number(image.width)
		const height = Number(image.height)
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height
		}
	}

	displayFaceBox = box => {
		this.setState({ box })
	}

	onInputChange = e => {
		this.setState({ input: e.target.value })
	}

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input })
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(res => this.displayFaceBox(this.calculateFaceLocation(res)))
			.catch(err => console.log(err))
	}

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state
		return (
			<div className='App'>
				<Particles className='particles' params={particlesOptions} />
				<Navigation
					isSignedIn={isSignedIn}
					onRouteChange={this.onRouteChange}
				/>
				{route === 'home' ? (
					<div>
						<Logo />
						<Rank />
						<ImageLinkForm
							onButtonSubmit={this.onButtonSubmit}
							onInputChange={this.onInputChange}
						/>
						<FaceRecognition box={box} imageUrl={imageUrl} />
					</div>
				) : route === 'signin' ? (
					<SignIn onRouteChange={this.onRouteChange} />
				) : (
					<Register onRouteChange={this.onRouteChange} />
				)}
			</div>
		)
	}
}

export default App
