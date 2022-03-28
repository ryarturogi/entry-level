import Header from '@/components/partials/Header';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main role="main">{children}</main>
    </>
  );
}
