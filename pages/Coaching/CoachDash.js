import { useEffect, useState } from 'react';
import { client } from '@/sanity/fastwave-events/lib/client';


const CoachDashboard = ({ coachId }) => {
  const [swimmers, setSwimmers] = useState([]);

  useEffect(() => {
    const fetchSwimmers = async () => {
      const query = `
        *[_type == "swimmer" && coach._ref == $coachId] {
          firstName,
          lastName,
          results[]->{
            time,
            event->{
              name
            }
          }
        }
      `;
      const result = await client.fetch(query, { coachId });
      setSwimmers(result);
    };

    fetchSwimmers();
  }, [coachId]);

  return (
    <div>
      <h1>Coach Dashboard</h1>
      {swimmers.map((swimmer) => (
        <div key={swimmer._id}>
          <h2>{swimmer.firstName} {swimmer.lastName}</h2>
          <h3>Results:</h3>
          <ul>
            {swimmer.results.map((result) => (
              <li key={result._id}>
                {result.event.name}: {result.time}s
              </li>
            ))}
          </ul>
          {/* Add functionality to assign the swimmer to an event */}
        </div>
      ))}
    </div>
  );
};

export default CoachDashboard;
