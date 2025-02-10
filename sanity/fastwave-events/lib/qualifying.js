import client from '../lib/sanity';

// Query for swimmer's best time in a specific event
const getBestTimeForEvent = async (swimmerId, eventId) => {
  const query = `
    *[_type == "meetResult" && swimmer._ref == $swimmerId && event._ref == $eventId] | order(time asc)[0] {
      time
    }
  `;

  const result = await client.fetch(query, { swimmerId, eventId });
  return result ? result.time : null;
};

// Check if swimmer qualifies for an event
const checkQualifyingTime = async (swimmerId, eventId, qualifyingTime) => {
  const bestTime = await getBestTimeForEvent(swimmerId, eventId);
  return bestTime && bestTime <= qualifyingTime;
};


const assignSwimmerToEvent = async (swimmerId, eventId, coachId) => {
    const newAssignment = {
      _type: 'eventAssignment',
      swimmer: { _ref: swimmerId },
      event: { _ref: eventId },
      assignedBy: { _ref: coachId },
      status: 'Assigned', // Or any initial status
    };
  
    await client.create(newAssignment);
  };