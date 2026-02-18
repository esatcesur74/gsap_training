import React from 'react'
import Navbar from './components/Navbar';
import Order from './components/Order';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import Projects from './components/Projects';


const App = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      <Navbar/>
      <Gallery />
      <Projects />
      <Order />
      <Footer />


    </div>

  )
}

export default App