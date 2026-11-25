import Header from "./header";
import Footer from "./Footer";
import PanelAccesible from "./PanelAccesible";



export default function Layout({ children }) {

    return (

        <>
            <Header/>

            <main id="contenido">
                {children}
            </main>

            <Footer />
        </>

    );
}
