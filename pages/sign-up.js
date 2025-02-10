import { SignUp } from '@clerk/nextjs';
import { useState } from 'react';
import { useClerk } from '@clerk/nextjs';

const SignUpPage = () => {
  const [swimIrelandId, setSwimIrelandId] = useState('');
  const { user } = useClerk(); // Get current user after sign-up

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (swimIrelandId && user) {
      try {
        // Create a new sign-up with the Swim Ireland ID
        await user.update({
          swimIrelandId: swimIrelandId, // Add the custom field
        });

        console.log('User signed up with Swim Ireland ID:', swimIrelandId);
      } catch (error) {
        console.error('Error during sign-up:', error);
      }
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="swimIrelandId">Swim Ireland ID</label>
        <input
          type="text"
          id="swimIrelandId"
          value={swimIrelandId}
          onChange={(e) => setSwimIrelandId(e.target.value)}
          placeholder="Enter your Swim Ireland ID"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
