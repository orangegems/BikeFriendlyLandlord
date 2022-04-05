import React from 'react'
import './footer.css';

export default function Footer() {
  return (
    <footer id="footer">
        &copy; {new Date().getFullYear()} Bike Friendly Landlord
    </footer>
  )
}
