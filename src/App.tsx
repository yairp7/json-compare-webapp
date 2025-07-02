
import { AppContainer, MainContent } from './App.styled';
import { Header, Footer, JsonCompare } from './Components';

function App() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <JsonCompare />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;
