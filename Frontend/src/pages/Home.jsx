import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="d-flex justify-content-center gap-4 mt-5">
      <Link
        to="/products/men"
        className="card p-5 text-center bg-primary text-white"
      >
        Men
      </Link>
      <Link
        to="/products/women"
        className="card p-5 text-center bg-danger text-white"
      >
        Women
      </Link>

      <Link
        to="/products/kids"
        className="card p-5 text-center bg-success text-white"
      >
        Kids
      </Link>
    </div>
  );
}

export default Home;
