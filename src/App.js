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

function App() {
   return (
      <div className="App">
         <Header />
         <Switch>
            <Redirect exact from='/' to='/product' />

            <Route path="/product" exact>
               <Product />
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

            <Route>
               <NotFound />
            </Route>

         </Switch>
         <Footer />
      </div>
   );
}

export default App;
