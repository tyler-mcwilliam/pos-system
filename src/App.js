import "./App.css";
import * as React from "react";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PosTable from "./components/PosTable";
import TotalsTable from "./components/TotalsTable";
import Grid from "@mui/material/Unstable_Grid2";
import ProductButton from "./components/productButton";
import BrandFamilyButton from "./components/BrandFamilyButton";
import BackButton from "./components/BackButton";

function App() {
  let [state, setState] = React.useState({
    selectedProducts: [],
    loyaltyId: {
      id: "",
      name: "",
      isValid: false,
    },
    products: [],
    prices: [],
    selectedBrandFamily: "",
  });
  function handleProductState(product) {
    const parentProduct = state.products.find((item) =>
      item["Packings"]
        .map((packing) => packing["UPC"])
        .includes(product["UPC"]),
    );
    const price = state.prices.find((item) =>
      item["SKUGUID"].includes(parentProduct["SKUGUID"]),
    )["Allowances"][0]["MaxSuggestedRetailSellingPrice"];
    const quantity = 1;
    const newProduct = {
      name: parentProduct["SKUName"],
      upc: product["UPC"],
      uom: product["UOM"],
      quantity: quantity,
      unitPrice: price,
      totalPrice: quantity * price,
    };
    setState({
      ...state,
      selectedProducts: [...state.selectedProducts, newProduct],
    });
  }
  function handleBrandState(brandName) {
    setState({ ...state, selectedBrandFamily: brandName });
  }
  function clearBrandState() {
    setState({ ...state, selectedBrandFamily: "" });
  }
  function deleteProductState() {
    setState({ ...state, selectedProducts: [] });
  }

  React.useEffect(() => {
    if (state.products.length === 0 || state.prices.length === 0) {
      fetch("structures/price_promotions_response.json")
        .then((response) => response.json())
        .then((jsonResponse) =>
          setState({
            ...state,
            products: jsonResponse[0]["Products"],
            prices: jsonResponse[0]["PerUnitAllowances"],
          }),
        );
    }
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
            products={state.selectedProducts}
            deleteProductState={deleteProductState}
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
          {state.selectedBrandFamily === "" &&
            [...new Set(state.products.map((product) => product["Brand"]))].map(
              (brand) => {
                return (
                  <BrandFamilyButton brand={brand} change={handleBrandState} />
                );
              },
            )}
          {state.selectedBrandFamily && <BackButton change={clearBrandState} />}
          {state.selectedBrandFamily &&
            state.products
              .filter(
                (product) => product["Brand"] === state.selectedBrandFamily,
              )
              .map((product) => {
                return (
                  <ProductButton
                    product={product}
                    change={handleProductState}
                  />
                );
              })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
