function XCard({ imgPosi, imgSrc, children }) {
  if (imgPosi === 'right') {
    return (
      <div className="grid grid-cols-5">
        <img className="col-span-2 order-2 rounded-lg border-4 box-content drop-shadow-xl" src={imgSrc} alt=""/>
        <p className="col-span-3 py-4 px-8 order-1 text-right">
          {children}
        </p>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-5 min-h-80">
        <img className="col-span-2 rounded-lg border-4 box-content drop-shadow-xl" src={imgSrc} alt=""/>
        <p className="col-span-3 py-4 px-8">
          {children}
        </p>
      </div>
    );
  }


}

export default XCard;