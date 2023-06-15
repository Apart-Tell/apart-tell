import React from "react";
import './about.scss';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default function About(){
    return(
        <>
            <Header/>
            <div class="about-container">

                <h2 className="about-h2">About Us</h2>
                <div className="about-description">
                    Apart-Tell is a directory of available accommodations within Mintal, Davao City.
                    It is a fruition of our project from CMSC 127, File Processing and Database System.
                </div>

                <h2 className="about-h2">Developers</h2>
                <div className="people">

                    <div className="team">
                        <img src="src/assets/images/dev-danica.jpg" alt="" />
                        <h4>Danica Apostol</h4>
                    </div>
                    <div className="team">
                        <img src="src/assets/images/dev-meekah.jpg" alt="" />
                        <h4>Meekah Yzabelle Carballo</h4>
                    </div>
                    <div className="team">
                        <img src="src/assets/images/dev-sanyiah.png" alt="" />
                        <h4>Sanyiah Piang</h4>
                    </div>
                    <div className="team">
                        <img src="src/assets/images/dev-satori.jpg" alt="" />
                        <h4>Khublei Mo Satori Pelayo</h4>
                    </div>
                </div>
                <h2 className="about-h2">Project Managers</h2>
                <div className="people">

                    <div className="team">
                        <img src="src/assets/images/PM-dani.jpg" alt="" />
                        <h4>Daniel Gabriel Manabat</h4>
                    </div>
                    <div className="team">
                        <img src="src/assets/images/PM-jeff.jpg" alt="" />
                        <h4>Jeff Erxon Palen</h4>
                    </div>
                    <div className="team">
                        <img src="src/assets/images/PM-kit.jpg" alt="" />
                        <h4>Keith Napolitano</h4>
                    </div>
                    <div className="team">
                        <img src="src/assets/images/PM-paolo.jpg" alt="" />
                        <h4>Paolo Lumontod</h4>
                    </div>
                </div>
                
            </div>
            <Footer/>
        </>
    )
}