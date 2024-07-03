import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FirstPg from './Pages/firstpg';
import SecondPg from './Pages/secondpg';

function AppContent(){

    const location =useLocation();
    const {title} =location.state || {};

    return(

        <div className='App'>
            <TransitionGroup>
                <CSSTransition key={location.key} classNames="page" timeout={1000}>
                    <Routes location={location}>

                        <Route path='/' element={<FirstPg/>} />
                        <Route path='/secondpg' element={<SecondPg/>} />

                    </Routes>
                </CSSTransition>
            </TransitionGroup>
        </div>

    );
}

export default function App(){
    return(
        <BrowserRouter>
            <AppContent/>
        </BrowserRouter>
    );
}