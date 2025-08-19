import Navbar from '../components/organisms/Navbar/Navbar';

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ minHeight: '80vh', background: '#fafbfc' }}>
      {children}
    </main>
  </>
);

export default MainLayout;