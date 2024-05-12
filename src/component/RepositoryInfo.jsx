// RepositoryInfo.jsx

import React from 'react';

const RepositoryInfo = ({ repo, onClose }) => {
    return (
        <div>
            <h2>Repository Information</h2>
            <p>Name: {repo.name}</p>
            <p>Description: {repo.description}</p>
            <p>Owner: {repo.owner.login}</p>
            <p>URL: <a href={repo.html_url}>{repo.html_url}</a></p>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default RepositoryInfo;
