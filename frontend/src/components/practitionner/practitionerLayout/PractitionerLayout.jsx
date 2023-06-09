import React from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";
import PratictionnerNavbarMobile from "../PratictionnerNavbarMobile/PratictionnerNavbarMobile";
import PratictionnerHeaderDesktop from "../pratictionnerHeaderDesktop/PratictionnerHeaderDesktop";
import PratictionnerHeaderMobile from "../pratictionnerHeaderMobile/PratictionnerHeaderMobile";
import PratictionnerNavbarDesktop from "../pratictionnerNavbarDesktop/PratictionnerNavbarDesktop";

function PractitionerLayout() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  return (
    <div>
      {isDesktop && <PratictionnerHeaderDesktop />}
      {isTabletOrMobile && <PratictionnerHeaderMobile />}
      <Outlet />
      {isDesktop && <PratictionnerNavbarDesktop />}
      {isTabletOrMobile && <PratictionnerNavbarMobile />}
    </div>
  );
}

export default PractitionerLayout;
