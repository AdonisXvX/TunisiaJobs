  import React, { useState } from 'react';

  const Jobs = ({ userData, hasPaidPlan, hasUploadedResume }) => {
    const [jobPreferences, setJobPreferences] = useState({
      position: '',
      location: '',
      country: 'Tunisia',
      distance: '25'
    });
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showValidationError, setShowValidationError] = useState(false);

    const distanceOptions = ['10', '25', '50', '100', '200'];
    const countryOptions = ['Tunisia', 'Algeria', 'Morocco', 'Libya', 'Egypt'];

    const handleInputChange = (e) => {
      setJobPreferences({
        ...jobPreferences,
        [e.target.name]: e.target.value
      });
      setShowValidationError(false);
    };

    const validateBeforeSearch = () => {
      // Check if user has paid for a plan
      if (!hasPaidPlan) {
        alert('⚠️ You need to subscribe to a plan before searching for jobs. Please visit the Pricing page.');
        return false;
      }

      // Check if user has uploaded resume
      if (!hasUploadedResume) {
        alert('⚠️ You need to upload your resume before searching for jobs. Please go to Resumes section.');
        return false;
      }

      // Check if required fields are filled
      if (!jobPreferences.position || !jobPreferences.location) {
        setShowValidationError(true);
        return false;
      }

      return true;
    };

    const handleSearch = async (e) => {
      e.preventDefault();
      
      // Validate before searching
      if (!validateBeforeSearch()) {
        return;
      }

      setIsLoading(true);
      setHasSearched(true);

      // Simulate API call to fetch jobs from database
      // Replace this with your actual API endpoint
      try {
        // Example: const response = await fetch('/api/jobs/search', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(jobPreferences)
        // });
        // const data = await response.json();

        // Simulated API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock data - replace with actual API response
        const mockResults = [
          {
            id: 1,
            title: `${jobPreferences.position} Developer`,
            company: 'Tech Solutions Tunisia',
            description: `Looking for a talented ${jobPreferences.position} professional to join our team in ${jobPreferences.location}. We offer competitive salary, remote work options, and great benefits.`,
            location: jobPreferences.location,
            country: jobPreferences.country,
            distance: '15 km',
            type: 'Full-time',
            salary: '2000-3000 TND',
            postedDate: '2 days ago',
            logo: 'T',
            logoColor: '#4f46e5',
            requirements: ['3+ years experience', 'Bachelor degree', 'Team player']
          },
          {
            id: 2,
            title: `Senior ${jobPreferences.position}`,
            company: 'Innovation Hub',
            description: `We are seeking an experienced ${jobPreferences.position} specialist. Great opportunity for career growth in ${jobPreferences.location}.`,
            location: jobPreferences.location,
            country: jobPreferences.country,
            distance: '8 km',
            type: 'Full-time',
            salary: '3500-4500 TND',
            postedDate: '1 week ago',
            logo: 'I',
            logoColor: '#10b981',
            requirements: ['5+ years experience', 'Master degree preferred', 'Leadership skills']
          },
          {
            id: 3,
            title: `${jobPreferences.position} Consultant`,
            company: 'Global Services',
            description: `Join our dynamic team as a ${jobPreferences.position} consultant. Work on exciting projects across ${jobPreferences.country}.`,
            location: jobPreferences.location,
            country: jobPreferences.country,
            distance: '20 km',
            type: 'Contract',
            salary: '4000-5000 TND',
            postedDate: '3 days ago',
            logo: 'G',
            logoColor: '#f59e0b',
            requirements: ['Consulting experience', 'Excellent communication', 'Flexible']
          }
        ];

        setSearchResults(mockResults);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        alert('Failed to fetch jobs. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    const handleApplyJob = (jobId) => {
      // Handle job application
      alert(`Applying for job ID: ${jobId}. This will redirect to application form.`);
    };

    return (
      <div className="jobs-container">
        <div className="jobs-header">
          <h2 className="jobs-title">Find Your Perfect Job</h2>
          <p className="jobs-subtitle">
            Search for jobs that match your skills and preferences in {jobPreferences.country}
          </p>
        </div>

        {/* Validation Status */}
        <div className="validation-status">
          <div className={`status-item ${hasPaidPlan ? 'status-success' : 'status-error'}`}>
            <span className="status-icon">{hasPaidPlan ? '✓' : '✗'}</span>
            <span>Subscription Active</span>
          </div>
          <div className={`status-item ${hasUploadedResume ? 'status-success' : 'status-error'}`}>
            <span className="status-icon">{hasUploadedResume ? '✓' : '✗'}</span>
            <span>Resume Uploaded</span>
          </div>
        </div>

        {/* Job Search Form */}
        <div className="job-search-card">
          <h3 className="search-card-title">Job Preferences</h3>
          
          <div className="job-search-form">
            <div className="form-row">
              <div className="form-field">
                <label className="job-label">
                  Desired Job Position *
                </label>
                <input
                  type="text"
                  name="position"
                  value={jobPreferences.position}
                  onChange={handleInputChange}
                  className={`job-input ${showValidationError && !jobPreferences.position ? 'input-error' : ''}`}
                  placeholder="e.g., Software Engineer, Designer, Marketing Manager"
                />
                {showValidationError && !jobPreferences.position && (
                  <span className="error-text">This field is required</span>
                )}
              </div>

              <div className="form-field">
                <label className="job-label">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={jobPreferences.location}
                  onChange={handleInputChange}
                  className={`job-input ${showValidationError && !jobPreferences.location ? 'input-error' : ''}`}
                  placeholder="e.g., Tunis, Sfax, Sousse"
                />
                {showValidationError && !jobPreferences.location && (
                  <span className="error-text">This field is required</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="job-label">
                  Country
                </label>
                <select
                  name="country"
                  value={jobPreferences.country}
                  onChange={handleInputChange}
                  className="job-select"
                >
                  {countryOptions.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="job-label">
                  Search Radius
                </label>
                <select
                  name="distance"
                  value={jobPreferences.distance}
                  onChange={handleInputChange}
                  className="job-select"
                >
                  {distanceOptions.map((dist) => (
                    <option key={dist} value={dist}>{dist} km</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              onClick={handleSearch}
              className="search-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Searching...
                </>
              ) : (
                <>
                  🔍 Search Jobs
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="search-results">
            <div className="results-header">
              <h3 className="results-title">
                {searchResults.length} Jobs Found
              </h3>
              <p className="results-subtitle">
                Showing results for "{jobPreferences.position}" in {jobPreferences.location}
              </p>
            </div>

            {isLoading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Finding the best jobs for you...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="job-results-grid">
                {searchResults.map((job) => (
                  <div key={job.id} className="job-result-card">
                    <div className="job-card-header">
                      <div 
                        className="job-logo" 
                        style={{ backgroundColor: job.logoColor }}
                      >
                        {job.logo}
                      </div>
                      <div className="job-header-info">
                        <h4 className="job-result-title">{job.title}</h4>
                        <p className="job-result-company">{job.company}</p>
                      </div>
                      <button className="job-save-btn" title="Save job">
                        ☆
                      </button>
                    </div>

                    <p className="job-result-description">{job.description}</p>

                    <div className="job-requirements">
                      <strong>Requirements:</strong>
                      <ul>
                        {job.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="job-result-meta">
                      <span className="meta-badge">📍 {job.location}</span>
                      <span className="meta-badge">🌍 {job.country}</span>
                      <span className="meta-badge">📏 {job.distance}</span>
                      <span className="meta-badge">💼 {job.type}</span>
                      <span className="meta-badge salary-badge">💰 {job.salary}</span>
                    </div>

                    <div className="job-card-footer">
                      <span className="job-posted-date">Posted {job.postedDate}</span>
                      <button 
                        onClick={() => handleApplyJob(job.id)}
                        className="apply-job-btn"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No jobs found</h3>
                <p>Try adjusting your search criteria or expanding your search radius.</p>
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="search-prompt">
            <div className="prompt-icon">💼</div>
            <h3>Ready to find your dream job?</h3>
            <p>Fill in your preferences above and click "Search Jobs" to get started!</p>
          </div>
        )}
      </div>
    );
  };

  export default Jobs;