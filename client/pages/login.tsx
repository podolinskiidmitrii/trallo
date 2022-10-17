import { NextPage } from "next";
import Layout from "../components/Layout/Layout";
import Login from "../components/Login/Login";

const LoginPage: NextPage = () =>{
    return (
        <Layout>
            <Login/>
        </Layout>
    );
}

export default LoginPage;
