"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 font-bold text-white text-xs">
                A
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">ApproveKit</span>
            </Link>
            <p className="text-sm text-gray-500">
              Client feedback and approvals without messy email threads.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-sm text-gray-600 hover:text-blue-600">Features</Link></li>
              <li><Link href="#pricing" className="text-sm text-gray-600 hover:text-blue-600">Pricing</Link></li>
              <li><Link href="#faq" className="text-sm text-gray-600 hover:text-blue-600">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Blog</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ApproveKit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
