import "./styles.scss";

import MainNavigation from "../components/MainNavigation/MainNavigation";

const Layout1 = ({ children }) => {
  return (
    <div className="layout-1">
      <MainNavigation />
      {children}
    </div>
  );
};

export default Layout1;
