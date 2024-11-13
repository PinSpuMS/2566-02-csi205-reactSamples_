import React from 'react'

export const Home = () => {
  return (
    <div style={{ textAlign: 'left' }}>
      <p>
        <b>CSI205 Front End Software Development</b>, this course is teaching several topics as follow
      </p>
      <ul>
        <li>
          <b>Basic UX/UI:</b> review the background basic to design friendly web
          interface with UX research (study in previous course)
        </li>
        <li>
          <b>Traditional HTML/CSS/JS:</b> learn from ground start from nothing
          with basic used of HTML tags, then make webpage look petty using
          CSS, and finally write a JavaScript to interact with user or handle
          DOM events inside a webpage
        </li>
        <li>
          <b>React web application:</b> start form basic idea of React such as Virtual DOM, both class and function components, props and states, and ton of React hook examples  
        </li>
        <li>
          <b>Prepare Back End Interfaces: </b> An example prepared for future interfaces to Back End via APIs
        </li>
        <li>
          <b>Basic DevOp:</b> such as virtual machine, container technology, version control and deployment tools
        </li>
      </ul>
      Hope, you enjoy this course :)
    </div>
  )
}
