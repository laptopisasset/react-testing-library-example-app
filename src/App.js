import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";

import { OrderDetailsProvider } from "./contexts/OrderDeatails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry paeg need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {
        {
          /* confirmation page does not need provider */
        }
      }
    </Container>
  );
}

export default App;
