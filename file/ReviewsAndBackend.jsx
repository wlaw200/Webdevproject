// ReviewsAndBackend.jsx
import React, { useState } from 'react';

// Simulated DB Initial State
const initialReviews = [
  { id: 1, artistId: 'a1', venueId: 'v1', rating: 5, comment: "Incredible energy, filled the room!", reviewer: "The Tavern Pub", timestamp: "2026-06-01" },
  { id: 2, artistId: 'a2', venueId: 'v2', rating: 4, comment: "Great smooth jazz set. Arrived exactly on time.", reviewer: "Skyline Lounge", timestamp: "2026-06-08" }
];

const initialPlatformLogs = [
  { id: 'log_1', action: 'PAYMENT_PROCESSED', details: 'Ksh 45,000 disbursed to Artist 1', timestamp: '2026-06-12 10:14' },
  { id: 'log_2', action: 'NEW_USER_REGISTRATION', details: 'Venue "The Alchemist" registered', timestamp: '2026-06-12 14:22' }
];


export const useBackendEngine = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [logs, setLogs] = useState(initialPlatformLogs);

  // Calculate aggregate ratings dynamically for Person 1 (Cards) & Person 2 (Dashboards)
  const getAverageRating = (targetId, type = 'artist') => {
    const filtered = reviews.filter(r => type === 'artist' ? r.artistId === targetId : r.venueId === targetId);
    if (filtered.length === 0) return 0;
    const sum = filtered.reduce((acc, curr) => acc + curr.rating, 0);
    return parseFloat((sum / filtered.length).toFixed(1));
  };

  // Submit Review Functionality (Used by Person 2 upon booking completion)
  const submitReview = (artistId, venueId, rating, comment, reviewer) => {
    const newReview = {
      id: reviews.length + 1,
      artistId,
      venueId,
      rating: Number(rating),
      comment,
      reviewer,
      timestamp: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
    logAction('REVIEW_SUBMITTED', `Review added for Artist ${artistId} by ${reviewer}`);
  };

  const logAction = (action, details) => {
    const newLog = {
      id: `log_${Date.now()}`,
      action,
      details,
      timestamp: new Date().toLocaleString()
    };
    setLogs(prev => [newLog, ...prev]);
  };

  return { reviews, logs, getAverageRating, submitReview, logAction };
};
