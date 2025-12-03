import { useSelector } from "react-redux";
import PageNavigation from "../components/PageNavigation";
import { useEffect } from "react";

const MyProfile = () => {

    const { user } = useSelector((state) => state.auth)
    const { orders } = useSelector((state) => state.orders)

    useEffect(() => {
        console.log(orders)
    },[])


    return (
        <>
            <PageNavigation />
            {user ?
            <div className="mt-[70px] sm:mt-[80px] md:mt-[120px]">
                <span className="text-2xl">User information</span>
                <ul className="mt-[10px] mb-[10px]">
                    <li>Name: {user?.name.firstname}</li>
                    <li>Last name: {user?.name.lastname}</li>
                    <li>Email: {user?.email}</li>
                    <li>Username: {user?.username}</li>
                    <li>User individual id: {user?.id}</li>
                </ul>
                <span className="text-2xl">Address data:</span>
                <ul className="mt-[10px] mb-[10px]">
                    <li>{user?.address.street + " " + user?.address.number}</li>
                    <li>{user?.address.zipcode + " " + user?.address.city}</li>
                </ul>
                <span className="text-2xl">Order history:</span>
                <ul>
                    {orders.map((order, i) => {
                        return <li>Order number {i+1} constains {order.cart.length} products {order.cart.map((product) => {
                            return <p>{product.title}</p>
                        })}</li>
                    })}
                </ul>
            </div> :
            <h2 className="mt-[70px] sm:mt-[80px] md:mt-[120px]">You need to login to see your data, to login click on "Sign in" on navigation-bar</h2>}
        </>
    )
}

export default MyProfile;