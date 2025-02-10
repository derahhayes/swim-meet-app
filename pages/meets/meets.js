import { client } from "@/sanity/fastwave-events/lib/client";

export async function getStaticProps() {
  const swimMeetsQuery = `
    *[_type == "swimMeet"]{
      title,
      location,
      date,
      time,
      level,
      ageUpDate,
      events[]->{
        name,
        distance,
        stroke,
        ageGroup,
        gender
      }
    }
  `;
  
  const swimMeets = await client.fetch(swimMeetsQuery);

  return {
    props: {
      swimMeets,
    },
  };
}

const SwimMeetsPage = ({ swimMeets }) => {
  return (
    <div>
      <h1>Upcoming Swim Meets</h1>
      {swimMeets.map((meet) => (
        <div key={meet._id}>
          <h2>{meet.title}</h2>
          <p>{meet.location}</p>
          <p>{new Date(meet.date).toLocaleDateString()}</p>
          <p>{meet.level}</p>
          <p>Age Up Date: {new Date(meet.ageUpDate).toLocaleDateString()}</p>
          <h3>Events:</h3>
          <ul>
            {meet.events.map((event) => (
              <li key={event._id}>
                {event.name} - {event.distance} meters, {event.stroke}, {event.ageGroup} {event.gender}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SwimMeetsPage;
