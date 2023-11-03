// import components
import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import { useAuth } from '../hooks/useAuth.js';

const Header = ({ headerContent }) => {
  const { isLoggedIn, setLogout, userProfile } = useAuth();
  console.log(userProfile);
  return (
    <header className="relative top-0 z-20 p-4 px-4 mb-12 bg-white border-b border-gray-200 lg:mb-0 lg:px-0">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-[120px]">
            <Link to="/">
              <img alt="logo_img" src={Logo} />
            </Link>
            <div className="hidden lg:flex">
              <nav>
                <ul className="flex gap-x-8">
                  {headerContent
                    .filter((element) => {
                      if (!element.withAuth && !element.isAdminPage) {
                        return true;
                      }

                      if (element.isAdminPage) {
                        return (
                          isLoggedIn && userProfile == 'min49590@naver.com'
                        );
                      }
                      return !!userProfile;
                    })
                    .map((element) => {
                      return (
                        <li key={element.id}>
                          <Link
                            className="text-blue-500 hover:text-blue-600"
                            to={element.path}
                          >
                            {element.label}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </nav>
            </div>
          </div>
          {isLoggedIn ? (
            <div className="flex gap-2">
              <div className="px-4 py-2">{userProfile.email}</div>
              <div
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                onClick={setLogout}
              >
                Logout
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                to="/login"
              >
                Login
              </Link>
              <Link className="px-4 py-2 text-blue-500" to="/signup">
                signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
