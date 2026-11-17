import Header from "./header";
import Footer from "./Footer";

export default function Layout({ children }) {

    return (

        <>
            <Header />

            <main id="contenido">
                {children}
            </main>

            <Footer />
        </>

    );

}
