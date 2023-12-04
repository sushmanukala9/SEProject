/*function Home() {
    return (
      <div>
       <h1>Home</h1>
      </div>
    );
  }
  
  export default Home;*/


import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import birimg from "../images/birthdaytemp.jpg";
import aimg from "../images/artexhibtemp.png";
import bsimg from "../images/babyshowertemp.png";
import wedimg from "../images/wedanitemp.png";
import semimg from "../images/seminartemp.png";
import './EventCategories.css';
import {Link} from "react-router-dom";

const Home = () => {

    return (
        <main>
            <div className="container-lg">
                <h5>Create an event</h5>
                <hr/>
                <div className="row row-cols-3 g-3">
                    <div className="col cards ">
                        <div className="card box-shadow">
                            <Link to="/customHostForm/birthday">
                                <img src={birimg} className="card-img-top cardimage " alt="..."/>
                                <div className="card-body">
                                    <p className="card-link">Birthday</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col cards">
                        <div className="card box-shadow">
                            <Link to="/customHostForm/art-exhibition">
                                <img src={aimg} className="card-img-top cardimage" alt="..."/>
                                <div className="card-body">
                                    <p className="card-link">Art Exhibition</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col cards">
                        <div className="card box-shadow">
                            <Link to="/customHostForm/baby-shower"> <img src={bsimg}
                                                                             className="card-img-top cardimage"
                                                                             alt="..."/>
                                <div className="card-body">
                                    <p className="card-link">Baby Shower</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col cards">
                        <div className="card box-shadow">
                            <Link to="/customHostForm/wedding-anniversary"> <img src={wedimg}
                                                                                     className="card-img-top cardimage"
                                                                                     alt="..."/>
                                <div className="card-body">
                                    <p className="card-link">Wedding Anniversary</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col cards">
                        <div className="card box-shadow">
                            <Link to="/customHostForm/workshop">
                                <img src={semimg} className="card-img-top cardimage" alt="..."/>
                                <div className="card-body">
                                    <p className="card-link">Seminar/Workshop</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col cards">
                        <div className="card box-shadow">
                            <Link to="/customHostForm/custom" className="card-body custom-event-link">
                                <FontAwesomeIcon icon={faCirclePlus} className="faiconplus"/>
                                Custom Event
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}
export default Home;