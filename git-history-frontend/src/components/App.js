import React, { useState } from 'react';
import InputBar from './InputBar';
import Filter from './Filter';
import GitGraph from './GitGraph';
import ThemeSwitcher from './ThemeSwitcher';
import CommitDetails from './CommitDetails';

function App() {
    const [commits, setCommits] = useState([]);
    const [selectedCommit, setSelectedCommit] = useState(null);
    const [theme, setTheme] = useState('light');


    const handleSelectCommit = (commit) => {
        setSelectedCommit(commit);
    };
    
    const fetchCommits = (commitsData) => {
      setCommits(commitsData);  // Store the fetched data in the state
    };
    const filterCommits = (criteria) => {
        // Filter commits based on criteria.
    };

    const toggleTheme = () => {
      // Get the current theme from the document's body
      const currentTheme = document.body.getAttribute('data-theme');
  
      // Toggle between light and dark themes
      if (currentTheme === 'dark') {
          document.body.setAttribute('data-theme', 'light');
      } else {
          document.body.setAttribute('data-theme', 'dark');
      }
  };
  


    return (
      <div className="App">
          <InputBar onFetch={fetchCommits} />
          <Filter onFilter={filterCommits} />
          <div className="container">
              <GitGraph commits={commits} onSelectCommit={setSelectedCommit} />
              <CommitDetails commit={selectedCommit} />
          </div>
          <ThemeSwitcher onToggleTheme={toggleTheme} />
      </div>
  );
}

export default App;
