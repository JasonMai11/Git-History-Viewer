import React, { useState } from 'react';

function InputBar({ onFetch }) {
    const [url, setUrl] = useState('');

    const handleSubmit = () => {
        fetch(`http://localhost:3001/commits?repo=${url}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    onFetch(data);  // Send the fetched data back to the parent component
                }
            })
            .catch(err => {
                alert('Failed to fetch data. Please try again.');
            });
    };
    

    return (
        <div>
            <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="Enter GitHub repo URL..."
            />
            <button onClick={handleSubmit}>Fetch Commits</button>
        </div>
    );
}

export default InputBar;
