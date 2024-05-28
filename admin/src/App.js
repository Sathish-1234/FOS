import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import ResponseNavigate from './components/Navigations/ResponseNavigate';
import Sidebar from './components/Navigations/Sidebar';
import TopNavbar from './components/Navigations/TopNavbar';
import Statistics from './components/Statistics/Statistics';
import AddMenu from './components/AddForm/AddMenu';
import AddMenuItems from './components/AddForm/AddMenuItems';
import ViewMenu from './components/ViewForm/ViewMenu';
import ViewMenuItems from './components/ViewForm/ViewMenuItems';
import OrdersPending from './components/Orders/OrdersPending';
import OrdersCompleted from './components/Orders/OrdersCompleted';
import Invoice from './components/Invoice/Invoice';
import InvoiceDetails from './components/Invoice/InvoiceDetails';
import UpdateMenuItems from './components/UpdateForm/UpdateMenuItems';
import UpdateMenu from './components/UpdateForm/UpdateMenu';
import Login from './components/Navigations/Login';
import ViewPartner from './components/DeliveryPartner/ViewPartner';
import PageNotFound from './components/PageNotFound';
import AddTopping from './components/Additional/AddTopping';
import AddBase from './components/Additional/AddBase';
import ViewTopping from './components/Additional/ViewTopping';
import ViewBase from './components/Additional/ViewBase';
import Updatetopping from './components/Additional/UpdateTopping';
import UpdateBase from './components/Additional/UpdateBase';
import ToppingPopup from './components/Additional/ToppingSelector';
import ToppingSelector from './components/Additional/ToppingSelector';

function App() {

    const [adminID, setAdminID] = useState(0);
    
    useEffect(()=>{
        setAdminID(localStorage.getItem('fosadminsecretsID'));
    },[])

  return adminID ? (
    <div className="row d-relative ps-3 me-0">
      <div className="col-12 py-2 top-0 position-sticky bg-white">
        <TopNavbar />
        <hr />
      </div>
      <div
        style={{ height: "85vh", background: "white", overflowY: "scroll" }}
        className="d-none d-lg-block col-3"
      >
        <Sidebar />
      </div>
      <div className="col-lg-9 col-12">
        <Routes>
          <Route>
            <Route path={"/"} element={<Statistics />}></Route>
          </Route>
          <Route>
            <Route path={"/pop"} element={<ToppingSelector />}></Route>
          </Route>
          <Route>
            <Route path={"/addmenu"} element={<AddMenu />}></Route>
          </Route>
          <Route>
            <Route path={"/addmenuitems"} element={<AddMenuItems />}></Route>
          </Route>
          <Route>
            <Route path={"/viewmenu"} element={<ViewMenu />}></Route>
          </Route>
          <Route>
            <Route path={"/viewmenuitems"} element={<ViewMenuItems />}></Route>
          </Route>
          <Route>
            <Route path={"/updatemenu/:id"} element={<UpdateMenu />}></Route>
          </Route>
          <Route>
            <Route
              path={"/updatemenuitems/:id"}
              element={<UpdateMenuItems />}
            ></Route>
          </Route>
          <Route>
            <Route path={"/orderspending"} element={<OrdersPending />}></Route>
          </Route>
          <Route>
            <Route
              path={"/orderscompleted"}
              element={<OrdersCompleted />}
            ></Route>
          </Route>
          <Route>
            <Route path={"/invoice"} element={<Invoice />}></Route>
          </Route>
          <Route>
            <Route
              path={"/invoicedetails/:id"}
              element={<InvoiceDetails />}
            ></Route>
          </Route>
          <Route>
            <Route path={"/addtopping"} element={<AddTopping />}></Route>
          </Route>
          <Route>
            <Route path={"/addbase"} element={<AddBase />}></Route>
          </Route>
          <Route>
            <Route path={"/viewtopping"} element={<ViewTopping />}></Route>
          </Route>
          <Route>
            <Route path={"/viewbase"} element={<ViewBase />}></Route>
          </Route>
          <Route>
            <Route
              path={"/updatetopping/:id"}
              element={<Updatetopping />}
            ></Route>
          </Route>
          <Route>
            <Route path={"/updatebase/:id"} element={<UpdateBase />}></Route>
          </Route>

          <Route>
            <Route
              path={"/viewdeliverypartner"}
              element={<ViewPartner />}
            ></Route>
          </Route>
          <Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Route>
        </Routes>
      </div>
      <div className="position-fixed bottom-0 bg-white d-lg-none ">
        <ResponseNavigate />
      </div>
    </div>
  ) : (
    <Login />
  );
}

export default App