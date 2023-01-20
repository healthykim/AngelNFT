function XCard({ imgPosi, imgSrc, children }) {
  if (imgPosi === 'right') {
    return (
      <div className="grid grid-cols-3">
        <img className="col-span-1 order-2 h-48 rounded-lg" src={imgSrc} alt=""/>
        <p className="col-span-2 py-4 px-8 order-1 text-right">
          {children}
        </p>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-3 min-h-80">
        <img className="col-span-1 h-48 rounded-lg" src={imgSrc} alt=""/>
        <p className="col-span-2 py-4 px-8">
          {children}
        </p>
      </div>
    );
  }


}

export default XCard;