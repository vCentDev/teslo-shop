import { Outlet } from 'react-router';
import { CustomHeader } from '../components/CustomHeader';
import { CustomFooter } from '../components/CustomFooter';

export const ShopLayout = () => {
    return (
        <section className="bg-muted/30">
            <CustomHeader />
            <Outlet />
            <CustomFooter />
        </section>
    )
}
