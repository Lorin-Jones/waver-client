import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Waver } from "./Waver"

const container = document.getElementById("root")
const root = createRoot(container)
const client = new QueryClient()
root.render(
    <BrowserRouter>
        <QueryClientProvider client={client}>
            <Waver />
        </QueryClientProvider>
    </BrowserRouter>
)
