import React from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../../Context/Context';
import Navbar from '../../components/Navbar';
import HomeImage from "../../images/home.svg";

export default function AboutUs() {
    const [ctx, setCtx] = React.useContext(UserContext);

    return <>
        <Navbar />
        <div className="row g-0 align-items-center py-5">
        <div className="col-lg-5 mx-auto">
          <div className="card card-home">
            <h3 className="text-primary mb-3">Welcome to Smart Bank !</h3>
            <p>
              The bank that helps you to grow money. Take control all-in-one.
              You can now deposit, withdraw and many more.
            </p>
            {!ctx.name && !ctx.email && (
              <>
                <p className="mt-4">
                  Don't have an account? Create an account right away.
                </p>
                <div>
                  <Link to="/create-account" className="btn btn-primary mt-2">
                    Create an account
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-lg-5 mx-auto  ">
          <img src={HomeImage} alt="bank" height={400} />
        </div>
      </div>
    </>
}