import { NextPage } from "next";
import Layout from "../components/Layout/Layout";
import SignupForm from "../components/SignupForm/SignupForm";



const SignUp: NextPage = () =>{
    return (
        <Layout>
            <SignupForm/>
        </Layout>
    );
}

export default SignUp;
