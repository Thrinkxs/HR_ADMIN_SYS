import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <button>
          <Link to="/admin/login">Login as Admin</Link>
        </button>
      </div>

      <div>
        {" "}
        <button>
          <Link to="/employee/login">Login as Employee</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
