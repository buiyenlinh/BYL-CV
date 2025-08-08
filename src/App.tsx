import FooterComponent from "@/app/components/footer/_index";
import HeaderComponent from "@/app/components/header/_index";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <HeaderComponent />
      <main className="h-[calc(100%-7rem)] w-full">
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
};

export default App;
