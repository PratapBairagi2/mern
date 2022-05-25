
import './App.css';
import Footer from './component/layout/footer/Footer';
import Header from "./component/layout/header/Header"
import Social from './component/layout/socialLinks/Socials';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import LogReg from './pages/login_registration/LogReg';
import Cart from './pages/cart/cart';
import Home from './pages/home/Home';
import ProductDetails from "./component/productDetails/ProductDetails"
import Products from "./pages/products/Products"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userLoad } from './redux/actions/userActions';
import Dashboard from "./component/dashboard/Dashboard"
import store from "./redux/store"
import PageNotFound from "./pages/pageNotFound/PageNotFound"
import ProtectedRoute from './component/protectedRoutes.js/ProtectedRoutes';
import UpdateProfile from './pages/login_registration/updateProfile/UpdateProfile';
import ChangePassword from './pages/login_registration/changePassword/ChangePassword';
import { useAlert } from 'react-alert';
import ForgotPassword from './pages/login_registration/forgotPassword/ForgotPassword';
import ResetPassword from './pages/login_registration/resetPassword/ResetPassword';
import ShippingInfo from './pages/cart/shippingInfo/shippingInfo';
import OrderConfirm from './pages/cart/orderConfirm/OrderConfirm';
import axios from 'axios';
import PaymentProcess from './pages/cart/paymentProcess/PaymentProcess';
import { PaymentSuccess } from './pages/cart/paymentSuccess/PaymentSuccess';

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import MyOrders from './pages/myOrders/MyOrders'
import OrderPreview from './pages/myOrders/orderPreview/OrderPreview';
import AdminDashboard from "./component/admin/adminDashboard/AdminDashboard"
import UpdateProduct from './component/admin/updateProduct/UpdateProduct';
import Orderprocess from './component/admin/orderProcess/OrderProcess';
import UpdateUserByAdmin from './component/admin/updateUserRole/UpdateUserRole';
import Contact from './pages/contact/Contact';
import About from './pages/about/About';

function App() {

  const alert = useAlert()
  const auth = useSelector(state => state.userRegister)
  // const auth = useSelector(state => state.userRegister)

  // const { loading, success, updated } = useSelector(state => state.profileUpdated)
  const changePasswordResponse = useSelector(state => state.changePassword)

  // const [stripeApiKey, setStripeApiKey] = useState("") // ye publishable api key yaha se payment route ko pass karenge stripe se Element import kar ke Eelement ke tag ke andar payment route ko rakh ke


  // website on hote hi ye req bhejega backend ko jisse stripe ke liye publish api key mil jayega fron end ko
  // is publish api key ko sirf usi component ko pass karenge jaha iski jarurat ho
  // jaise payment process component mei
  // isko pass karne ke liye stripe/react-stripe se Element import karenge
  // uss Element tag k bich mei payment process component ko rakhenge, taki isi component mei hi publish api key pass ho
  // ab uss Element pe ek  attribute call karenge jiska naam hai stripe
  // is stripe k andar ek loadStripe() function ko rakhenge
  // or uss loadStripe pe ek parameter rakhenge
  // is loadStripe ko stripe/stripe.js se import krenge
  // wo parameter hoga publish api key
  // useEffect( () => {
  //   async function getStripeApiFun (){
  //     const apiKey = await axios.get("/api/stripeApiKey")
  //     setStripeApiKey(apiKey.data.stripePublishApiKey)
  //  }
  //    getStripeApiFun()
  // },[])

  // const [paymentSecretApiKey, setPaymentSecretApiKey] = useState("")

  // useEffect(()=>{
  // async function getSecretApiKeyFun(){
  //   const {data} = await axios.get("/api/getSecretApikey")
  //   setPaymentSecretApiKey(data.getPublishApiKey)
  //   }
  //   getSecretApiKeyFun()
  // },[])


  const [stripeApiKey, setStripeApikey] = useState("")

  useEffect(() => {
    async function publishApiFun() {
      const { data } = await axios.get("/api/getPublishApiKey")

      setStripeApikey(data.publishApiKey)
    }
    publishApiFun()
  }, [])


  useEffect(() => {
    store.dispatch(userLoad())
    if (changePasswordResponse.success) {
      alert.success("Password changed successfully !")
    }
  }, [changePasswordResponse.success, alert])

  const [auth1, setAuth1] = useState(true)
  const [auth2, setAuth2] = useState(false)


  useEffect(() => {
    if (auth.isAuthenticated) {
      setAuth1(false)
      setAuth2(true)
    } else {
      setAuth1(true)
      setAuth2(false)
    }
  }, [auth.isAuthenticated, auth.loading, auth1, auth2])

  return (
    <>
      <BrowserRouter>
        <Header userDetails={{ error: auth.error, isAuthenticated: auth.isAuthenticated, loading: auth.loading, success: auth.success, user: auth.user }} />
        <Social />



        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/products/:keyword" component={Products} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />



          <ProtectedRoute exact path="/user" auth={auth1} component={LogReg} />
          <ProtectedRoute exact path="/dashboard" auth={auth2} component={Dashboard} />
          <ProtectedRoute exact path="/profile/edit" auth={auth2} component={UpdateProfile} />
          <ProtectedRoute exact path="/password/change" auth={auth2} component={ChangePassword} />
          <ProtectedRoute exact path="/password/forgot" auth={auth1} component={ForgotPassword} />
          <ProtectedRoute exact path="/password/reset/:token" auth={auth1} component={ResetPassword} />
          <ProtectedRoute exact path="/Shipping/info" auth={auth2} component={ShippingInfo} />
          <ProtectedRoute exact path="/order/confirm" auth={auth2} component={OrderConfirm} />
          <ProtectedRoute exact path="/payment/success" auth={auth2} component={PaymentSuccess} />
          <ProtectedRoute exact path="/orders" auth={auth2} component={MyOrders} />
          <ProtectedRoute exact path="/order/preview/:id" auth={auth2} component={OrderPreview} />
          <ProtectedRoute exact path="/product/update/:id" auth={auth2} component={UpdateProduct} />
          <ProtectedRoute exact path="/admin/order/status/:id" auth={auth2} component={Orderprocess} />
          <ProtectedRoute exact path="/admin/user/update/:id" auth={auth2} component={UpdateUserByAdmin} />
          <ProtectedRoute exact path="/admin" auth={auth2} component={AdminDashboard} />

          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute exact path="/payment/process" auth={auth2} component={PaymentProcess} />
            </Elements>
          )}

          <Route path="*" exact component={PageNotFound} />

        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
