/*function Home() {
    return (
      <div>
       <h1>Home</h1>
      </div>
    );
  }
  
  export default Home;*/


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import birimg from "../images/birthdaytemp.jpg";
import aimg from "../images/artexhibtemp.png";
import bsimg from "../images/babyshowertemp.png";
import wedimg from "../images/wedanitemp.png";
import semimg from "../images/seminartemp.png";
import './EventCategories.css';
import { Link } from "react-router-dom";

const Home = () => {

    return (
        // <div className="eventCategoriesContainer">
        // <header>
        //                 <nav className="navbar navbar-expand-lg">
        //                     <div className="container-fluid">
        //                         <a className="navbar-brand" href="#">EventEase</a>
        //
        //                             <span className="d-flex">
        //                                <Link to="/login"> <button type="button" className="btn btn-outline-primary">LogOut</button></Link>
        //                             </span>
        //                     </div>
        //                 </nav>
        //       </header>
        <main>
            <div className="container-lg">
                <h5>Create an event</h5>
                <hr />
                <div className="row row-cols-3 g-3">
                    <div className="col cards ">
                        <div className="card box-shadow">
                            <Link to="/predefinedHostForm/birthday" >
                                <img src={birimg} className="card-img-top cardimage " alt="..." />
                                <div className="card-body">
                                    <p className="card-link">Birthday</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col cards">
                        <div className="card box-shadow">
                            <Link to="/predefinedHostForm/art-exhibition" >
                                <img src={aimg} className="card-img-top cardimage" alt="..." />
                                <div className="card-body">
                                    <p className="card-link">Art Exhibition</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col cards">
                        <div className="card box-shadow">
                            <Link to="/predefinedHostForm/baby-shower">  <img src={bsimg} className="card-img-top cardimage" alt="..." />
                                <div className="card-body">
                                    <p className="card-link">Baby Shower</p>
                                </div>
                                </Link>
                        </div>
                        </div>
                        <div className="col cards">
                        <div className="card box-shadow">
                            <Link to="/predefinedHostForm/wedding-anniversary" > <img src={wedimg} className="card-img-top cardimage" alt="..." />
                                <div className="card-body">
                                    <p className="card-link">Wedding Anniversary</p>
                                </div>
                                </Link>
                        </div>
                        </div>
                        <div className="col cards">
                        <div className="card box-shadow">
                            <Link to="/predefinedHostForm/workshop">
                            <img src={semimg} className="card-img-top cardimage" alt="..." />
                            <div className="card-body">
                              <p className="card-link">Seminar/Workshop</p>
                            </div>
                            </Link>
                        </div>
                        </div>
                        <div className="col cards">
                        <div className="card box-shadow">
                            <Link to="/customHostForm" className="card-body custom-event-link">
                                <FontAwesomeIcon icon={faCirclePlus} className="faiconplus" />
                                Custom Event
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </main>
        // <footer className="bd-footer py-3">
        //                 <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        //                     <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About Us</a></li>
        //                     <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Help</a></li>
        //                 </ul>
        //                 <p className="text-center text-muted">Copyright &copy; EventEase</p>
        //             </footer>
        // </div>
    );
}
export default Home;