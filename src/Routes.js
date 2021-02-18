import React from 'react';
import { Switch } from 'react-router-dom';
import RouteHandler from './components/RouterHandler';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';
import Ads from './pages/Ads';

const Routes = () => {
   return (
      <Switch>
         <RouteHandler exact path='/'>
            <Home />
         </RouteHandler>
         <RouteHandler exact path='/about'>
            <About />
         </RouteHandler>
         <RouteHandler exact path='/signin'>
           <SignIn />
         </RouteHandler>
         <RouteHandler exact path='/signup'>
           <SignUp />
         </RouteHandler>
         <RouteHandler exact path="/ad/:id">
           <AdPage />
         </RouteHandler>
         <RouteHandler private exact path="/post-an-ad">
           <AddAd />
         </RouteHandler>
         <RouteHandler exact path="/ads">
           <Ads />
         </RouteHandler>
         <RouteHandler>
            <NotFound />
         </RouteHandler>
      </Switch>
   )
}

export default Routes;