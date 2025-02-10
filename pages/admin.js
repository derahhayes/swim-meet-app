import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { client } from '@/sanity/fastwave-events/lib/client'; // Sanity client
import { categorizeSwimmer } from '@/sanity/fastwave-events/lib/categorization';
import { useUser } from "@clerk/nextjs"; // Clerk authentication
import { useRouter } from "next/router";


const AdminPanel = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [swimmers, setSwimmers] = useState([]);
  const [meets, setMeets] = useState([]);
  const filteredSwimmers = swimmers.filter(swimmer => 
    categoryFilter === "all" || swimmer.performanceCategory === categoryFilter
    );


  const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
      document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    return (
      <button className="btn btn-secondary" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    );
  };

  useEffect(() => {
    if (session?.user?.role === 'superuser') {
      // Fetch users (coaches, swimmers, guardians)
      client.fetch('*[_type == "swimmer"]{_id, firstName, lastName}').then(setUsers);
    }
  }, [session]);

  const handleRoleChange = async (role) => {
    // Assuming selectedUser has the id and we are changing role
    const updatedUser = await client.patch(selectedUser._id).set({ role }).commit();
    setUsers(users.map(user => (user._id === selectedUser._id ? updatedUser : user)));
  };


const updateSwimmerCategory = async (swimmer) => {
  const newCategory = categorizeSwimmer(swimmer.personalBests);

  await client.patch(swimmer._id)
    .set({ performanceCategory: newCategory })
    .commit();

  return newCategory;
};

const handleUpdateTime = async (swimmerId, newTime, event) => {
  const swimmer = await client.fetch(`*[_id == "${swimmerId}"]{personalBests}[0]`);
  
  const updatedTimes = [...swimmer.personalBests, { event, time: newTime }];

  await client.patch(swimmerId)
    .set({ personalBests: updatedTimes })
    .commit();

  // Update category based on new times
  const updatedCategory = categorizeSwimmer(updatedTimes);
  await client.patch(swimmerId).set({ performanceCategory: updatedCategory }).commit();

  console.log(`Swimmer categorized as ${updatedCategory}`);
};

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    // Fetch the roles associated with the user
    client.fetch(`*[_id == "${user._id}"]{role}`).then((data) => setRoles(data));
  };

   // Redirect to login if not authenticated
   useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in"); // Redirect to sign-in page
    }
  }, [user, isLoaded]);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchData = async () => {
      const swimmersData = await client.fetch('*[_type == "swimmer"]');
      const meetsData = await client.fetch('*[_type == "meet"]');
      setSwimmers(swimmersData);
      setMeets(meetsData);
    };

    fetchData();
  }, []);

  if (!user) return <p>Loading...</p>;

  
  return (

    <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
    <p>Welcome, {user.fullName}</p>
        <>
          <div>
            {/* Navigation */}
            <div className="flex space-x-4 mt-4">
              <button className="btn btn-primary">Manage Swimmers</button>
              <button className="btn btn-secondary">Manage Meets</button>
              <button className="btn btn-accent">Assign Coaches</button>
            </div>
                {/* List of Swimmers */}
                  <div className="mt-6">
                    <h2 className="text-2xl font-semibold">Swimmers</h2>
                    <ul className="list-disc pl-5">
                      {swimmers.map((swimmer) => (
                        <li key={swimmer._id}>{swimmer.firstName} {swimmer.lastName}</li>
                      ))}
                    </ul>
                </div>
                 {/* List of Meets */}
                  <div className="mt-6">
                    <h2 className="text-2xl font-semibold">Swim Meets</h2>
                    <ul className="list-disc pl-5">
                      {meets.map((meet) => (
                        <li key={meet._id}>{meet.location} - {meet.date}</li>
                      ))}
                    </ul>
                  </div>
                  <label>Filter by Category:</label>
                  <select onChange={(e) => setCategoryFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="elite">Elite</option>
                  </select>
                  </div>
          {selectedUser && (
            <div>
              <h2>Edit Roles for {selectedUser.firstName} {selectedUser.lastName}</h2>
              <button onClick={() => handleRoleChange('coach')}>Assign Coach</button>
              <button onClick={() => handleRoleChange('parent')}>Assign Parent</button>
              <button onClick={() => handleRoleChange('swimmer')}>Assign Swimmer</button>
            </div>
          )}
        </>
      )
    </div>
  );
};

export default AdminPanel;
