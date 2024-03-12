import Metatags from "~/components/metatags";
import Profile from "~/components/profile";
import Layout from "~/layout";

export default function Index() {
    return (
        <>
            <Metatags />

            <Layout>
                <Profile />
            </Layout>
        </>
    );
}
