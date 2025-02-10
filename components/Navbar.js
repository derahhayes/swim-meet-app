import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="flex justify-between p-4 bg-primary text-white">
      <Link href="/">Home</Link>
      {user && <Link href="/admin">Admin Panel</Link>}
    </nav>
  );
};

export default Navbar;