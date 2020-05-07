import React from 'react'

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img
          src={imageUrl}
          alt='face'
          style={{
            width: '500px',
            height: '500px',
            backgroundSize: '100% 100%'
          }}
        />
      </div>
    </div>
  )
}

export default FaceRecognition
