import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import BusContainer from './busContainer'

const queryClient = new QueryClient()

function App() {

return(
    <QueryClientProvider client={queryClient}>
        <div className="font-poppins">
            <BusContainer />
        </div>
    </QueryClientProvider>
    )
}

export default App
