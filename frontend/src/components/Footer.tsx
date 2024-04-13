const Footer = () => {
    return (
        <div className="bg-blue-800 py-6 md:py-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <span className="text-2xl md:text-3xl text-white font-bold tracking-tight mb-4 md:mb-0">
                    HouseRentel.com
                </span>
                <div className="text-white font-bold tracking-tight flex flex-col md:flex-row gap-4">
                    <p className="cursor-pointer mb-2 md:mb-0">Privacy Policy</p>
                    <p className="cursor-pointer">Terms of Service</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
