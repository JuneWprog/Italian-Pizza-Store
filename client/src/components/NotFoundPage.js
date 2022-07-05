/**
 * Default page for the 404 page 
 * @author Jun Wang (wang.jun6@northeastern.edu)
 * 
 */
import React from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function NotFoundPage() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template text-center">
                        <h1>Oops!</h1>
                        <img src={logo} alt='logo' />
                        <h4>Invalid URL! This page does not Exist!</h4>
                        <Link className="error-actions btn btn-danger btn-lg" to="/">Take Me Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
