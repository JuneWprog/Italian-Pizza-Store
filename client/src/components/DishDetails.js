import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function DishDetails({ signedInUser, onAdd }) {

  const { dishId } = useParams();
  const [dish, setDish] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  const [error, setError] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/dishes/${dishId}`);
        if (!response.ok) {
          setError(await response.json());
          setIsLoading(false);
          return;
        }
        const data = await response.json();
        setDish(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [dishId]);

  const deleteDish = async () => {
    try {
      const response = await fetch(`/api/dishes/${dishId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        setError(await response.json());
        setIsLoading(false);
        return;
      }
      alert("Dish Deleted!");
      navigate("/menus");
    } catch (err) {
      console.log(err);
    }
  };

  return signedInUser && signedInUser.accessLevel === 1 ? (
    <div className="dishDetailContainer">
      <DishInfo isLoading={isLoading} dish={dish} error={error} />
      <Button variant="secondary" onClick={() => { navigate(`/dishes/${dish._id}/update`) }}>
        Edit
      </Button>
      <Button variant="secondary" onClick={deleteDish}>
        Delete
      </Button>
    </div>
  ) : (
    <div className="dishDetailContainer">
      <DishInfo isLoading={isLoading} dish={dish} />
      <Button variant="danger" onClick={() => onAdd(dish)}>Add To Cart</Button>
      <Button variant="secondary" onClick={() => navigate(`/menus/${dish.category.link}`)}>Back</Button>
    </div>
  );
}

function DishInfo({ isLoading, dish, error }) {
  return (
    <>
      {
        isLoading ? <p> Loading...</p> :
          error && error.dishError ? <h4 className="text-danger">{error.dishError}</h4> :
            dish ? (
              <>
                <div>
                  <div className="dishDetailImg d-flex justify-content-center">
                    <img src={`/${dish.imagePath}`} alt={dish.name} />
                  </div>
                  <div className="dishDetailInfo">
                    <h2>Name: {dish.name}</h2>
                    <p>{dish.description}</p>
                    <p>Price: ${dish.price}</p>
                    <p>Spice:{dish.spice}</p>
                  </div>
                </div>
              </>
            ) : (
              <li>Coming Soon</li>
            )
      }
    </>
  );
}

