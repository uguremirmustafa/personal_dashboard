import { NAVBAR_ITEMS } from './constants';
import ActiveLink from '../active-link/ActiveLink';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineSpaceDashboard } from 'react-icons/md';

function Navbar(): JSX.Element {
  const auth = useAuth();
  return (
    <nav className="p-4 pb-0 flex items-center justify-between gap-4">
      <ul className="menu bg-base-200 gap-3 px-3 items-center menu-horizontal rounded-box shadow h-14">
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
      <div className="bg-base-200 rounded-box shadow h-14 flex items-center justify-between px-4 py-3 w-full max-w-[300px] md:max-w-lg xl:max-w-xl">
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
      <ul className="flex items-center gap-3 bg-base-200 rounded-box shadow h-14 px-4 py-3">
        <li>{auth.user?.email}</li>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="cursor-pointer avatar placeholder">
            <div className="bg-base-100 text-primary-content rounded-xl w-8">
              <span className="text-xl">{(auth.user?.email ?? 'X').toUpperCase()[0]}</span>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 gap-2 shadow bg-base-200 rounded-box"
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
    </nav>
  );
}

export default Navbar;
