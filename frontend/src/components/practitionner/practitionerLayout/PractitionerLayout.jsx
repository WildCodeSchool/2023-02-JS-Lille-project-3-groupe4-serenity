import React from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";
import PratictionnerNavbarMobile from "../PratictionnerNavbarMobile/PratictionnerNavbarMobile";
import PratictionnerHeaderDesktop from "../pratictionnerHeaderDesktop/PratictionnerHeaderDesktop";
import PratictionnerHeaderMobile from "../pratictionnerHeaderMobile/PratictionnerHeaderMobile";
import PratictionnerNavbarDesktop from "../pratictionnerNavbarDesktop/PratictionnerNavbarDesktop";
import styles from "./PractitionerLayout.module.css";

function PractitionerLayout() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  return (
    <div>
      {isDesktop && (
        <div className={styles.practitionerDesktopLayout}>
          <PratictionnerNavbarDesktop />
          <div className={styles.headerAndPageContainer}>
            <PratictionnerHeaderDesktop />
            <div className={styles.outletContainer}>
              <Outlet />
            </div>
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div className={styles.practitionerMobileLayout}>
          <PratictionnerHeaderMobile />
          <Outlet />
          <PratictionnerNavbarMobile />
        </div>
      )}
    </div>
  );
}

export default PractitionerLayout;
