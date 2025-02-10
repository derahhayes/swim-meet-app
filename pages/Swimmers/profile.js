const SwimmerDetails = ({ swimmer }) => {
    return (
      <div>
        <h1>{swimmer.firstName} {swimmer.lastName}</h1>
        <p>Date of Birth: {new Date(swimmer.dob).toLocaleDateString()}</p>
  
        {swimmer.guardian && (
          <div>
            <h2>Guardian Information</h2>
            <p>Name: {swimmer.guardian.firstName} {swimmer.guardian.lastName}</p>
            <p>Relationship: {swimmer.guardian.relationship}</p>
            <p>Email: {swimmer.guardian.email}</p>
            <p>Phone: {swimmer.guardian.phone}</p>
          </div>
        )}
      </div>
    );
  };
  