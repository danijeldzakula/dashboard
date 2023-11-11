import { VscChromeClose } from 'react-icons/vsc';
import { Navbar } from '../content';
import { NavLink } from 'react-router-dom';

export default function BreadCrumb({ breadCrumb }) {
  if (breadCrumb && breadCrumb.length < 1) {
    return;
  }

  const renderBreadcrumb = breadCrumb.map((item, idx) => {
    return (
      <li key={item._id}>
        <NavLink to={item.url}>{item.label}</NavLink>
      </li>
    );
  });

  return (
    <Navbar className="breadcrumb">
      <ul>{renderBreadcrumb}</ul>
    </Navbar>
  );
}
