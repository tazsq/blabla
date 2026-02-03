const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Top carpool routes</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-[#00AFF5]">
                  London → Manchester
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00AFF5]">
                  Paris → Brussels
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00AFF5]">
                  Madrid → Barcelona
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00AFF5]">
                  Berlin → Munich
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-[#00AFF5]">
                  How it works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00AFF5]">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00AFF5]">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00AFF5]">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-[#00AFF5]">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00AFF5]">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00AFF5]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#00AFF5]">
                  Cookie settings
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Language</h4>
            <select className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#00AFF5]">
              <option>English (UK)</option>
              <option>Français</option>
              <option>Español</option>
              <option>Deutsch</option>
            </select>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-8">
          © {new Date().getFullYear()} BlaBlaClone. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
