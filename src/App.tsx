import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import BusWrapper from './busWrapper'
import BusContainer from './busContainer'

import {Line} from './types/busState'

/*const example:Line = {
    value: '100',
    label: '100',
    stops: [
        {
            id: '1',
            commonName: 'golders place'
        },
        {
            id: '2',
            commonName: 'pynchbek'
        }
    ]
}*/

const queryClient = new QueryClient()

function App() {

return(
    <QueryClientProvider client={queryClient}>
        <div className="font-poppins">
            {/*<BusWrapper/>*/}
            <BusContainer />
        </div>
    </QueryClientProvider>
    )
}

export default App
