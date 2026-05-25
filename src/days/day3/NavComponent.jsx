import React from 'react'
const menuItems = [
    { text: 'Home', url: '/' },
    { text: 'About', url: '/about' },
    { text: 'Contact', url: '/contact' },
];

const NavBar = ({items = menuItems}) => {

    return (
        <nav style={{
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderBottom: '2px'
        }}>
            <ul style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                textAlign: 'center'
            }}>
                {items.map((item) => (
                    <NavItem key={item.url} text={item.text} url={item.url} />
                ))}
            </ul>
        </nav>
    )
}
const NavItem = ({text, url}) => {
  
  return (
    <li style={{
        display: 'inline-block',
        margin: '0 15px'
    }}>
        <a href={url}
        style={{
            textDecoration: 'none'
        }}
        onMouseOver={(e) => e.target.style.color = '#2196f3'}
        onMouseOut={(e) => e.target.style.color = '#333'}
        >
            {text}
        </a>
    </li>
  )
}


export default NavBar