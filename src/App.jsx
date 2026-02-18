import React from 'react'
import Navbar from './components/Navbar';
import Order from './components/Order';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Projects from './components/Projects';


const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden:">

      <Navbar/>
      <Hero />
      <Projects />
      <Order />
      <Footer />


    </div>

  )
}

export default App