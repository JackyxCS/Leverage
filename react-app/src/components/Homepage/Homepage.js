import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Homepage.css'

function Homepage() {

    return (
        <div className="homepage">
            <div className="homepage1">
                <div className="homepage2">
                    <div className="homepage-text">
                        <div className="homepage-text2">
                            <h1 className="header-text">Social Investing for Everyone</h1>
                            <div className="body-text">Commission-free social investing, plus the tools
                                you need to put your money in motion. Sign
                                up and get your first stock for free. Certain
                                limitations apply.
                            </div>
                            <div className="sign-up">
                                <div className="sign-up1">
                                    <div className="sign-up2">
                                        <a className="sign-up3" href="/signup" type="anchor">
                                            <span className="span">Sign Up</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="homepage-video">
                        <div className="homepage-video2">
                            <div className="homepage-video3">
                                <video
                                    className="video"
                                    autoPlay
                                    controlsList="nodownload nofullscreen noremoteplayback"
                                    loop
                                    muted
                                    playsInline=""
                                    preload="auto">
                                    <source
                                        src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/3x__327bf4cc768a323497d5aaa7416319c2.mp4"
                                        type="video/mp4" />
                                    <img
                                        className="video-image"
                                        draggable="false"
                                        role="presentation"
                                        src="https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png"
                                        srcSet="https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png, https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png 2x, https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png 3x" />
                                </video>
                                <div className="video-overlay">
                                    <img className="overlay-image" src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/2x__ff9c36e27d7018cf707b95d8675793a3.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage