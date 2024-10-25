
import { ReactTyped } from 'react-typed'
import './main.css'

function Main() {
   
  return (
    <div className='main roboto-regular'>
        <div>
        <div className='p-photo'>

        </div>
        </div>
        <div className='semi-about'>
            <h2>I am a</h2>
            <h1>
        
        <ReactTyped
          strings={["Web Developer.", "Writer.", "Web Designer."]}
          typeSpeed={50}
          loop
          backSpeed={20}
          cursorChar="|"
          showCursor={true}
        />
      </h1>
      <h6>experienced with</h6>
      <ul className='roboto-regular'>
        <li>HTML, CSS, JavaScript, TypeScript</li>
        <li>React, Node js, NPM ,Git</li>
        <li>TailwindCSS, Shadcn ui</li>
        <li>Visual design, Figma</li>
        
      </ul>
      
      </div>
    </div>
  )
}

export default Main