import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Flame,
  Moon,
  Sun,
  User,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Home,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const { user, openAuth, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile & Stats', icon: User, requiresAuth: true },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#262B40]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo with #0474C4 and #06457F gradient */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#06457F] via-[#0474C4] to-[#5379AE] flex items-center justify-center text-white shadow-md shadow-[#0474C4]/20 group-hover:scale-105 transition-transform">
              <span className="font-mono font-bold text-base tracking-tighter">{"{Q}"}</span>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Algo<span className="text-[#0474C4] dark:text-[#A8C4EC]">Master</span>
              </span>
             
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#A8C4EC]/20 dark:bg-[#0474C4]/20 text-[#0474C4] dark:text-[#A8C4EC] font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0474C4] dark:text-[#A8C4EC]' : 'text-[#5379AE]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Streak Pill */}
            

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100/80 dark:bg-[#2C444C]/60 hover:bg-slate-200 dark:hover:bg-[#2C444C] transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#06457F]" />}
            </button>

            {/* User Profile or Login CTA */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-xl bg-slate-100 dark:bg-[#2C444C]/60 hover:bg-slate-200 dark:hover:bg-[#2C444C] transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                  />
                  <span className="hidden sm:inline-block text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#262B40] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#0474C4] dark:text-[#A8C4EC] font-medium">
                        <span>Lvl {user.level}</span>
                        
                      </div>
                    </div>

                    <button
                      onClick={() => handleNavClick('profile')}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#2C444C]/40 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-[#5379AE]" />
                      <span>View Profile & Badges</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('dashboard')}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#2C444C]/40 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#5379AE]" />
                      <span>Quiz Dashboard</span>
                    </button>

                    <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                    <button
                      onClick={() => { logout(); setUserDropdownOpen(false); }}
                      className="w-full px-4 py-2 text-left text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuth('login')}
                  className="text-xs sm:text-sm font-semibold px-3 py-1.5 text-slate-700 dark:text-slate-200 hover:text-[#0474C4] dark:hover:text-[#A8C4EC] transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuth('signup')}
                  className="text-xs sm:text-sm font-semibold px-3.5 py-1.5 bg-[#0474C4] hover:bg-[#06457F] text-white rounded-xl shadow-sm transition-all hover:shadow"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? 'bg-[#A8C4EC]/20 dark:bg-[#0474C4]/20 text-[#0474C4] dark:text-[#A8C4EC] font-semibold'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
