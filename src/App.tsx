import { Provider } from "react-redux";
import ThemeButton from "./components/general/theme-button";
import store from "./lib/store";
import HomePage from "./pages/home";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
    return (
        <div className="min-h-[100vh] flex flex-col bg-white text-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
            <ThemeProvider>
                <ThemeButton />
                <Provider store={store}>
                    <HomePage />
                </Provider>
            </ThemeProvider>
        </div>
    );
}

export default App;
