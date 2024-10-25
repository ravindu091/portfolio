import './navbar.css'

export default function NavBar(){
  return(
    <div className='nav-bar'>
      <div className='logo'>
        <h1>LOGO</h1>
      </div>
      <div className='nav-links'>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  )
}