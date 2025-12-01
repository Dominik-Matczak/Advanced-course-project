const MainPage = () => {
    return (
        <>
            <div id="navigation" className="flex justify-between p-10 bg-green-500 text-white text-sm shadow-2xl">
                <div id="logo">logo-placeholder</div>
                <div id="search-bar">searchbar-ph</div>
                <ul id="navigation-user-actions" className="flex gap-5">
                    <li>Home</li>
                    <li>Contact</li>
                    <li>Account</li>
                    <li>Cart</li>
                </ul>
            </div>
        </>
    )
};

export default MainPage;