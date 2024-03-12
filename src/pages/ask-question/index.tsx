
import AskQuestion from "~/components/ask-question";
import Metatags from "~/components/metatags";
import Layout from "~/layout";
import { getStaticProps } from "~/utils";

export default function Index() {
    return (
        <>
            <Metatags />

            <Layout>
                <AskQuestion />
            </Layout>
        </>
    );
}

export { getStaticProps };