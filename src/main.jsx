import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes} from "react-router-dom";
import { Provider } from "react-redux";
import App from './App';
import store from './store/store'
import './styles/main.css';

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)