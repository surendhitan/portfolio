// src/components/Skills.jsx
import React from 'react';
import '../styles/Components.css';

export default function Skills({ skills = [], profile = {} }) {
  // Filter skills dynamically from DB
  const dbLanguages = skills.filter(s => s.category?.toLowerCase() === 'languages').map(s => s.name);
  const dbCoreStack = skills.filter(s => s.category?.toLowerCase() === 'core_stack' || s.category?.toLowerCase() === 'frontend').map(s => s.name);
  const dbWorkflow = skills.filter(s => s.category?.toLowerCase() === 'workflow' || s.category?.toLowerCase() === 'tools').map(s => s.name);

  // Fallbacks if DB is empty (defaults to Mohammed Sulthan's stack if the profile name indicates so, else Surendhiran's stack)
  const isSulthan = profile?.name?.toUpperCase().includes('SULTHAN');
  
  const defaultLanguages = isSulthan 
    ? ['Python', 'R', 'SQL/MySQL'] 
    : ['JavaScript', 'PHP', 'Python', 'SQL (MySQL)', 'C# / .Net'];
    
  const defaultCoreStack = isSulthan 
    ? ['Streamlit', 'FastAPI', 'HTML5, CSS3', 'Pandas, NumPy'] 
    : ['React Native', 'Node.js', 'Express.js', 'React.js', 'HTML5 & CSS3'];
    
  const defaultWorkflow = isSulthan 
    ? ['Git & GitHub', 'VS Code', 'SDLC Protocols'] 
    : ['Git & GitHub', 'VS Code', 'Cloud Services (AWS/GCP)', 'RESTful APIs', 'SDLC Protocols'];

  const languages = dbLanguages.length > 0 ? dbLanguages : defaultLanguages;
  const coreStack = dbCoreStack.length > 0 ? dbCoreStack : defaultCoreStack;
  const workflow = dbWorkflow.length > 0 ? dbWorkflow : defaultWorkflow;

  // Dynamic Algorithmic Profile Links
  const githubUrl = profile?.github_url || (isSulthan ? 'https://github.com/Sulthanakthar' : 'https://github.com/surendhitan');
  const linkedinUrl = profile?.linkedin_url || (isSulthan ? 'https://linkedin.com/in/sulthanakthar-s-b42693261' : 'https://www.linkedin.com/in/surendhiran645/');
  const leetcodeUrl = isSulthan ? 'https://leetcode.com/Sulthanakthar' : 'https://leetcode.com/';
  const hackerrankUrl = isSulthan ? 'https://www.hackerrank.com/Sulthanakthar' : 'https://www.hackerrank.com/';
  const geeksforgeeksUrl = isSulthan ? 'https://www.geeksforgeeks.org/user/Sulthanakthar' : 'https://www.geeksforgeeks.org/';

  return (
    <section id="skills" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">STACK DETAILS</span>
          <h2 className="section-title">Technical Inventory</h2>
          <p className="section-subtitle">
            A comprehensive compilation of languages, framework stacks, and software engineering processes.
          </p>
        </div>

        {/* 3-Column Stack Grid */}
        <div className="inventory-grid">
          
          {/* Card 1: Languages */}
          <div className="inventory-card">
            <span className="inventory-card-label">LANGUAGES</span>
            <ul className="inventory-list">
              {languages.map(lang => (
                <li key={lang} className="inventory-item">{lang}</li>
              ))}
            </ul>
          </div>

          {/* Card 2: Core Stack */}
          <div className="inventory-card">
            <span className="inventory-card-label">CORE STACK</span>
            <ul className="inventory-list">
              {coreStack.map(stack => (
                <li key={stack} className="inventory-item">{stack}</li>
              ))}
            </ul>
          </div>

          {/* Card 3: Engineering Workflow */}
          <div className="inventory-card">
            <span className="inventory-card-label">ENGINEERING WORKFLOW</span>
            <ul className="inventory-list">
              {workflow.map(flow => (
                <li key={flow} className="inventory-item">{flow}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Algorithmic Profiles */}
        <div className="algorithmic-section">
          <span className="algo-label">ALGORITHMIC PROFILES</span>
          <div className="algo-links">
            <a href={githubUrl} target="_blank" rel="noreferrer" className="algo-link">
              GitHub <span className="arrow">↗</span>
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="algo-link">
              LinkedIn <span className="arrow">↗</span>
            </a>
            <a href={leetcodeUrl} target="_blank" rel="noreferrer" className="algo-link">
              LeetCode <span className="arrow">↗</span>
            </a>
            {isSulthan ? (
              <a href={geeksforgeeksUrl} target="_blank" rel="noreferrer" className="algo-link">
                GeeksforGeeks <span className="arrow">↗</span>
              </a>
            ) : (
              <a href={hackerrankUrl} target="_blank" rel="noreferrer" className="algo-link">
                HackerRank <span className="arrow">↗</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
