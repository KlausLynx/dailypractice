import { BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import { Greeting } from './helloRouter';
import { Navbar } from './navBar';
import { Home } from './components/home'
import { Services } from './components/services'
import { Portfolio } from './components/portfolio'
import { Contact } from './components/contact'
import { NotFound } from './components/notFound';
import { Footer } from './components/footer';

export default function HelloRouter () {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    {/* <Route path="/" element={<Greeting />} /> Needed the "/"  for the other page exercises */} 
                    <Route path="/" element={<Home />} />
                    <Route path='/contact' element={<Contact/>} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="*" element={<NotFound />} />
                </Routes> 
                <Footer />
            </Router>
        </>
    )
}