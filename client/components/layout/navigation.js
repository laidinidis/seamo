import Link from 'next/link';
import Icon from '../icons/icon';

function Navigation() {
  return (
    <nav className="w-80 bg-white border-r border-gray-200">
      <ul>
        <NavLink href="/" name="Grades" icon="home" />
        <NavLink href="/students" name="Students" icon="student" />
        <NavLink
          href="/statsperstudent"
          name="Statistics per student"
          icon="chart"
        />
        <NavLink
          href="/statsperclass"
          name="Statistics per class"
          icon="chart"
        />
        <NavLink
          href="/statsperperiod"
          name="Statistics per period"
          icon="chart"
        />
      </ul>
    </nav>
  );
}

function NavLink({ href, name, icon }) {
  return (
    <li>
      <Link href={href}>
        <a className="block px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-200 flex">
          <Icon width={24} height={24} icon={icon} />
          <span className="ml-2">{name}</span>
        </a>
      </Link>
    </li>
  );
}

export default Navigation;
