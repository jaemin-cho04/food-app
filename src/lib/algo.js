// src/lib/algo.js
export function calculateNetLikes(restaurant) {
  // Formula: (Likes + Double Likes) - Dislikes
  return (restaurant.likes + restaurant.double_likes) - restaurant.dislikes;
}

export function formatWaitTime(minutes) {
  if (minutes === 0) return "No Wait";
  return `${minutes} min wait`;
}