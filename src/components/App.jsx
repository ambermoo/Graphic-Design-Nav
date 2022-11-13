import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Heading from "./Heading";
import { NavBar, PageLinks } from "./Navigation";
import Gallery from "./Gallery";

function App(){

    const location = useLocation();
    console.log(location);
    // Simplifies location pathname - pass to <Heading> and <Gallery>
    // 1st replace hyphens with spaces, 2nd remove special characters, 3rd capitalize first letter of every word
    const pageTitle = location.pathname.replace(/-/g, ' ').replace(/[^a-zA-Z ]/g, "").replace(/(^\w{1})|(\s{1}\w{1})|(?:- |\d\. ).*/g, match => match.toUpperCase());
    
    // #region - generate number for button press
    const [imageNum, setImageNum] = useState(0);

    function increaseImageNum() {
        setImageNum(imageNum + 1);
    }
    function decreaseImageNum() {
        setImageNum(imageNum - 1);
    }

    // #endregion - generate number for button press

    return(
        <Router>
            <div id="grid">
                <Switch>
                    <Route exact path="/Graphic-Design-Nav" >
                        <Heading 
                            // takes Heading title from url pathname
                            urlTitle= {pageTitle}
                        />
                        <Gallery 
                            currentPage = {location.pathname}
                            imageRequest = {imageNum}
                            pageTitle = {pageTitle}
                        />
                        <NavBar 
                            nextImg={((e) => increaseImageNum(e))}
                            prevImg={((e) => decreaseImageNum(e))}
                        />
                        <PageLinks 
                            currentPage = {location.pathname}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;