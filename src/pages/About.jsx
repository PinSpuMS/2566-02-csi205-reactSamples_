import React from 'react'
import { Card } from 'react-bootstrap'

import pin from '../assets/pin.jpg'

export const About = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-around'}}>

      <Card style={{maxWidth:'400px'}}>
        <Card.Img variant="top" src={pin} />
        <Card.Body>
          <Card.Text>
            <b>Pin Chatkaewmanee (D.Eng.)</b>, Instructor<br/> School of Information Technology (<b>SIT</b>)<br />Sripatum University (<b>SPU</b>)
          </Card.Text>
        </Card.Body>
      </Card>


    </div>
  )
}
