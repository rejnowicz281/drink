import { Provider } from "react-redux";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import ThemeButton from "./components/general/theme-button";
import { Button } from "./components/ui/button";
import store from "./lib/store";
import HistoryPage from "./pages/history";
import HomePage from "./pages/home";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
    return (
        <div className="min-h-[100vh] flex flex-col bg-white text-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
            <ThemeProvider>
                <ThemeButton />
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                element={
                                    <div>
                                        <Button asChild>
                                            <Link to="/">Home</Link>
                                        </Button>
                                        <Button asChild>
                                            <Link to="/history">History</Link>
                                        </Button>
                                        <Outlet />
                                    </div>
                                }
                            >
                                <Route path="/" element={<HomePage />} />
                                <Route path="/history" element={<HistoryPage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </ThemeProvider>
        </div>
    );
}

export default App;
