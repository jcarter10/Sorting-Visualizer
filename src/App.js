import Dashboard from './components/Dashboard'
import { Navbar, Container } from 'react-bootstrap';
import './styles/main.scss'

function App() {
    return (
        <div className="App">
            {/* header */}
            <Navbar bg="dark" variant="dark">
                <Container>
                  <Navbar.Brand><b>Data Visualizer:</b> Sorting Methods</Navbar.Brand>
                </Container>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text style={{marginRight: '25px'}}>
                        By: Jordan C.
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

            {/* data visualizer dashboard */}
            <Dashboard />
        </div>
  );
}

export default App;
