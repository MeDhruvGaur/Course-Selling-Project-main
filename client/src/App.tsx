import { RouterProvider } from "react-router-dom";
import { MyRouter } from "./routes/router";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={MyRouter()}/>
      </QueryClientProvider>
    </div>
  )
}

export default App

