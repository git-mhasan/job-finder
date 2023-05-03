import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobData } from '../features/jobData/jobDataSlice';
import JobItem from '../components/JobItem';
import { searchJob, selectSortOption } from '../features/jobFilter/jobFilterSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { jobData, jobFilter } = useSelector(state => state);
    const { jobData: jobDataList, isLoading, isError, error, editing } = jobData;
    const { sortFilter, searchString, jobTypeFilter } = jobFilter;

    const [filterInput, setFilterInput] = useState({
        sortBy: sortFilter,
        search: searchString,
    })

    useEffect(() => {
        dispatch(fetchJobData());
    }, [dispatch])

    const handleJobTypeFilter = (jobType) => {
        if (jobTypeFilter === 'all') {
            return true
        } else if (jobType === jobTypeFilter) {
            return true
        }
    }

    const sortFunction = (a, b) => {
        if (sortFilter === "default") {
            return true;
        }
        else if (sortFilter === "lowToHigh") {
            return Number(a?.salary) - Number(b?.salary);
        }
        else if (sortFilter === "highToLow") {
            return Number(b?.salary) - Number(a?.salary);
        }
    }

    const handleSortFilterInput = (event) => {
        setFilterInput({ ...filterInput, sortBy: event.target.value });
        dispatch(selectSortOption(event.target.value));
    }

    const handleSearchInput = (event) => {
        setFilterInput({ ...filterInput, search: event.target.value });
        dispatch(searchJob(event.target.value));
    }

    return (
        <div className="lg:pl-[14rem]  mt-[5.8125rem]">
            <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
                <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
                    <h1 className="lws-section-title">{jobTypeFilter === "all" ? "All Available" : jobTypeFilter} Jobs</h1>
                    <div className="flex gap-4">
                        <div className="search-field group flex-1">
                            <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
                            <input type="text" placeholder="Search Job" className="search-input" id="lws-searchJob" value={filterInput.search} onChange={handleSearchInput} />
                        </div>
                        <select id="lws-sort" name="sort" autoComplete="sort" className="flex-1" value={filterInput.sortBy} onChange={handleSortFilterInput}>
                            <option value="default">Default</option>
                            <option value="lowToHigh">Salary (Low to High)</option>
                            <option value="highToLow">Salary (High to Low)</option>
                        </select>
                    </div>
                </div>

                <div className="jobs-list">
                    {
                        jobDataList
                            .filter(job => handleJobTypeFilter(job?.type))
                            .filter(job => job?.title?.toLowerCase().includes(searchString?.toLowerCase()))
                            .sort(sortFunction)
                            .map(job => <JobItem key={job?.id} job={job} />)
                    }
                </div>
            </main>
        </div>
    );
};

export default Home;