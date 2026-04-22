import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Men",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800",
      path: "men",
    },
    {
      name: "Women",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      path: "women",
    },
    {
      name: "Kids",
      image:
        "https://images.unsplash.com/photo-1742390671657-c8738e123962?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      path: "kids",
    },
  ];

  return (
    <div>
      {/* HERO SECTION */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0,0,0,0.5))",
          height: "60vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Step Into Style
          </h1>
          <p>Discover the latest trends in footwear</p>
          <button
            className="btn btn-light mt-3"
            onClick={() => navigate("/products/men")}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* CATEGORY SECTION */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Shop by Category</h2>

        <div className="row">
          {categories.map((cat) => (
            <div key={cat.name} className="col-md-4 mb-4">
              <div
                className="card h-100 shadow-sm"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
                onClick={() => navigate(`/products/${cat.path}`)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="card-img-top"
                  style={{ height: "300px", objectFit: "cover" }}
                />

                <div className="card-body text-center">
                  <h4>{cat.name}</h4>
                  <button className="btn btn-dark mt-2">Explore</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXTRA SECTION */}
      <div className="container text-center my-5">
        <h3>Why Choose SoleMate?</h3>
        <div className="row mt-4">
          <div className="col-md-4">
            <h5>🚚 Fast Delivery</h5>
            <p>Quick and reliable shipping</p>
          </div>
          <div className="col-md-4">
            <h5>💯 Premium Quality</h5>
            <p>Top-notch materials and design</p>
          </div>
          <div className="col-md-4">
            <h5>🔄 Easy Returns</h5>
            <p>Hassle-free return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
