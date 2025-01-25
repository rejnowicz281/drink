import { Provider } from "react-redux";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layouts/main-layout";
import store from "./lib/store";
import HistoryPage from "./pages/history";
import HomePage from "./pages/home";
import { SettingsPage } from "./pages/settings";
import { ThemeProvider } from "./providers/theme-provider";

function App() {
    return (
        <div className="min-h-[100vh] flex flex-col bg-white text-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
            <ThemeProvider>
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                element={
                                    <MainLayout>
                                        <Outlet />
                                    </MainLayout>
                                }
                            >
                                <Route path="/" element={<HomePage />} />
                                <Route path="/history" element={<HistoryPage />} />
                                <Route path="/settings" element={<SettingsPage />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </ThemeProvider>
        </div>
    );
}

export default App;
