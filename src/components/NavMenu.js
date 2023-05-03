import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import { selectJobType } from '../features/jobFilter/jobFilterSlice';

const NavMenu = () => {

    const matchJobPage = useMatch("/");
    const matchAddJobPage = useMatch("/add-job");
    const dispatch = useDispatch()

    const handleJobTypeFilter = (jobType) => {
        dispatch(selectJobType(jobType));
    }

    return (
        <div className="sidebar">
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link to="/" className={`main-menu ${matchJobPage && "menu-active"}`} id="lws-alljobs-menu" onClick={() => { handleJobTypeFilter("all") }}>
                            <i className="fa-solid fa-briefcase"></i>
                            <span> All Available Jobs</span>
                        </Link>
                        <ul className="space-y-6 lg:space-y-2 ">
                            <li>
                                <button className="sub-menu" id="lws-internship-menu" onClick={() => { handleJobTypeFilter("Internship") }}>
                                    <i className="fa-solid fa-stop !text-[#FF5757]"></i>&nbsp;
                                    Internship
                                </button>
                            </li>
                            <li>
                                <button className="sub-menu" id="lws-fulltime-menu" onClick={() => { handleJobTypeFilter("Full Time") }}>
                                    <i className="fa-solid fa-stop !text-[#FF8A00]"></i>&nbsp;
                                    Full Time
                                </button>
                            </li>
                            <li>
                                <button className="sub-menu" id="lws-remote-menu" onClick={() => { handleJobTypeFilter("Remote") }}>
                                    <i className="fa-solid fa-stop !text-[#56E5C4]"></i>&nbsp;
                                    Remote
                                </button>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/add-job" className={`main-menu ${matchAddJobPage && "menu-active"}`} id="lws-addJob-menu">
                            <i className="fa-solid fa-file-circle-plus"></i>&nbsp;
                            <span>Add NewJob</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavMenu;