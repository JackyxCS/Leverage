import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const AboutMeContainer = () => {
    return (
        <div className="icons">
            <div className="about-me-text">Hi, I'm Jacky. Thanks for visiting my web app, Leverage. <br /> <br /> A 2021 Gallup poll found that
                only 55% of Americans participate in the financial markets. Given the importance of investing in creating future
                financial security, Leverage was created in order to encourage more market participation by leveraging the social engagement factor, connecting
                users with their friends as they embark on their investment journeys together.
            </div>
            <a href='https://github.com/JackyxCS' target="_blank" rel="noreferrer">
                <button>
                    <FontAwesomeIcon icon={faGithub}
                        style={{ transform: [{ rotateX: '180deg' }] }}
                        size='2x' />
                </button>
            </a>
            <a href='https://www.linkedin.com/in/liujiehao' target="_blank" rel="noreferrer">
                <button>
                    <FontAwesomeIcon icon={faLinkedin}
                        style={{ transform: [{ rotateX: '180deg' }] }}
                        size='2x' />
                </button>
            </a>
        </div>
    )
}

export default AboutMeContainer