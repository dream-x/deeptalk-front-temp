import {useTranslation} from "react-i18next";
import Parser from "html-react-parser";

export function HomeScreen(
    {
        title = "DemoFullUserName",
        subtitle = "DemoUserPosition",
        description = "DemoMainDescription"
    }) {

    const {t} = useTranslation();

    return (
        <section className="homeScreen section">
            <div className="homeScreen__top homeScreen__top--full">
                <div className="container_center">
                    <div className="homeScreen__content">
                        <div className="homeScreen__left">
                            <h1 className="homeScreen__title">
                                {t(title)}
                            </h1>
                            <div className="homeScreen__sub">
                                {t(subtitle)}
                            </div>
                            <div className="homeScreen__second-sub">
                                {Parser(t(description))}
                            </div>
                        </div>
                        <div className="homeScreen__right">
                            <div className="homeScreen__clip">
                                <svg className="clip-svg">
                                    <defs>
                                        <clipPath id="clipping" clipPathUnits="objectBoundingBox">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M272.216 136.856L260.007 124.61C242.747 107.296 216.573 95.6779 190.867
                                                    95.6779C159.608 95.6779 135.499 106.76 119.131 124.227C102.637 141.828
                                                    92.8616 167.153 92.8616 197.439C92.8616 259.368 136.037 299.2 190.867
                                                    299.2C216.573 299.2 242.747 287.581 260.007 270.268L272.216 258.022L337.232
                                                    323.239L325.099 335.41C291.582 369.03 243.209 391.478 190.867
                                                    391.478C86.8368 391.478 0.761719 316.153 0.761719 197.439C0.761719
                                                    86.4172 79.1686 3.39995 190.867 3.39995C243.209 3.39995 291.582
                                                    25.8478 325.099 59.4679L337.232 71.6389L272.216 136.856ZM353.274
                                                    6.80003H428.135C469.642 6.80003 523.598 11.8771 567.591 38.6356C613.123
                                                    66.3309 645.357 115.611 645.357 197.439C645.357 277.497
                                                    614.039 326.707 569.046 354.854C525.491 382.1 471.527 388.078
                                                    428.135 388.078H353.274V6.80003ZM553.256 194.249V194.039C553.256
                                                    163.184 545.246 142.858 534.628 129.165C523.901 115.331 509.348
                                                    106.771 493.848 101.588C478.271 96.3798 462.366 94.8084 450.104
                                                    94.6132C448.446 94.5868 446.866 94.5857 445.374
                                                    94.6033V296.837C446.99 296.853 448.71 296.848 450.519 296.813C463.045
                                                    296.568 479.243 294.898 495.004 289.504C510.682 284.138 525.284 275.327
                                                    535.86 261.139C546.336 247.086 554.033 226.193 553.261 194.458L553.256
                                                    194.249ZM943.636 295.8V388.078H682.059V295.8H943.636ZM960.584
                                                    146.439C960.584 227.31 895.293 292.878 814.542 292.878C733.791 292.878
                                                    668.501 227.31 668.501 146.439C668.501 65.5682 733.791 0 814.542
                                                    0C895.293 0 960.584 65.5682 960.584 146.439ZM868.483 146.439C868.483
                                                    115.11 845.646 92.2779 814.542 92.2779C786.828 92.2779 760.601
                                                    118.51 760.601 146.439C760.601 177.768 783.438 200.6 814.542
                                                    200.6C845.646 200.6 868.483 177.768 868.483 146.439Z"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <div className="homeScreen__video">
                                    <video
                                        src='/video/cdo.mp4'
                                        autoPlay
                                        muted
                                        loop
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container_center">
                    <a href='#videoContainer'>
                        <img className="down-mouse" src="/img/mouse-down.svg" alt=" "/>
                    </a>
                </div>
            </div>
        </section>
    );
}
