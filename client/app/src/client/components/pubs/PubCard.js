import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

const PubCard = ({ pub }) => {
    return (
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" key={pub._id}>
            <Link to={`/pubs/${pub._id}`}>
                <div className="card">
                    <img
                        className="img-pub img-card-top img-fluid"
                        src={pub.image}
                        alt={pub.name}
                    />

                    <div className="card-body">
                        <div className="row">
                            <div className="col-12" />
                            <div className="col-12">
                                <div className="card-header card-header-rose">
                                    <span className="pub-card-title">
                                        {pub.name}
                                    </span>
                                </div>

                                <p className="pull-right text-secondary font-weight-bold mt-3">
                                    {pub.address.city}, {pub.address.street}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

PubCard.propTypes = {
    pub: PropTypes.object.isRequired
};

export default withRouter(PubCard);
