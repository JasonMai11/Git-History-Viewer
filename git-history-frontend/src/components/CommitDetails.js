import React from 'react';

function CommitDetails({ commit }) {
    if (!commit) return <div>Select a commit to view details.</div>;

    return (
        <div className="commit-details">
            <h3>Commit Details:</h3>
            <p><strong>SHA:</strong> {commit.sha}</p>
            <p><strong>Author:</strong> {commit.commit.author.name}</p>
            <p><strong>Date:</strong> {commit.commit.author.date}</p>
            <p><strong>Message:</strong> {commit.commit.message}</p>
            <p><strong>URL:</strong> <a href={commit.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a></p>
        </div>
    );
}

export default CommitDetails;
