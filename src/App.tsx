import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import BusWrapper from './busWrapper'
import BusContainer from './busContainer'

const queryClient = new QueryClient()

function App() {

return(
    <QueryClientProvider client={queryClient}>
        <div className="font-poppins">
            <BusWrapper/>
            {/*<BusContainer />*/}
        </div>
    </QueryClientProvider>
    )
}

export default App
