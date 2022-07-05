/**
 * Fuzzy search for dishes(products) based on the search query 
 * critia can be category, dish name, description,spice level.
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React, { useState, useEffect } from 'react';
import Dish from "./Dish";
import { useParams, useNavigate } from "react-router-dom";

export default function Search({ onAdd }) {

    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [criteria, setCriteria] = useState(useParams().criteria || "");
    const [error, setError] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                if (criteria) {
                    navigate(`/searchDish/${criteria}`);
                    const response = await fetch(`/api/searchDish/${criteria}`);
                    if (!response.ok) {
                        setError(await response.json());
                        setIsLoading(false);
                        return;
                    }
                    const data = await response.json();
                    setResults(data);
                    setIsLoading(false);
                } else {
                    navigate(`/searchDish`);
                    setResults([]);
                }
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, [isLoading, criteria, navigate]);

    return (
        <>
            <div className='d-flex justify-content-center'>
                <div className="input-group w-75">
                    <input type="search"
                        value={criteria}
                        className="form-control rounded"
                        placeholder="Search Category, Dish or Spice Level"
                        aria-label="Search Category, Dish or Spice Level"
                        aria-describedby="search-addon"
                        onChange={(e) => setCriteria(e.target.value)} />
                </div>
            </div>
            <hr />
            {
                isLoading ? <p> Loading...</p> :
                    error && error.dishError ? <h4 className="text-danger">{error.dishError}</h4> :
                        results.length > 0 ? (
                            <div className="dishContainer">
                                <ul className="dishList row">
                                    {results.map((dish) => (
                                        <li key={dish._id} className="col-xl-3 col-lg-4 col-md-6" >
                                            <Dish key={dish._id} dish={dish} onAdd={onAdd} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <h3 className='text-muted'>No Results to Show!</h3>
                        )
            }
        </>
    )
}
