import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Createrepo({ onRepoCreated }) {
    const [show, setShow] = useState(false);
    const [inputRepoName, setInputRepoName] = useState('');
    // const [IsPrivate, setIsPrivate] = useState(false)

    const handleInputchange = (e) => {
        setInputRepoName(e.target.value);
    }
    // const togglePrivacy = () => {
    //     setIsPrivate(!IsPrivate);
    // }

    const hello = () => {
        setShow(!show);
    }

    const handleCreateRepo = async () => {
        try {
            const response = await fetch('https://api.github.com/user/repos', {
                method: 'POST',
                headers: {
                    Authorization: `token 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`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: inputRepoName,
                })
            });
            if (response.ok) {
                toast.success("Respository  Created")
            }
            if (!response.ok) {
                throw new Error('Failed to create repository');
            }
            const data = await response.json();
            onRepoCreated(data.name); // Pass the name of the newly created repository
            console.log('Created repository:', data);
        } catch (error) {
            console.error('Error creating repository:', error);
            toast.error('Failed to create repository');
        }
    };


    return (
        <div>
            <div>
                <button className="btn btn-primary" onClick={hello}>Create new repo</button>
                {show && (
                    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                        <div>
                            {/* <label>
                                <input type="checkbox" checked={IsPrivate} onChange={togglePrivacy} />
                                Private
                            </label> */}
                        </div>
                        <input type="text" value={inputRepoName} onChange={handleInputchange} />
                        <button onClick={handleCreateRepo}>Create</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Createrepo;
