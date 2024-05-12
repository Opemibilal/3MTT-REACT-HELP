import React, { useState } from 'react';
import Createrepo from './createrepo';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteRepo from './Deleterepo';
import RepositoryInfo from './RepositoryInfo';

function Home({ checked }) {
    const [repositories, setRepositories] = useState(["Add New Repo"]);
    const [modalIndex, setModalIndex] = useState(null);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const addRepository = (newRepo) => {
        setRepositories([...repositories, newRepo]);
    };

    const handleDeleteRepo = async (index) => {
        try {
            const repoToDelete = repositories[index];
            console.log('Repo to delete:', repoToDelete); // Log the repository name for debugging
            const response = await axios.delete(`https://api.github.com/repos/feyishewa/${repoToDelete}`, {
                headers: {
                    Authorization: `token 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`,
                },
            });
            console.log('Delete response:', response);
            if (response.status === 204) {
                setRepositories(repositories.filter((_, i) => i !== index));
                setModalIndex(null); 
                setShowModal(false);
            } else {
                toast.error('Failed to delete repository');
            }
        } catch (error) {
            console.error('Error deleting repository:', error);
            toast.error('Error deleting repository:', error);
        }
    };
    

    const handleModal = (index) => {
        setModalIndex(index); 
        setShowModal(true);
    };

    const handleNotDeleteRepo = () => {
        setModalIndex(null);
        setShowModal(false);
    };

    const handleUpdateRepo = async (index) => {
        try {
            const newName = prompt("Enter the new name for the repository:");
            if (newName !== null && newName.trim() !== '') {
                const response = await axios.patch(`https://api.github.com/repos/feyishewa/${repositories[index]}`, {
                    name: newName,
                }, {
                    headers: {
                        Authorization: `token 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`,
                    },
                });
                if (response.status === 200) {
                    const updatedRepositories = [...repositories];
                    updatedRepositories[index] = newName;
                    setRepositories(updatedRepositories);
                } else {
                    console.error('Failed to update repository');
                }
            }
        } catch (error) {
            toast.error('Error updating repository:', error);
        }
    };
    const handleViewInfo = async (repoName) => {
        try {
            const response = await axios.get(`https://api.github.com/repos/feyishewa/${repoName}`, {
                headers: {
                    Authorization: `token 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`,
                },
            });
            if (response.status === 200) {
                setSelectedRepo(response.data);
            } else {
                toast.error('Failed to fetch repository information');
            }
        } catch (error) {
            toast.error('Error fetching repository information:', error);
        }
    };

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
                            <button className="btn btn-primary" onClick={() => handleUpdateRepo(index)}>Update</button>
                            <button className="btn btn-outline-primary" onClick={() => handleModal(index)}>Delete</button>
                        </div>
                        <div className="buttonfield col col-3">
                            <button className="btn btn-primary" onClick={() => handleViewInfo(repo)}>View Info</button>
                        </div>
                        {modalIndex === index && (
                            <div>
                                <h6>Are You Sure You Want to delete this repository</h6>
                                {/* <div style={{ display: "flex", gap: "20px", }}>
                                    <button onClick={() => handleDeleteRepo(index)} style={{width: "90px"}}>Yes</button>
                                    <button onClick={handleNotDeleteRepo}>No</button>
                                </div> */}
                            </div>
                        )}
                    </div>
                ))}
                  {showModal && <DeleteRepo onConfirm={() => handleDeleteRepo(modalIndex)} onCancel={handleNotDeleteRepo} />}
            </div>

            <div className="footer d-flex" style={{ justifyContent: "center", paddingTop: "20px" }}>
                <div className="previous">
                    <h1>Previous</h1>
                </div>
                <div className="next">
                    <h1>Next</h1>
                </div>
            </div>

            {selectedRepo && <RepositoryInfo repo={selectedRepo} onClose={() => setSelectedRepo(null)} />}
            
        </div>
    );
}

export default Home;
