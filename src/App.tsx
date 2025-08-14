import FooterComponent from "@/app/components/footer/_index";
import HeaderComponent from "@/app/components/header/_index";
import { Outlet } from "react-router-dom";
import ScrollToTopComponent from "./app/components/scroll-top/_index";

const App = () => {
  return (
    <div className="grid grid-rows-[3.5rem_1fr_3.5rem] h-screen overflow-hidden">
      <HeaderComponent />
      <main className="overflow-y-auto px-4">
        <Outlet />
        <ScrollToTopComponent />
      </main>
      <FooterComponent />
    </div>
  );
};

export default App;
