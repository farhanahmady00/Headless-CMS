import React from "react";
import Link from 'next/link';
export default function Home() {
  return (
    <div>
      <ul>
        <li><Link style={{ color: "blue" }} href="/fetch">Fetch</Link></li>
      </ul>
      <h2><b>Home</b></h2>
      <p><b>Welcome to the home page.</b></p>
    </div>
  )
}