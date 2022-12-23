import Header from '@/components/partials/Header';
import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main role="main">{children}</main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
