function XCard({ imgPosi, children }) {
    if (imgPosi === 'right') {
        return (
            <div className="grid grid-cols-3">
                <div className="col-span-1 bg-gray-400 order-2 h-48">
                    image
                </div>
                <p className="col-span-2 py-4 px-8 order-1 text-right">
                    {children}
                </p>
            </div>
        );
    } else {
        return (
            <div className="grid grid-cols-3 min-h-80">
                <div className="col-span-1 bg-gray-400 h-48">
                    image
                </div>
                <p className="col-span-2 py-4 px-8">
                    {children}
                </p>
            </div>
        );
    }


}

export default XCard;