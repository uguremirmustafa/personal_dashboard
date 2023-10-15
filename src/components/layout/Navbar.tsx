import { NAVBAR_ITEMS } from './constants';
import ActiveLink from '../active-link/ActiveLink';
import { useAuth } from '@/context/AuthContext';

function Navbar(): JSX.Element {
  const auth = useAuth();
  return (
    <div className="p-4">
      <div className="bg-neutral-900 shadow rounded p-4">
        <nav className="flex justify-between">
          <ul className="flex gap-3">
            {NAVBAR_ITEMS.map((item) => {
              return (
                <li key={item.path}>
                  <ActiveLink activeClassName="active" className="link" href={item.path}>
                    {item.name}
                  </ActiveLink>
                </li>
              );
            })}
          </ul>
          <ul className="flex gap-3">
            <li>{auth.user?.email ?? ''}</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
