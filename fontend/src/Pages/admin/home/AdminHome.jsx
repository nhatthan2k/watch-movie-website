import Calender from '../../../component/dashboard/Calender';
import Result from '../../../component/dashboard/Result';
import RevenueMoney from '../../../component/dashboard/RevenueMoney';
import RevenueOrders from '../../../component/dashboard/RevenueOrders';
import RevenueProduct from '../../../component/dashboard/RevenueProduct';

function AdminHome() {
    return (
        <div className="flex">
            <div className="p-7 flex flex-col gap-7" style={{ width: '75%' }}>
                <Result />
                <RevenueMoney />
                <RevenueOrders />
            </div>
            <div className="p-7 flex-1 relative">
                <div className="flex flex-col gap-7 sticky top-0">
                    <Calender />
                    <RevenueProduct />
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
