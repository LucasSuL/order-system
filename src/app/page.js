import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto">
    <h1 className="text-3xl font-bold">Welcome!</h1>
    <nav>
      <ul>
        <li>
          <Link href="/menu">
            Menu
          </Link>
        </li>
        <li>
          <Link href="/kitchen">
            Kitchen
          </Link>
        </li>
      </ul>
    </nav>
  </div>
  );
}
