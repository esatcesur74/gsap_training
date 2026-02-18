import { Menu, X as XIcon } from "lucide-react";

import { useState } from "react";

export default function Navbar() {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
                    <div className="flex items-center space-x-1 group cursor-pointer">
                        <div>
                            <img src="/logo2.svg"
                                alt="ekipdirectory"
                                className="w-8 h-10 sm:w-18 sm:h-8" />
                        </div>
                    </div>
                    {/* Nav Links */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        <a href="#Projects" className="text-gray-300 hover:text-amber-300 underline decoration-2 decoration-red-900">Project</a>
                        <a href="#Order" className="text-gray-300 hover:text-amber-300 underline decoration-2 decoration-red-900">Order</a>
                        <a href="#About" className="text-gray-300 hover:text-amber-300 underline decoration-2 decoration-red-900">About</a>
                    </div>
                    <button className="md:hidden items-center hover:text-red-900"
                        onClick={() => setMobileMenuIsOpen((prev) => !prev)}>
                        {mobileMenuIsOpen ? (<XIcon className="w-5 h-5 sm:w-6 sm:h-6" />) : (
                            <Menu className="w-5 h-5 sm:w-6 sm:h-6" ></Menu>
                        )
                        }

                    </button>
                </div>
            </div>
            {mobileMenuIsOpen && (
                <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-00 animate-in slide-in-from-top duration-300">
                    <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
                        <a href="#Projects" onClick={()=> setMobileMenuIsOpen(false)} className="block text-gray-300 hover:text-amber-300">Project</a>
                        <a href="#Order" onClick={()=> setMobileMenuIsOpen(false)} className="block text-gray-300 hover:text-amber-300">Order</a>
                        <a href="#About" onClick={()=> setMobileMenuIsOpen(false)} className="block text-gray-300 hover:text-amber-300">About</a>
                    </div>
                </div>
            )}

        </nav>
    )
}