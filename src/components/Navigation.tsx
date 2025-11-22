import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LoginModal } from './modals/LoginModal';
import { RegisterModal } from './modals/RegisterModal';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const { user, isAuthenticated, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserDropdown) {
        const target = event.target as HTMLElement;
        if (!target.closest('.user-dropdown')) {
          setShowUserDropdown(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserDropdown]);

  const navItems = [
    { name: 'Product', href: '#product' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Company', href: '#company' },
  ];

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setIsMobileMenuOpen(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setShowUserDropdown(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <div className="absolute inset-0 w-8 h-8 bg-purple-600 rounded-full blur-sm opacity-30 animate-pulse"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Lindy
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoading ? (
              <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
            ) : isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                >
                  <User size={20} />
                  <span>{user?.name}</span>
                  <ChevronDown size={16} className={`transform transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200/50 space-y-3">
                {isLoading ? (
                  <div className="w-full h-8 bg-gray-200 animate-pulse rounded"></div>
                ) : isAuthenticated ? (
                  <>
                    <div className="px-2 py-2 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleLoginClick}
                      className="block w-full text-left text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handleRegisterClick}
                      className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-full font-medium text-center"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;