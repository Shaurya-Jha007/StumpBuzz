import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DetailsPage from "./pages/Details";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/details/:matchId" element={<DetailsPage />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
