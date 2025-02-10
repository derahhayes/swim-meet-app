import { useEffect, useState } from 'react';
import { checkQualifyingTime } from '../lib/qualifying';

const SwimmerDetails = ({ swimmer, event, qualifyingTime }) => {
  const [isQualified, setIsQualified] = useState(null);

  useEffect(() => {
    const checkQualification = async () => {
      const qualifies = await checkQualifyingTime(swimmer._id, event._id, qualifyingTime);
      setIsQualified(qualifies);
    };

    checkQualification();
  }, [swimmer, event, qualifyingTime]);

  return (
    <div>
      <h1>{swimmer.firstName} {swimmer.lastName}</h1>
      <p>Date of Birth: {new Date(swimmer.dob).toLocaleDateString()}</p>
      <h2>Qualification Status for {event.name}:</h2>
      {isQualified === null ? (
        <p>Loading qualification status...</p>
      ) : isQualified ? (
        <p>Qualified!</p>
      ) : (
        <p>Not Qualified</p>
      )}
    </div>
  );
};

export default SwimmerDetails;