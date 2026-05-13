import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>ApplyFlow</h1>
      <p>LIA application tracker</p>

      <ul>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link href="/companies">Companies</Link>
        </li>
      </ul>
    </main>
  );
}
