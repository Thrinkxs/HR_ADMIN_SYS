import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";
import CreateEmployees from "../employees/CreateEmployees";
import EmployeeList from "../employees/ViewEmployees";
import Dashboard from "./Dashboard";

type Props = {
  children: React.ReactNode;
};

const Home = ({ children }: Props) => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="bg-white flex flex-col">
          {children}
          {/* <Dashboard />
          <CreateEmployees />
          <EmployeeList />
          <div>Here</div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
