import { NextPage } from "next";
import Layout from "../components/Layout/Layout";
import SignupForm from "../components/SignupForm/SignupForm";



const Signin: NextPage = () =>{
    return (
        <Layout>
            <SignupForm/>
        </Layout>
    );
}

export default Signin;
