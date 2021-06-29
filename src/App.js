import Header from './components/Header';
import Footer from './components/Footer';
import {
   Redirect,
   Switch, Route,
} from "react-router-dom";
import NotFound from './components/NotFound';
import SignIn from './pages/SignIn';
import SignUp from 'pages/SignUp';
import Product from './features/Product/index.jsx';
import ForgotPassWord from 'pages/ForgotPassword';
import ProductDetail from 'features/Product/pages/ProductDetail';
import Cart from 'features/Cart'

function App() {
   return (
      <div className="App">
         <Header />
         <Switch>
            <Redirect exact from='/' to='/product' />

            <Route path="/product" exact>
               <Product />
            </Route>

            <Route path="/blog" exact>
               <Product />
            </Route>

            <Route path="/contact" exact>
               <Product />
            </Route>

            <Route path="/product/:id" exact>
               <ProductDetail />
            </Route>

            <Route path='/signIn' exact>
               <SignIn />
            </Route>

            <Route path='/signUp' exact>
               <SignUp />
            </Route>

            <Route path='/forgotPassWord' exact>
               <ForgotPassWord />
            </Route>

            <Route path='/cart' exact>
               <Cart />
            </Route>

            <Route>
               <NotFound />
            </Route>

         </Switch>
         <Footer />
      </div>
   );
}

export default App;
