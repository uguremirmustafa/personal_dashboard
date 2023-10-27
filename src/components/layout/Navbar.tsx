import { NAVBAR_ITEMS } from './constants';
import ActiveLink from '../active-link/ActiveLink';
import { useAuth } from '@/context/AuthContext';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { PiHamburger } from 'react-icons/pi';

function Navbar(): JSX.Element {
  const auth = useAuth();
  return (
    <nav className="p-4 pb-0 navbar items-center gap-4">
      <div className="navbar-start">
        <div className="md:hidden dropdown rounded-box h-14 items-center bg-base-200">
          <label tabIndex={0} className="btn btn-ghost rounded-btn mt-1 text-xl">
            <PiHamburger />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box w-52 mt-2"
          >
            {NAVBAR_ITEMS.map((item) => {
              return (
                <li key={item.path}>
                  <ActiveLink activeClassName="active" href={item.path}>
                    {item.icon({})}
                    {item.name}
                  </ActiveLink>
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="hidden md:flex menu items-center menu-horizontal h-14 rounded-box shadow bg-base-200 gap-3 px-3">
          {NAVBAR_ITEMS.map((item) => {
            return (
              <li key={item.path}>
                <ActiveLink activeClassName="active" href={item.path}>
                  {item.icon({})}
                  {item.name}
                </ActiveLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bg-base-200 rounded-box shadow h-14 hidden xl:flex navbar-center items-center justify-between px-4 py-3 w-full max-w-[300px] md:max-w-lg xl:max-w-xl">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <MdOutlineSpaceDashboard /> my dashboard
        </h1>
        <div className="join">
          <input
            type="text"
            className="input input-bordered border-base-300 h-9 join-item"
            placeholder="Search..."
          />
          <button className="join-item bg-base-100 flex items-center px-3 border border-base-300 ">
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="navbar-end">
        <ul className="flex items-center gap-3 bg-base-200 rounded-box shadow h-14 px-4 py-3">
          <li className="hidden md:inline-block">{auth.user?.email}</li>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="cursor-pointer avatar placeholder">
              <div className="bg-base-100 text-primary-content rounded-xl w-8">
                <span className="text-xl">{(auth.user?.email ?? 'X').toUpperCase()[0]}</span>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 z-[1] p-3 gap-2 shadow bg-base-200 rounded-box"
            >
              <li>
                <a className="justify-between">
                  {`Profile (${auth.user?.email ?? ''})`}
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a onClick={() => auth.logout()}>Logout</a>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
