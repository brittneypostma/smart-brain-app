import React, { Component } from 'react'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css'

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_API_KEY
})

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
    // size: {
    //   value: 3,
    //   random: true,
    //   anim: {
    //     enable: false,
    //     speed: 40
    //   }
    // }
    // repulse: {
    //   distance: 200,
    //   duration: 0.4
    // },
    // push: {
    //   particles_nb: 4
    // },
    // remove: {
    //   particles_nb: 2
    // },
    // bubble: {
    //   distance: 400,
    //   size: 40,
    //   duration: 2,
    //   opacity: 8,
    //   speed: 3
    // },
    // attract: {
    //   enable: false,
    //   rotateX: 600,
    //   rotateY: 1200
    // }
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = e => {
    this.setState({ input: e.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function (res) {
        console.log(res.outputs[0].data.regions[0].region_info.bounding_box)
      },
      function (err) {
        console.log(err)
      }
    )
    // app.models
    //   .predict(
    //     Clarifai.FACE_DETECT_MODEL,
    //     this.state.input)
    //   .then(response => {
    //     if (response) {
    //       fetch('http://localhost:3000/image', {
    //         method: 'put',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //           id: this.state.user.id
    //         })
    //       })
    //         .then(response => response.json())
    //         .then(count => {
    //           this.setState(Object.assign(this.state.user, { entries: count}))
    //         })

    //     }
    //     this.displayFaceBox(this.calculateFaceLocation(response))
    //   })
    //   .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onButtonSubmit={this.onButtonSubmit}
          onInputChange={this.onInputChange}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    )
  }
}

export default App
