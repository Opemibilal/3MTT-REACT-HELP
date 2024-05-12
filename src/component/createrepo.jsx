import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Createrepo({ onRepoCreated }) {
    const [show, setShow] = useState(false);
    const [inputRepoName, setInputRepoName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [readmeContent, setReadmeContent] = useState('');

    const handleInputchange = (e) => {
        setInputRepoName(e.target.value);
    }

    const handleCreateRepo = async () => {
        try {
            const response = await axios.post('https://api.github.com/user/repos', {
                name: inputRepoName,
                private: isPrivate,
                readme: readmeContent ? { content: readmeContent } : null
            }, {
                headers: {
                    Authorization: `token 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`, // Replace YOUR_ACCESS_TOKEN with your GitHub access token
                }
            });
            if (response.status === 201) {
                toast.success("Repository Created")
                onRepoCreated(inputRepoName); // Pass the name of the newly created repository
            } else {
                throw new Error('Failed to create repository');
            }
        } catch (error) {
            console.error('Error creating repository:', error);
            toast.error('Failed to create repository');
        }
    };

    return (
        <div>
            <div>
                <button className="btn btn-primary" onClick={() => setShow(!show)}>Create new repo</button>
                {show && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
                        <label>
                            <input type="checkbox" checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />
                            Private
                        </label>
                        <label>
                            README Content:
                            <textarea value={readmeContent} onChange={(e) => setReadmeContent(e.target.value)} />
                        </label>
                        <input type="text" value={inputRepoName} onChange={handleInputchange} placeholder="Repository Name" />
                        <button onClick={handleCreateRepo}>Create</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Createrepo;
