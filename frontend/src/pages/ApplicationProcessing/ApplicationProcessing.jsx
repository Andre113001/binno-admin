import { Fragment } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Back from "../../components/Back/Back";

import styles from "./ApplicationProcessing.module.css";

const ApplicationProcessing = () => {
    return (
        <Fragment>
            <Topbar />
            <div className="container">
                <div>
                    <Back link="/dashboard" />
                </div>

                <div className={`${styles["title"]}`}>
                    <h6 className={`${styles["application-processing-title"]}`}>
                        Request
                    </h6>
                </div>

                <div className={`${styles["filters"]}`}>
                    <div>
                        <p>Hello John C. Otilla</p>
                    </div>

                    <div>
                        <p>Hello John C. Otilla</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ApplicationProcessing;
