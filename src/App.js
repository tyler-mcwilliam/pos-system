import "./App.css";
import * as React from "react";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PosTable from "./components/PosTable";
import TotalsTable from "./components/TotalsTable";
import Grid from "@mui/material/Unstable_Grid2";
import ProductButton from "./components/productButton";
import BrandFamilyButton from "./components/BrandFamilyButton";

function App() {
  let [state, setState] = React.useState({
    selectedProducts: [],
    loyaltyId: {
      id: "",
      name: "",
      isValid: false,
    },
    products: [],
    selectedBrandFamily: "",
  });
  function handleState(productName) {
    setState({
      selectedProducts: [{ id: 1, name: productName, price: 10 }],
      loyaltyId: {
        id: "testid",
        name: "testName",
        isValid: false,
      },
    });
  }
  React.useEffect(() => {
    fetch("structures/price_promotions_response.json")
      .then((response) => response.json())
      .then((jsonResponse) =>
        setState({ products: jsonResponse[0]["Products"] }),
      );
  });

  // outputs a javascript object from the parsed json
  // const nock = require("nock");

  // const scope = nock("https://api.github.com")
  //   .get("/repos/atom/atom/license")
  //   .reply(200, {
  //     license: {
  //       key: "mit",
  //       name: "MIT License",
  //       spdx_id: "MIT",
  //       url: "https://api.github.com/licenses/mit",
  //       node_id: "MDc6TGljZW5zZTEz",
  //     },
  //   });

  // fetch("https://api.github.com/repos/atom/atom");

  return (
    <div className="App">
      <Container
        fixed
        id="left screen"
        sx={{
          bgcolor: "var(--color-dark)",
          height: "100vh",
          width: "50%",
          float: "left",
        }}
      >
        <Container
          fixed
          id="basket"
          sx={{
            bgcolor: "var(--color-primary)",
            height: "70%",
            width: "100%",
            float: "left",
            padding: "10px",
          }}
        >
          <PosTable
            sx={{
              height: "100vh",
              width: "100%",
              float: "left",
            }}
          />
        </Container>
        <Container
          fixed
          id="totalsContainer"
          sx={{
            bgcolor: "(var(--color-primary)",
            height: "20%",
            width: "100%",
            float: "left",
            padding: "25px",
          }}
        >
          <TotalsTable />
        </Container>
        <Container
          fixed
          id="Actions"
          sx={{
            bgcolor: "var(--color-primary)",
            height: "10%",
            width: "100%",
            float: "left",
          }}
        >
          <Grid
            container
            id="actionButtons"
            spacing={2}
            sx={{ padding: "22px" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgColor="blue"
          >
            <Grid>
              <Button variant="contained">Loyalty ID</Button>
            </Grid>
            <Grid>
              <Button variant="contained">Pay</Button>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <Container
        fixed
        id="right screen"
        sx={{
          bgcolor: "whitesmoke",
          height: "100vh",
          width: "50%",
          float: "right",
          overflowY: "scroll",
        }}
      >
        <Grid
          container
          spacing={3}
          alignItems="center"
          sx={{
            padding: "20px",
            minHeight: "80%",
          }}
        >
          {() => {
            if (state.selectedBrandFamily === "") {
              //use distinct
              // render all the brand buttons
              state.products
                .map((product) => product["Brand"])
                .map((product) => {
                  return (
                    <BrandFamilyButton product={product} change={handleState} />
                  );
                });
            } else {
              state.products.filter(
                (product) => product["Brand"] === state.selectedBrandFamily,
              );
            }

            state.products.map((product) => {
              return <ProductButton product={product} change={handleState} />;
            });
          }}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
