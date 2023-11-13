import { Fragment, forwardRef } from 'react';
import { clsx } from 'clsx';

function Main({ className, children, ...rest }) {
  return (
    <main className={clsx('main', className)} {...rest}>
      {children}
    </main>
  );
}

function Div({ className, children, ...rest }) {
  return (
    <div className={clsx(className)} {...rest}>
      {children}
    </div>
  );
}

function Button({ className, children, ...rest }) {
  return (
    <button className={clsx('btn', className)} {...rest}>
      {children}
    </button>
  );
}

function Container({ className, children, ...rest }) {
  return (
    <div className={clsx('container', className)} {...rest}>
      {children}
    </div>
  );
}

function ContainerFluid({ className, children, ...rest }) {
  return (
    <div className={clsx('container-fluid', className)} {...rest}>
      {children}
    </div>
  );
}

function Sidebar({ className, children, ...rest }) {
  return (
    <aside className={clsx('sidebar', className)} {...rest}>
      {children}
    </aside>
  );
}

function Article({ children, className, ...rest }) {
  return (
    <article className={clsx('article', className)} {...rest}>
      {children}
    </article>
  );
}

function Overlay({ className, onClick, ...rest }) {
  return <div onClick={() => onClick(false)} className={clsx('overlay', className)} {...rest} />;
}

function Modal({ className, children, ...rest }) {
  return (
    <div className={clsx('modal', className)} {...rest}>
      {children}
    </div>
  );
}

function Drawer({ className, onClick, children, ...rest }) {
  if (!rest.position) {
    delete rest.position;

    return (
      <Fragment>
        <aside className={clsx('drawer drawer--left', className)} {...rest}>
          {children}
        </aside>
        <Overlay onClick={onClick} {...rest} />
      </Fragment>
    );
  }

  const classNamePosition = 'drawer--' + rest.position;
  delete rest.position;

  return (
    <Fragment>
      <aside className={clsx('drawer', classNamePosition, className)} {...rest}>
        {children}
      </aside>
      <Overlay onClick={onClick} {...rest} />
    </Fragment>
  );
}

const Navbar = forwardRef(({ className, children, ...rest }, ref) => {
  return (
    <nav ref={ref} className={clsx('navbar', className)} {...rest}>
      {children}
    </nav>
  );
});

function Header({ className, children, ...rest }) {
  return (
    <header className={clsx('header', className)} {...rest}>
      {children}
    </header>
  );
}

function Footer({ className, children, ...rest }) {
  return (
    <footer className={clsx('footer', className)} {...rest}>
      {children}
    </footer>
  );
}

function Figure({ className, children, ...rest }) {
  return (
    <figure className={clsx('figure', className)} {...rest}>
      {children}
    </figure>
  );
}

function Section({ className, children, ...rest }) {
  return (
    <section className={clsx('section', className)} {...rest}>
      {children}
    </section>
  );
}

function Image({ className, ...rest }) {
  return <img className={clsx('img', className)} {...rest} />;
}

function Wrapper({ className, children, ...rest }) {
  return (
    <div className={clsx('wrapper', className)} {...rest}>
      {children}
    </div>
  );
}
function Grid({ className, children, ...rest }) {
  return (
    <div className={clsx('grid', className)} {...rest}>
      {children}
    </div>
  );
}

function Row({ className, children, ...rest }) {
  return (
    <div className={clsx('row', className)} {...rest}>
      {children}
    </div>
  );
}

function Col({ className, children, ...rest }) {
  return (
    <div className={clsx('col', className)} {...rest}>
      {children}
    </div>
  );
}

const Ref = forwardRef(({ className, children, ...rest }, ref) => {
  return (
    <div ref={ref} className={clsx('ref', className)} {...rest}>
      {children}
    </div>
  );
});

export { Main, Div, Button, Container, ContainerFluid, Sidebar, Article, Modal, Drawer, Navbar, Header, Footer, Figure, Section, Image, Wrapper, Grid, Row, Col, Ref };
