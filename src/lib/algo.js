export function calculateNetLikes(restaurant) {
  return (restaurant.likes + restaurant.double_likes) - restaurant.dislikes;
}

export function formatWaitTime(minutes) {
  if (minutes === 0) return "No Wait";
  return `${minutes} min wait`;
}
