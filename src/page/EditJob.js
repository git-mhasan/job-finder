import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editInActive, editJobItem } from '../features/jobData/jobDataSlice';

const EditJob = () => {
    const { editing } = useSelector(state => state.jobData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isEmpty = Object.values(editing).some(x => x === null || x === '');

    const [jobInfo, setJobInfo] = useState({
        title: editing.title,
        type: editing.type,
        salary: editing.salary,
        deadline: editing.deadline,
    });
    const handleTitleChange = (event) => {
        setJobInfo({ ...jobInfo, title: event.target.value })
    }
    const handleTypeChange = (event) => {
        setJobInfo({ ...jobInfo, type: event.target.value })
    }
    const handleSalaryChange = (event) => {
        setJobInfo({ ...jobInfo, salary: Number(event.target.value) })
    }
    const handleDeadlineChange = (event) => {
        setJobInfo({ ...jobInfo, deadline: event.target.value })
    }

    const handleEditJobData = (event) => {
        event.preventDefault();
        dispatch(editJobItem({ id: editing.id, data: jobInfo }))
        dispatch(editInActive());
        navigate("/");
    }

    return (
        <>{
            isEmpty ?
                <div className="lg:pl-[14rem] mt-[5.8125rem]">
                    There is an error editing Job data.
                </div>
                :
                <div className="lg:pl-[14rem] mt-[5.8125rem]">
                    <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
                        <h1 className="mb-10 text-center lws-section-title">Edit Job</h1>

                        <div className="max-w-3xl mx-auto">
                            <form className="space-y-6">
                                <div className="fieldContainer">
                                    <label htmlFor="lws-JobTitle" className="text-sm font-medium text-slate-300">Job Title</label>
                                    <select id="lws-JobTitle" name="lwsJobTitle" required value={jobInfo.title} onChange={handleTitleChange}>
                                        <option value="" hidden defaultValue>Select Job</option>
                                        <option value="Software Engineer">Software Engineer</option>
                                        <option value="Software Developer">Software Developer</option>
                                        <option value="Full Stack Developer">Full Stack Developer</option>
                                        <option value="MERN Stack Developer">MERN Stack Developer</option>
                                        <option value="DevOps Engineer">DevOps Engineer</option>
                                        <option value="QA Engineer">QA Engineer</option>
                                        <option value="Product Manager">Product Manager</option>
                                        <option value="Social Media Manager">Social Media Manager</option>
                                        <option value="Senior Executive">Senior Executive</option>
                                        <option value="Junior Executive">Junior Executive</option>
                                        <option value="Android App Developer">Android App Developer</option>
                                        <option value="IOS App Developer">IOS App Developer</option>
                                        <option value="Frontend Developer">Frontend Developer</option>
                                        <option value="Frontend Engineer">Frontend Engineer</option>
                                    </select>
                                </div>

                                <div className="fieldContainer">
                                    <label htmlFor="lws-JobType">Job Type</label>
                                    <select id="lws-JobType" name="lwsJobType" required value={jobInfo.type} onChange={handleTypeChange}>
                                        <option value="" hidden defaultValue>Select Job Type</option>
                                        <option value="Full Time">Full Time</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Remote">Remote</option>
                                    </select>
                                </div>

                                <div className="fieldContainer">
                                    <label htmlFor="lws-JobSalary">Salary</label>
                                    <div className="flex border rounded-md shadow-sm border-slate-600">
                                        <span className="input-tag">BDT</span>
                                        <input type="number" name="lwsJobSalary" id="lws-JobSalary" required className="!rounded-l-none !border-0"
                                            placeholder="20,00,000"
                                            value={jobInfo.salary} onChange={handleSalaryChange} />
                                    </div>
                                </div>

                                <div className="fieldContainer">
                                    <label htmlFor="lws-JobDeadline">Deadline</label>
                                    <input type="date" name="lwsJobDeadline" id="lws-JobDeadline" required value={jobInfo.deadline} onChange={handleDeadlineChange} />
                                </div>

                                <div className="text-right">
                                    <button type="submit" id="lws-submit" className="cursor-pointer btn btn-primary w-fit" onClick={handleEditJobData}>
                                        Edit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
        }

        </>
    );
};

export default EditJob;