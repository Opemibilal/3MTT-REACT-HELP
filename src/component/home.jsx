import React, { useState } from 'react';
import Createrepo from './createrepo';

function Home({ checked }) {
    const [repositories, setRepositories] = useState([
        "Add New Repo",
    ]);
    const [Modal, setModal] = useState(false)


    const addRepository = (newRepo) => {
        setRepositories([...repositories, newRepo]);
    };

    const handleDeleteRepo = (index) => {
        setRepositories(repositories.filter((_, i) => i !== index));
    };
    const handleNotDeleteRepo = (index) => {
        setRepositories(repositories.filter((_, i) => i == index));
    };

    const handleUpdateRepo = (index) => {
        const newName = prompt("Enter the new name for the repository:");
        if (newName !== null && newName.trim() !== '') {
            const updatedRepositories = [...repositories];
            updatedRepositories[index] = newName;
            setRepositories(updatedRepositories);
        }
    };
    const handleModal = () => {
        setModal(true)
    }

    return (
        <div>
            <div className="heading">
                <div className="d-flex row headcontent">
                    <div className="col-12 col-md-9">
                        <h1>Lets Get Started</h1>
                        <h2><a href="">Enjoy a seamless repo management</a></h2>
                    </div>
                    <div className="col-12 col-md-3 headbutton">
                        <Createrepo onRepoCreated={addRepository} />
                    </div>
                </div>
            </div>

            <div className="mainbody">
                {repositories.map((repo, index) => (
                    <div key={index} className="workfield d-flex row">
                        <div className="linkitem col col-9">
                            <p><span>{index + 1}.</span>{repo}</p>
                        </div>
                        <div className="buttonfield col col-3">
                            {/* <button>{checked}</button> */}
                            <button className="btn btn-primary" onClick={() => handleUpdateRepo(index)}>Update</button>
                            <button className="btn btn-outline-primary" onClick={handleModal}>Delete</button>
                        </div>
                        {
                            Modal ? (
                                <div>
                                    <h1>Are You Sure You Want to delete this repository</h1>

                                    <div>
                                        <button onClick={() => handleDeleteRepo(index)}>Yes</button>
                                        <button onClick={() => handleNotDeleteRepo(index)} >No</button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h1>hello</h1>
                                </div>
                            )
                        }
                    </div>

                ))}
            </div>

            <div className="footer d-flex" style={{ justifyContent: "center", paddingTop: "20px" }}>
                <div className="previous">
                    <h1>Previous</h1>
                </div>
                <div className="next">
                    <h1>Next</h1>
                </div>
            </div>
        </div>
    );
}

export default Home;
