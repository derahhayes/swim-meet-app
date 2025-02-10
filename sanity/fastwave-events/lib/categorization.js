export const categorizeSwimmer = (personalBests) => {
    if (!personalBests || personalBests.length === 0) return "beginner";
  
    let bestTime = Math.min(...personalBests.map((event) => event.time));
  
    if (bestTime > 60) return "beginner"; // Slower than 60s for any event
    if (bestTime <= 60 && bestTime > 40) return "intermediate"; // Between 40s and 60s
    if (bestTime <= 40 && bestTime > 30) return "advanced"; // Between 30s and 40s
    if (bestTime <= 30) return "elite"; // Faster than 30s
  
    return "beginner";
  };

