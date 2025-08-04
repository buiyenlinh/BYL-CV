import FooterComponent from "@/app/components/footer/_index";
import HeaderComponent from "@/app/components/header/_index";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
};

export default App;
