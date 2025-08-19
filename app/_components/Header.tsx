"use client";

import React from 'react';
import Link from "next/link";



const Header: React.FC = () =>  {

  return (
    <nav className="bg-black/80">
      <ul className="h-16 flex justify-between items-center w-full px-4">
        <li className="text-white"><Link href="/">Blog</Link></li>
        <li className="text-white"><Link href="/contact">お問い合わせ</Link></li>
      </ul>
      </nav>
  );
}

export default Header;
