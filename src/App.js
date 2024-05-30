import "./App.css";
import * as React from "react";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PosTable from "./components/PosTable";
import TotalsTable from "./components/totalsTable";
import Grid from "@mui/material/Unstable_Grid2";
import ProductButton from "./components/productButton";
import BrandFamilyButton from "./components/BrandFamilyButton";
import BackButton from "./components/BackButton";
import TextField from "@mui/material/TextField";
//import PackingModal from "./components/PackingModal";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PackingButton from "./components/PackingButton";
import { TwoKOutlined } from "@mui/icons-material";

//fixed loyaltyID returns fixed offer
//logic to apply or remove offer for items in cart
//check cart as it's modified to see if any loyalty offers are applicable

function App() {
  let [state, setState] = React.useState({
    selectedProducts: [],
    loyaltyId: {
      id: "",
      isValid: false,
    },
    products: [],
    prices: [],
    brandGUID: [],
    loyaltyOffers: [],
    personalOffer: {},
    selectedBrandFamily: "",
    openProduct: {},
    packingModalOpen: false,
    loyaltyModalOpen: false,
    test: false,
  });
  function handleProductState(packing) {
    let existingProduct = state.selectedProducts.find(
      (item) => item.upc === packing["UPC"],
    );
    if (existingProduct) {
      const index = state.selectedProducts.findIndex(
        (item) => item === existingProduct,
      );
      state.selectedProducts[index].quantity += 1;
      state.selectedProducts[index].totalPrice =
        Math.round(
          state.selectedProducts[index].unitPrice *
            state.selectedProducts[index].quantity *
            100,
        ) / 100;

      setState({
        ...state,
        selectedProducts: state.selectedProducts,
      });
      return;
    }

    const parentProduct = state.products.find((item) =>
      item["Packings"]
        .map((packing) => packing["UPC"])
        .includes(packing["UPC"]),
    );
    const price =
      Math.round(
        packing["ConversionFactor"] *
          state.prices.find((item) =>
            item["SKUGUID"].includes(parentProduct["SKUGUID"]),
          )["Allowances"][0]["MaxSuggestedRetailSellingPrice"] *
          100,
      ) / 100;

    const quantity = 1;
    const newProduct = {
      name: parentProduct["SKUName"],
      upc: packing["UPC"],
      uom: packing["UOM"],
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
  function deleteProductState(product) {
    //To be fixed
    var index = state.selectedProducts.indexOf(product);
    if (index !== -1) {
      const spliceAmount =
        state.selectedProducts[index + 1] &&
        state.selectedProducts[index + 1]["upc"] === "offer"
          ? 2
          : 1;
      state.selectedProducts.splice(index, spliceAmount);
    }

    setState({
      ...state,
      selectedProducts: state.selectedProducts,
    });
  }
  function openPackingModal(product) {
    setState({ ...state, packingModalOpen: true, openProduct: product });
  }
  function closePackingModal() {
    setState({ ...state, packingModalOpen: false });
  }
  function openLoyaltyModal() {
    setState({ ...state, loyaltyModalOpen: true });
  }
  function closeLoyaltyModal() {
    setState({ ...state, loyaltyModalOpen: false });
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
    if (state.brandGUID.length === 0) {
      fetch("structures/loyalty_offer.json")
        .then((response) => response.json())
        .then((jsonResponse) =>
          setState({
            ...state,
            brandGUID: jsonResponse["products"],
            loyaltyOffers: jsonResponse["details"],
          }),
        );
    }
    //
    if (
      state.loyaltyId["isValid"] &&
      JSON.stringify(state.personalOffer) === "{}"
    ) {
      fetch("structures/pos_fetch_response.json")
        .then((response) => response.json())
        .then((jsonResponse) =>
          setState({
            ...state,
            personalOffer: state.loyaltyOffers.find(
              (offer) =>
                offer["offerID"] ===
                jsonResponse["details"][0]["offersAvailable"][0]["offerID"],
            ),
          }),
        );
    }
    state.selectedProducts.forEach((product) => checkPackingForOffer(product));
  });

  function checkPackingForOffer(packing) {
    const index = state.selectedProducts.findIndex((item) => item === packing);
    // check if offer applies
    if (JSON.stringify(state.personalOffer) !== "{}") {
      //are applicable products in cart
      const brandGuidObject = state.brandGUID.find((guid) =>
        guid["packings"].find(
          (guidPacking) => guidPacking["upc"] === packing["upc"],
        ),
      );

      if (!brandGuidObject) {
        return false;
      }

      const brandGUID = brandGuidObject["brandGUID"];
      if (
        state.personalOffer["brands"].find(
          (brand) => brand["brandGUID"] === brandGUID,
        ) &&
        state.selectedProducts[index].quantity >=
          state.personalOffer["minimumQuantity"] &&
        !state.selectedProducts.find((product) => product["upc"] === "offer")
      ) {
        const offerProduct = {
          name: state.personalOffer["offerDescription"],
          upc: "offer",
          uom: "",
          quantity: 1,
          unitPrice: state.personalOffer["offerValue"] * -1,
          totalPrice: state.personalOffer["offerValue"] * -1,
        };
        state.selectedProducts.splice(index + 1, 0, offerProduct);

        setState({
          ...state,
          selectedProducts: state.selectedProducts,
        });
      }
      return true;
    }
  }

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
          <TotalsTable selectedProducts={state.selectedProducts} />
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
              <Button variant="contained" onClick={() => openLoyaltyModal()}>
                Loyalty ID
              </Button>
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
                    openModal={openPackingModal}
                  />
                );
              })}
        </Grid>
        <div>
          <Modal
            open={state.packingModalOpen}
            onClose={closePackingModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Select Packing
              </Typography>

              {state.openProduct.Packings &&
                state.openProduct.Packings.map((packing) => {
                  return (
                    <PackingButton
                      packing={packing}
                      change={handleProductState}
                    />
                  );
                })}
            </Box>
          </Modal>
        </div>
        <div>
          <Modal
            open={state.loyaltyModalOpen}
            onClose={closeLoyaltyModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Input Loyalty ID
              </Typography>
              <TextField
                id="outlined-basic"
                label="Loyalty ID"
                variant="outlined"
                onChange={(event) =>
                  setState({
                    ...state,
                    loyaltyId: {
                      id: event.target.value,
                      isValid: event.target.value === "camptest1",
                    },
                  })
                }
              />{" "}
              <br />
              <Button variant="contained" onClick={() => closeLoyaltyModal()}>
                Enter
              </Button>
            </Box>
          </Modal>
        </div>
      </Container>
    </div>
  );
}

export default App;
