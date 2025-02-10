export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();
  
    const { email } = req.body;
  
    try {
      const response = await fetch(`https://api.clerk.com/v1/clients/reset_password_email`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) throw new Error("Failed to send reset email");
  
      res.status(200).json({ message: "Reset email sent! Check your inbox." });
    } catch (error) {
      res.status(500).json({ error: "Could not send reset email." });
    }
  }
  