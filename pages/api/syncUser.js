import { client } from "../../lib/sanity";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { id, email, firstName, lastName, publicMetadata } = req.body.data;

    const swimIrelandId = publicMetadata?.swimIrelandId;
    const role = publicMetadata?.role;

    if (!swimIrelandId || !role) {
      return res.status(400).json({ error: "Missing Swim Ireland ID or role" });
    }

    const newUser = {
      _id: swimIrelandId, // ✅ Use Swim Ireland ID as primary key
      _type: role, // Creates a swimmer, coach, or parent
      name: `${firstName} ${lastName}`,
      email,
      swimIrelandId,
    };

    await client.createOrReplace(newUser);

    res.status(200).json({ message: "User synced successfully!" });
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
